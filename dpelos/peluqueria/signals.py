# peluqueria/signals.py

from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from django.apps import apps

@receiver(post_migrate)
def crear_grupos_y_permisos(sender, **kwargs):
    # Crear grupos si no existen
    admin_group, _ = Group.objects.get_or_create(name="Administrador")
    cliente_group, _ = Group.objects.get_or_create(name="Cliente")

    # Obtener el modelo personalizado de Usuario
    Usuario = apps.get_model('peluqueria', 'Usuario')
    content_type = ContentType.objects.get_for_model(Usuario)

    # Asignar todos los permisos al grupo Administrador
    permisos_admin = Permission.objects.filter(content_type=content_type)
    admin_group.permissions.set(permisos_admin)

    # Asignar solo permiso de edición al Cliente (verificamos si existe)
    permiso_editar = Permission.objects.filter(
        codename__startswith='change_',
        content_type=content_type
    ).first()

    if permiso_editar:
        cliente_group.permissions.set([permiso_editar])
