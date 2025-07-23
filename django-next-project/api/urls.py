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
    CompleteActionView, 
    LeaderboardView,
    UserProfileView ,
    FaktorEmisiBahanBakarViewSet,
)

v1_router = DefaultRouter()
v1_router.register(r'actions', ActionViewSet, basename='action')
v1_router.register(r'ecopoints', EcoPointViewSet, basename='ecopoint')
v1_router.register(r'choices/listrik', FaktorEmisiListrikViewSet, basename='choices-listrik')
v1_router.register(r'choices/transportasi', FaktorEmisiTransportasiViewSet, basename='choices-transportasi')
v1_router.register(r'choices/makanan', FaktorEmisiMakananViewSet, basename='choices-makanan')
v1_router.register(r'choices/bahan-bakar', FaktorEmisiBahanBakarViewSet, basename='choices-bahan-bakar')

# URL yang tidak menggunakan router
urlpatterns = [
    # +++ URL BARU UNTUK LOGIN GOOGLE +++
    # URL ini akan menjadi: /api/v1/auth/google/
    path('auth/google/', GoogleLoginView.as_view(), name='google_login'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('calculate/', CarbonCalculatorView.as_view(), name='calculate_carbon'),

    path('complete-action/', CompleteActionView.as_view(), name='complete-action'),
    path('leaderboard/', LeaderboardView.as_view(), name='leaderboard'),
    path('', include(v1_router.urls)),
]