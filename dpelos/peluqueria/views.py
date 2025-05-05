from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from django.contrib.auth.models import Group
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from .models import Usuario, Especialista, Servicio, EspecialistaServicio, Reserva, Notificacion, InformacionNegocio, HorarioTrabajo
from .serializers import UsuarioSerializer, GroupSerializer, EspecialistaSerializer, ServicioSerializer, EspecialistaServicioSerializer, ReservaSerializer, NotificacionSerializer, InformacionNegocioSerializer, HorarioTrabajoSerializer
from django.contrib.auth.models import Group
from django.utils.crypto import get_random_string
from datetime import datetime, timedelta
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

import locale

class GroupViewSet(ReadOnlyModelViewSet):  # solo permite listar y ver detalles
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class UsuarioViewSet(ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [DjangoModelPermissions]

    def create(self, request, *args, **kwargs):
        data = request.data.copy()

        # Asignar username como el email
        email = data.get('email')
        data['username'] = email
        data['password'] = make_password(data['password'])

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        usuario = serializer.save()

        try:
            nombre_grupo = data.get('rol')  # se espera una cadena como "Cliente" o "Administrador"

            if not nombre_grupo:
                # Asignar grupo Cliente por defecto
                grupo_cliente = Group.objects.get(name="Cliente")
                usuario.groups.add(grupo_cliente)

            elif nombre_grupo.capitalize() == "Administrador":
                grupo_admin = Group.objects.get(name="Administrador")
                usuario.groups.add(grupo_admin)
                usuario.is_staff = True
                usuario.save()

            elif nombre_grupo.capitalize() == "Cliente":
                grupo_cliente = Group.objects.get(name="Cliente")
                usuario.groups.add(grupo_cliente)

            else:
                return Response({'error': f'El grupo "{nombre_grupo}" no es válido'}, status=400)

        except Group.DoesNotExist:
            return Response({'error': 'El grupo especificado no existe'}, status=400)

        return Response({
            'message': 'Usuario creado correctamente',
            'usuario': {
                'id': usuario.id,
                'Email': usuario.email,
                'Nombre': usuario.first_name,
                'Apellido': usuario.last_name,
                'Telefono': usuario.telefono,
                'Direccion': usuario.direccion,
            }
        }, status=status.HTTP_201_CREATED)
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data.copy()

        usuario_actual = request.user

        # Validar si el usuario actual es cliente
        es_cliente = usuario_actual.groups.filter(name="Cliente").exists()
        es_admin = usuario_actual.groups.filter(name="Administrador").exists()

        # Si es cliente, solo puede editarse a sí mismo
        if es_cliente and usuario_actual.id != instance.id:
            return Response({'error': 'No tienes permiso para editar a otros usuarios.'}, status=403)

        # Si cambia el correo, actualiza también el username
        nuevo_email = data.get('email')
        if nuevo_email:
            data['username'] = nuevo_email

        # Si es cliente, no puede cambiar el rol
        if es_cliente and 'rol' in data:
            data.pop('rol')

        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        usuario = serializer.save()

        # Si el usuario actual es admin y desea cambiar el rol
        if es_admin and 'rol' in data:
            nuevo_rol = data['rol']
            try:
                grupo = Group.objects.get(name=nuevo_rol)
                usuario.groups.clear()
                usuario.groups.add(grupo)

                if nuevo_rol == "Administrador":
                    usuario.is_staff = True
                else:
                    usuario.is_staff = False

                usuario.save()

            except Group.DoesNotExist:
                return Response({'error': f'El grupo "{nuevo_rol}" no existe'}, status=400)

        return Response({
            'message': 'Usuario actualizado correctamente',
            'usuario': {
                'id': usuario.id,
                'Email': usuario.email,
                'Nombre': usuario.first_name,
                'Apellido': usuario.last_name,
                'Telefono': usuario.telefono,
                'Direccion': usuario.direccion,
            }
        }, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_info(request):
    user = request.user
    return Response({
        'id': user.id,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'telefono': user.telefono,
        'direccion': user.direccion,
        'is_staff': user.is_staff,
        'groups': [group.name for group in user.groups.all()]
    })

class EspecialistaViewSet(ModelViewSet):
    queryset = Especialista.objects.all()
    serializer_class = EspecialistaSerializer
    permission_classes = [DjangoModelPermissions]

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def change_specialist_status(request, pk, set_active):
    if not request.user.is_staff:
        return Response({'error': 'No tienes permiso para realizar esta acción'}, status=status.HTTP_403_FORBIDDEN)

    try:
        especialista = Especialista.objects.get(pk=pk)
    except Especialista.DoesNotExist:
        return Response({'error': 'Especialista no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    if set_active not in [0, 1]:
        return Response({'error': 'El valor debe ser 1 (activo) o 0 (inactivo)'}, status=status.HTTP_400_BAD_REQUEST)

    especialista.activo = bool(set_active)
    especialista.save()
    return Response({'message': f'Especialista {"activado" if especialista.activo else "desactivado"} correctamente'})

class ServicioViewSet(ModelViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer
    permission_classes = [DjangoModelPermissions]

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def change_service_status(request, pk, set_active):
    if not request.user.is_staff:
        return Response({'error': 'No tienes permiso para realizar esta acción'}, status=status.HTTP_403_FORBIDDEN)

    try:
        servicio = Servicio.objects.get(pk=pk)
    except Servicio.DoesNotExist:
        return Response({'error': 'Servicio no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    if set_active not in [0, 1]:
        return Response({'error': 'El valor debe ser 1 (activo) o 0 (inactivo)'}, status=status.HTTP_400_BAD_REQUEST)

    servicio.activo = bool(set_active)
    servicio.save()
    return Response({'message': f'Servicio {"activado" if servicio.activo else "desactivado"} correctamente'})

class EspecialistaServicioViewSet(ModelViewSet):
    queryset = EspecialistaServicio.objects.all()
    serializer_class = EspecialistaServicioSerializer
    permission_classes = [DjangoModelPermissions]

    def create(self, request, *args, **kwargs):
        servicios_ids = request.data.pop('servicios', [])
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        especialista = serializer.save()

        # Crear relaciones con servicios
        for servicio_id in servicios_ids:
            try:
                servicio = Servicio.objects.get(id=servicio_id)
                EspecialistaServicio.objects.create(especialista_id=especialista, servicio_id=servicio)
            except Servicio.DoesNotExist:
                continue  # O puedes retornar un error

        return Response({
            'message': 'Especialista creado con servicios asociados',
            'especialista_id': especialista.id
        }, status=status.HTTP_201_CREATED)
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        servicios_ids = request.data.pop('servicios', None)

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        especialista = serializer.save()

        # Si se especificaron servicios, actualizamos las asociaciones
        if servicios_ids is not None:
            # Eliminamos las relaciones actuales
            EspecialistaServicio.objects.filter(especialista_id=especialista).delete()

            # Creamos nuevas relaciones
            for servicio_id in servicios_ids:
                try:
                    servicio = Servicio.objects.get(id=servicio_id)
                    EspecialistaServicio.objects.create(especialista_id=especialista, servicio_id=servicio)
                except Servicio.DoesNotExist:
                    continue  # o return error si quieres ser más estricto

        return Response({
            'message': 'Especialista actualizado correctamente',
            'especialista_id': especialista.id
        }, status=status.HTTP_200_OK)

class ReservaViewSet(ModelViewSet):
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer
    permission_classes = [DjangoModelPermissions]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        usuario_id = self.request.query_params.get('usuario_id')
        especialista_id = self.request.query_params.get('especialista_id')
        fecha = self.request.query_params.get('fecha')
        hora = self.request.query_params.get('hora')

        if usuario_id:
            queryset = queryset.filter(usuario_id=usuario_id)
        if especialista_id:
            queryset = queryset.filter(especialista_id=especialista_id)
        if fecha:
            queryset = queryset.filter(fecha=fecha)
        if hora:
            queryset = queryset.filter(hora=hora)

        return queryset

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        especialista_id = data.get('especialista_id')
        fecha = data.get('fecha')
        hora_str = data.get('hora')
        servicio_id = data.get('servicio_id')

        if not (especialista_id and servicio_id and fecha and hora_str):
            return Response({'error': 'Se requiere especialista_id, servicio_id, fecha y hora'}, status=400)

        try:
            servicio = Servicio.objects.get(id=servicio_id)
        except Servicio.DoesNotExist:
            return Response({'error': 'Servicio no válido'}, status=400)
        
        # Convertir hora a objeto datetime
        
        try:
            hora_inicio_nueva = datetime.strptime(hora_str, "%H:%M:%S")
        except ValueError:
            return Response({'error': 'Formato de hora inválido. Usa HH:MM:SS'}, status=400)

        # Obtener duración del servicio
        duracion_servicio = servicio.duracion_estimada
        hora_fin_nueva = hora_inicio_nueva + timedelta(minutes=duracion_servicio)

        reservas_existentes = Reserva.objects.filter(
            especialista_id=especialista_id,
            fecha=fecha
        )

        # Validar que no se superpongan reservas del mismo especialista
        for reserva in reservas_existentes:
            hora_inicio_existente = datetime.strptime(str(reserva.hora), "%H:%M:%S")
            duracion_existente = reserva.servicio_id.duracion_estimada
            hora_fin_existente = hora_inicio_existente + timedelta(minutes=duracion_existente)

            if hora_inicio_nueva <= hora_fin_existente and hora_fin_nueva >= hora_inicio_existente:
                return Response({'error': 'El especialista ya tiene una reserva en ese intervalo de tiempo'}, status=400)

        # Generar código de reserva único
        codigo = get_random_string(length=6)
        while Reserva.objects.filter(codigo_reserva=codigo).exists():
            codigo = get_random_string(length=6)
        data['codigo_reserva'] = codigo.upper()

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        reserva = serializer.save()

        locale.setlocale(locale.LC_TIME, 'es_ES.UTF-8')
        week_day = reserva.fecha.strftime('%A').lower()
        
        # Enviar correo al usuario

        try:
            subject = f'Confirmación de Reserva N° {reserva.codigo_reserva}'
            from_email = settings.DEFAULT_FROM_EMAIL
            to_email = [reserva.usuario_id.email]
            context = {
                'usuario': reserva.usuario_id.__str__,
                'especialista': reserva.especialista_id.__str__,
                'servicio': reserva.servicio_id.nombre,
                'fecha': reserva.fecha,
                'hora': reserva.hora,
                'codigo_reserva': reserva.codigo_reserva,
                'dia_semana': week_day,
            }
            html_content = render_to_string('emails/booking_template.html', context)

            message = EmailMultiAlternatives(
                subject=subject,
                body='',
                from_email=from_email,
                to=to_email
            )
            message.attach_alternative(html_content, 'text/html')
        
            message.send()
        except Exception as e:
            return Response({'error': f'Error al enviar el correo: {str(e)}'}, status=500)

        return Response({
            'message': 'Reserva creada exitosamente',
            'reserva': {
                'id': reserva.id,
                'usuario': reserva.usuario_id.id,
                'especialista': reserva.especialista_id.id,
                'servicio': reserva.servicio_id.id,
                'fecha': reserva.fecha,
                'hora': reserva.hora,
                'estado': reserva.estado,
                'codigo_reserva': reserva.codigo_reserva
            }
        }, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def obtener_reserva_por_codigo(request, codigo_reserva):
    try:
        reserva = Reserva.objects.get(codigo_reserva=codigo_reserva)
        serializer = ReservaSerializer(reserva)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Reserva.DoesNotExist:
        return Response({'error': 'Reserva no encontrada'}, status=status.HTTP_404_NOT_FOUND)


class NotificacionViewSet(ModelViewSet):
    queryset = Notificacion.objects.all()
    serializer_class = NotificacionSerializer
    permission_classes = [DjangoModelPermissions]

class InformacionNegocioViewSet(ModelViewSet):
    queryset = InformacionNegocio.objects.all()
    serializer_class = InformacionNegocioSerializer
    permission_classes = [DjangoModelPermissions]

class HorarioTrabajoViewSet(ModelViewSet):
    queryset = HorarioTrabajo.objects.all()
    serializer_class = HorarioTrabajoSerializer
    permission_classes = [DjangoModelPermissions]