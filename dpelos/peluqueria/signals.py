from django.contrib.auth.models import Group

def crear_grupos_default(sender, **kwargs):
    grupos = ['Administrador', 'Cliente']
    for nombre in grupos:
        Group.objects.get_or_create(name=nombre)