# backend/urls.py
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django.conf import settings              
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # URL untuk API v1
    path('api/v1/', include('api.urls')),
    
    # URL untuk Dokumentasi API
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)