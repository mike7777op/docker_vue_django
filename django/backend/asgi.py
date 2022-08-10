"""
ASGI config for app project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django_asgi_app = get_asgi_application()
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from channels.sessions import SessionMiddlewareStack

import api.routing
application = ProtocolTypeRouter({
    "http": django_asgi_app, # Django's ASGI application to handle traditional HTTP requests
    "websocket": AllowedHostsOriginValidator(AuthMiddlewareStack(SessionMiddlewareStack( # WebSocket handler
        URLRouter(
            api.routing.websocket_urlpatterns
        ))
    )),
})