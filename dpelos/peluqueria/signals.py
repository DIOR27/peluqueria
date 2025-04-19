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

    # Obtener el modelo de usuario personalizado
    Usuario = apps.get_model('peluqueria', 'Usuario')
    content_type = ContentType.objects.get_for_model(Usuario)

    # Permisos estándar para el modelo Usuario
    permisos_admin = Permission.objects.filter(content_type=content_type)

    # Asignar todos los permisos del modelo Usuario al grupo Administrador
    admin_group.permissions.set(permisos_admin)

    # Al grupo Cliente solo le damos permiso para cambiar su usuario
    permiso_editar = Permission.objects.get(codename='change_usuario', content_type=content_type)
    cliente_group.permissions.set([permiso_editar])