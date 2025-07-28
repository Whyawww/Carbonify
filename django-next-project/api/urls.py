# api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    GoogleLoginView,
    CarbonCalculatorView, 
    ActionViewSet, 
    EcoPointViewSet,
    FaktorEmisiListrikViewSet,
    FaktorEmisiTransportasiViewSet,
    FaktorEmisiMakananViewSet,
    FaktorEmisiBahanBakarViewSet,
    CompleteActionView,
    UserProfileView,
    LeaderboardView,
    LogInputActionView,
)

# Router untuk ViewSets (daftar data)
v1_router = DefaultRouter()
v1_router.register(r'actions', ActionViewSet, basename='action')
v1_router.register(r'ecopoints', EcoPointViewSet, basename='ecopoint')
v1_router.register(r'choices/listrik', FaktorEmisiListrikViewSet, basename='choices-listrik')
v1_router.register(r'choices/transportasi', FaktorEmisiTransportasiViewSet, basename='choices-transportasi')
v1_router.register(r'choices/makanan', FaktorEmisiMakananViewSet, basename='choices-makanan')
v1_router.register(r'choices/bahan-bakar', FaktorEmisiBahanBakarViewSet, basename='choices-bahan-bakar')

# URL Patterns untuk view tunggal
urlpatterns = [
    # Semua URL dari router
    path('', include(v1_router.urls)),
    
    # Endpoint untuk Autentikasi dan Profil
    path('auth/google/', GoogleLoginView.as_view(), name='google_login'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    
    # Endpoint untuk Fitur Gamifikasi
    path('leaderboard/', LeaderboardView.as_view(), name='leaderboard'),
    path('complete-action/', CompleteActionView.as_view(), name='complete-action'), # Untuk tantangan
    path('log-action/', LogInputActionView.as_view(), name='log-action'), # Untuk aksi nyata (PERBAIKAN DI SINI)
    
    # Endpoint untuk Fitur Lainnya
    path('calculate/', CarbonCalculatorView.as_view(), name='calculate_carbon'),
]