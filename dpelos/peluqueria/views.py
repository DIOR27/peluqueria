from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario
from .serializers import UsuarioSerializer

class UsuarioViewSet(ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()

        # Asignar username como el email
        email = data.get('email')
        data['username'] = email

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        usuario = serializer.save()

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
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class ServicioViewSet(ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class EspecialistaServicioViewSet(ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class ReservaViewSet(ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer