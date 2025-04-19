from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from django.contrib.auth.models import Group
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from .models import Usuario, Especialista, Servicio, EspecialistaServicio, Reserva
from .serializers import UsuarioSerializer, GroupSerializer, EspecialistaSerializer, ServicioSerializer, EspecialistaServicioSerializer, ReservaSerializer

class GroupViewSet(ReadOnlyModelViewSet):  # solo permite listar y ver detalles
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class UsuarioViewSet(ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    # permission_classes = [DjangoModelPermissions]

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
            nombre_grupo = data.get('groups')  # se espera una cadena como "Cliente" o "Administrador"

            if not nombre_grupo:
                # Asignar grupo Cliente por defecto
                grupo_cliente = Group.objects.get(name="Cliente")
                usuario.groups.add(grupo_cliente)

            elif nombre_grupo == "Administrador":
                grupo_admin = Group.objects.get(name="Administrador")
                usuario.groups.add(grupo_admin)
                usuario.is_staff = True
                usuario.save()

            elif nombre_grupo == "Cliente":
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

class EspecialistaViewSet(ModelViewSet):
    queryset = Especialista.objects.all()
    serializer_class = EspecialistaSerializer
    permission_classes = [DjangoModelPermissions]

class ServicioViewSet(ModelViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer
    permission_classes = [DjangoModelPermissions]

class EspecialistaServicioViewSet(ModelViewSet):
    queryset = EspecialistaServicio.objects.all()
    serializer_class = EspecialistaServicioSerializer
    permission_classes = [DjangoModelPermissions]

class ReservaViewSet(ModelViewSet):
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer
    permission_classes = [DjangoModelPermissions]
