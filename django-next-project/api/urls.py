# api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CarbonCalculatorView, 
    ActionViewSet, 
    EcoPointViewSet,
    FaktorEmisiListrikViewSet,
    FaktorEmisiTransportasiViewSet,
    FaktorEmisiMakananViewSet
)

# Ganti nama router menjadi v1_router
v1_router = DefaultRouter()
v1_router.register(r'actions', ActionViewSet, basename='action')
v1_router.register(r'ecopoints', EcoPointViewSet, basename='ecopoint')
v1_router.register(r'choices/listrik', FaktorEmisiListrikViewSet, basename='choices-listrik')
v1_router.register(r'choices/transportasi', FaktorEmisiTransportasiViewSet, basename='choices-transportasi')
v1_router.register(r'choices/makanan', FaktorEmisiMakananViewSet, basename='choices-makanan')

# URL yang tidak menggunakan router
urlpatterns = [
    path('calculate/', CarbonCalculatorView.as_view(), name='calculate_carbon'),
    # Sertakan URL dari v1_router
    path('', include(v1_router.urls)),
]
