from rest_framework import serializers
from .models import Usuario, Especialista, Servicio, EspecialistaServicio, Reserva

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'