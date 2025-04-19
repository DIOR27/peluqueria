from django.apps import AppConfig
from django.db.models.signals import post_migrate


class PeluqueriaConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'peluqueria'

    def ready(self):
        from .signals import crear_grupos_default  # ✅ IMPORTA AQUÍ
        post_migrate.connect(crear_grupos_default, sender=self)
