from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuario(AbstractUser):
    ## Campos heredados:
    # first_name
    # last_name
    # email
    # password
    # rol (en lugar de groups)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    direccion = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Especialista(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    especialidad = models.CharField(max_length=100, blank=True, null=True)
    foto_url = models.URLField(blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'{self.nombre} {self.apellido} - {self.especialidad.capitalize()}'

class Servicio(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    duracion_estimada = models.IntegerField(help_text="Duración en minutos")
    imagen_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.nombre

class EspecialistaServicio(models.Model):
    especialista_id = models.ForeignKey(Especialista, on_delete=models.CASCADE)
    servicio_id = models.ForeignKey(Servicio, on_delete=models.CASCADE)

class Reserva(models.Model):
    usuario_id = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    especialista_id = models.ForeignKey(Especialista, on_delete=models.CASCADE)
    servicio_id = models.ForeignKey(Servicio, on_delete=models.CASCADE)
    fecha = models.DateField()
    hora = models.TimeField()
    estado = models.CharField(max_length=20, choices=[('pendiente', 'Pendiente'), ('confirmada', 'Confirmada'), ('completada', 'Completada'), ('cancelada', 'Cancelada')], default='pendiente')
    codigo_reserva = models.CharField(max_length=6, unique=True)

    def __str__(self):
        return f"Reserva de {self.usuario_id} con {self.especialista_id} para {self.servicio_id} en {self.fecha} a las {self.hora}"