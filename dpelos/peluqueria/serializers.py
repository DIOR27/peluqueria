from rest_framework import serializers
from .models import Usuario, Especialista, Servicio, EspecialistaServicio, Reserva, Notificacion, InformacionNegocio, HorarioTrabajo
from django.contrib.auth.models import Group


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class EspecialistaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialista
        fields = '__all__'

class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = '__all__'

class EspecialistaServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = EspecialistaServicio
        fields = '__all__'

class ReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reserva
        fields = '__all__'


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']

class NotificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notificacion
        fields = '__all__'

class InformacionNegocioSerializer(serializers.ModelSerializer):
    class Meta:
        model = InformacionNegocio
        fields = '__all__'

class HorarioTrabajoSerializer(serializers.ModelSerializer):
    dia_display = serializers.CharField(source='get_dia_display', read_only=True)

    class Meta:
        model = HorarioTrabajo
        fields = '__all__'