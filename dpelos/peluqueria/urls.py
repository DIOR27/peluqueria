from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet, EspecialistaViewSet, ServicioViewSet, EspecialistaServicioViewSet, ReservaViewSet

default_router = DefaultRouter()
default_router.register(r'usuarios', UsuarioViewSet, basename='usuario')
default_router.register(r'especialistas', EspecialistaViewSet, basename='especialista')
default_router.register(r'servicios', ServicioViewSet, basename='servicio')
default_router.register(r'especialistaservicio', EspecialistaServicioViewSet, basename='especialistaservicio')
default_router.register(r'reservas', ReservaViewSet, basename='reserva')

urlpatterns = []

urlpatterns += default_router.urls