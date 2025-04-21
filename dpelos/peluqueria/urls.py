from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    GroupViewSet,
    UsuarioViewSet,
    EspecialistaViewSet,
    ServicioViewSet,
    EspecialistaServicioViewSet,
    ReservaViewSet,
    obtener_reserva_por_codigo,
)

default_router = DefaultRouter()
default_router.register(r"roles", GroupViewSet, basename="rol")
default_router.register(r"usuarios", UsuarioViewSet, basename="usuario")
default_router.register(r"especialistas", EspecialistaViewSet, basename="especialista")
default_router.register(r"servicios", ServicioViewSet, basename="servicio")
default_router.register(
    r"especialistaservicio",
    EspecialistaServicioViewSet,
    basename="especialistaservicio",
)
default_router.register(r"reservas", ReservaViewSet, basename="reserva")

urlpatterns = [
    path(
        "reservas/codigo/<str:codigo_reserva>/",
        obtener_reserva_por_codigo,
        name="reserva-por-codigo",
    ),
]

urlpatterns += default_router.urls
