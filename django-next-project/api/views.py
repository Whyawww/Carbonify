# api/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets, generics, serializers
from rest_framework.authtoken.models import Token
from django_filters.rest_framework import FilterSet, CharFilter
from django.contrib.auth.models import User
from django.conf import settings 
from rest_framework.permissions import IsAuthenticated

# Import untuk verifikasi Google
from google.oauth2 import id_token
from google.auth.transport import requests

from math import radians, sin, cos, sqrt, atan2
from .models import (
    Action, EcoPoint, FaktorEmisiBahanBakar,
    FaktorEmisiListrik, FaktorEmisiTransportasi, FaktorEmisiMakanan, UserProfile
)
from .serializers import (
    ActionSerializer, EcoPointSerializer, FaktorEmisiBahanBakarSerializer,
    FaktorEmisiListrikSerializer, FaktorEmisiTransportasiSerializer, FaktorEmisiMakananSerializer,
    ActionDetailSerializer, LeaderboardSerializer, UserProfileSerializer
)

# +++ KODE BARU UNTUK LOGIN GOOGLE +++
class GoogleLoginView(APIView):
    def post(self, request, *args, **kwargs):
        auth_token = request.data.get('token')
        if not auth_token:
            return Response(
                {"error": "Token Google tidak ditemukan."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Verifikasi token dengan Google
            idinfo = id_token.verify_oauth2_token(
                auth_token, requests.Request(), settings.GOOGLE_CLIENT_ID
            )
            
            email = idinfo['email']
            name = idinfo.get('name', '')

            user, created = User.objects.get_or_create(
                email=email,
                defaults={'username': email, 'first_name': name}
            )

            token, created = Token.objects.get_or_create(user=user)
            
            return Response({
                'token': token.key,
                'user_id': user.pk,
                'email': user.email,
                'name': user.first_name
            }, status=status.HTTP_200_OK)

        except ValueError as e:
            # Jika verifikasi gagal, kita cetak error detailnya di terminal
            print("="*50)
            print("❌ Verifikasi Token GAGAL!")
            print(f"CLIENT ID DI SETTINGS.PY: {settings.GOOGLE_CLIENT_ID}")
            print(f"DETAIL ERROR: {e}")
            print("="*50)
            
            return Response(
                {"error": "Token Google tidak valid.", "details": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


# --- VIEWS UNTUK DATA STATIS (AKSI) ---
class ActionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint untuk menampilkan semua data Aksi Nyata (Action).
    """
    queryset = Action.objects.all()

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ActionDetailSerializer
        return ActionSerializer


# --- FILTERSET CANGGIH UNTUK ECOPOINT ---
class EcoPointFilter(FilterSet):
    category = CharFilter(field_name='category', lookup_expr='iexact')
    search = CharFilter(method='filter_search', label='Search by name or address')
    
    class Meta:
        model = EcoPoint
        fields = ['category', 'search']

    def filter_search(self, queryset, name, value):
        from django.db.models import Q
        return queryset.filter(
            Q(name__icontains=value) | Q(address__icontains=value)
        )


# --- VIEWSET ECOPOINT DENGAN LOGIKA YANG DIPERBAIKI ---
class EcoPointViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint untuk menampilkan Titik Lestari dengan filter canggih.
    """
    queryset = EcoPoint.objects.all()
    serializer_class = EcoPointSerializer
    filterset_class = EcoPointFilter

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        params = request.query_params
        lat_user = params.get('lat')
        lon_user = params.get('lon')
        radius_km = params.get('radius')
        final_results = list(queryset)

        if lat_user and lon_user and radius_km:
            try:
                lat_user = float(lat_user)
                lon_user = float(lon_user)
                radius_km = float(radius_km)
                R = 6371
                lat1_rad = radians(lat_user)
                locations_within_radius = []
                
                for point in queryset:
                    lat2_rad = radians(point.latitude)
                    delta_lat = lat2_rad - lat1_rad
                    delta_lon = radians(point.longitude) - radians(lon_user)
                    a = sin(delta_lat / 2)**2 + cos(lat1_rad) * cos(lat2_rad) * sin(delta_lon / 2)**2
                    c = 2 * atan2(sqrt(a), sqrt(1 - a))
                    distance = R * c
                    
                    if distance <= radius_km:
                        point.distance = distance
                        locations_within_radius.append(point)
                
                locations_within_radius.sort(key=lambda x: x.distance)
                final_results = locations_within_radius

            except (ValueError, TypeError):
                pass
        
        serializer = self.get_serializer(final_results, many=True)
        return Response(serializer.data)


# --- VIEWS UNTUK PILIHAN FAKTOR EMISI ---
class FaktorEmisiListrikViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FaktorEmisiListrik.objects.all().order_by('provinsi')
    serializer_class = FaktorEmisiListrikSerializer

class FaktorEmisiTransportasiViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FaktorEmisiTransportasi.objects.all().order_by('jenis_kendaraan')
    serializer_class = FaktorEmisiTransportasiSerializer

class FaktorEmisiMakananViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FaktorEmisiMakanan.objects.all().order_by('jenis_makanan')
    serializer_class = FaktorEmisiMakananSerializer


# --- VIEW KALKULATOR ---
class CarbonCalculatorView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            listrik_kwh = float(request.data.get('listrik_kwh', 0))
            transportasi_km = float(request.data.get('transportasi_km', 0))
            makanan_porsi = float(request.data.get('makanan_porsi', 0))
            bahan_bakar_liter = float(request.data.get('bahan_bakar_liter', 0))

            listrik_id = int(request.data.get('listrik_id'))
            transportasi_id = int(request.data.get('transportasi_id'))
            makanan_id = int(request.data.get('makanan_id'))
            bahan_bakar_id = int(request.data.get('bahan_bakar_id'))
        except (ValueError, TypeError):
            return Response({"error": "Input tidak valid atau tidak lengkap. Pastikan semua pilihan dan angka telah diisi."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            faktor_listrik_obj = FaktorEmisiListrik.objects.get(id=listrik_id)
            faktor_transportasi_obj = FaktorEmisiTransportasi.objects.get(id=transportasi_id)
            faktor_makanan_obj = FaktorEmisiMakanan.objects.get(id=makanan_id)
            faktor_bahan_bakar_obj = FaktorEmisiBahanBakar.objects.get(id=bahan_bakar_id)
        except (FaktorEmisiListrik.DoesNotExist, FaktorEmisiTransportasi.DoesNotExist, FaktorEmisiMakanan.DoesNotExist):
            return Response({"error": "Faktor emisi tidak ditemukan untuk ID yang diberikan."}, status=status.HTTP_404_NOT_FOUND)

        emisi_listrik = listrik_kwh * faktor_listrik_obj.faktor
        emisi_transportasi = transportasi_km * faktor_transportasi_obj.faktor
        emisi_konsumsi = makanan_porsi * faktor_makanan_obj.faktor
        emisi_bahan_bakar = bahan_bakar_liter * faktor_bahan_bakar_obj.faktor

        total_emisi = emisi_listrik + emisi_transportasi + emisi_konsumsi + emisi_bahan_bakar

        LIMIT_MAKSIMAL = 250
        BENCHMARK_LISTRIK = 100
        BENCHMARK_TRANSPORTASI = 75
        BENCHMARK_KONSUMSI = 75
        BENCHMARK_BAHAN_BAKAR = 50 

        is_over_limit = total_emisi > LIMIT_MAKSIMAL
        excess_details = []
        
        # ✅ PERUBAHAN DIMULAI DI SINI: Inisialisasi list untuk kategori
        exceeded_categories = [] 

        if emisi_listrik > BENCHMARK_LISTRIK:
            exceeded_categories.append("Listrik") # Tambahkan kategori ke list
            excess_details.append({
                "category": "Listrik", "emoji": "💡",
                "message": f"Penggunaan listrik Anda menghasilkan {emisi_listrik:.1f} kg CO₂e, melebihi batas wajar ({BENCHMARK_LISTRIK} kg). Coba kurangi dengan mematikan alat yang tidak terpakai."
            })

        if emisi_transportasi > BENCHMARK_TRANSPORTASI:
            exceeded_categories.append("Transportasi") # Tambahkan kategori ke list
            excess_details.append({
                "category": "Transportasi", "emoji": "🚗",
                "message": f"Jejak transportasi Anda sebesar {emisi_transportasi:.1f} kg CO₂e, di atas batas wajar ({BENCHMARK_TRANSPORTASI} kg). Pertimbangkan menggunakan transportasi publik atau bersepeda." 
            })

        if emisi_konsumsi > BENCHMARK_KONSUMSI:
            exceeded_categories.append("Konsumsi") # Tambahkan kategori ke list
            excess_details.append ({
                "category": "Konsumsi", "emoji": "🍔",
                "message": f"Emisi dari konsumsi makanan Anda adalah {emisi_konsumsi:.1f} kg CO₂e, melebihi batas wajar ({BENCHMARK_KONSUMSI} kg). Mengurangi konsumsi daging adalah langkah efektif."
            })

        if emisi_bahan_bakar > BENCHMARK_BAHAN_BAKAR:
            exceeded_categories.append("Bahan Bakar")
            excess_details.append ({
                "category": "Bahan Bakar", "emoji": "🔥",
                "message": f"Emisi dari bahan bakar Anda adalah {emisi_bahan_bakar:.1f} kg CO₂e, melebihi batas wajar ({BENCHMARK_BAHAN_BAKAR} kg)."
            })
        
        # ✅ PERUBAHAN PADA HASIL RESPON
        hasil = {
            "totalEmissions": total_emisi,
            "breakdown": {
                "listrik": round(emisi_listrik, 2),
                "transportasi": round(emisi_transportasi, 2),
                "konsumsi": round(emisi_konsumsi, 2),
                "bahan_bakar" : round(emisi_bahan_bakar, 2)
            }, 
            "analysis": {
                "limit" : LIMIT_MAKSIMAL,
                "is_over_limit": is_over_limit,
                "excess_details": excess_details,
                "exceeded_categories": exceeded_categories, # Pastikan ini ada di dalam respons
            }
        }
        
        return Response(hasil, status=status.HTTP_200_OK)
    
# Fungsi helper untuk lencana (jika belum ada)
def check_and_award_badges(profile):
    newly_awarded_badges = []
    if profile.score > 100 and 'aktivis_pemula' not in profile.badges:
        profile.badges.append('aktivis_pemula')
        newly_awarded_badges.append({"name": "Aktivis Pemula", "description": "Mencapai 100 poin pertama!"})
    if profile.score > 500 and 'master_aksi' not in profile.badges:
        profile.badges.append('master_aksi')
        newly_awarded_badges.append({"name": "Master Aksi", "description": "Luar biasa! Mencapai 500 poin."})
    return newly_awarded_badges

# View untuk menyelesaikan aksi
class CompleteActionView(APIView):
    permission_classes = [IsAuthenticated] # Ini akan memeriksa token secara otomatis

    def post(self, request, *args, **kwargs):
        points_to_add = request.data.get('points')
        challenge_id = request.data.get('challenge_id')
        if not points_to_add or not challenge_id:
            return Response(
                {'error': 'Points dan challenge_id harus disertakan.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            profile, created = UserProfile.objects.get_or_create(user=request.user)

            if challenge_id in profile.completed_challenges:
                return Response(
                    {'error': 'Tantangan ini sudah pernah diselesaikan.'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            profile.score += int(points_to_add)
            profile.completed_challenges.append(challenge_id)
            
            new_badges = check_and_award_badges(profile)
            profile.save()

            return Response({
                'success': 'Skor berhasil diperbarui', 
                'new_score': profile.score,
                'new_badges_awarded': new_badges
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# View untuk leaderboard
class LeaderboardView(generics.ListAPIView):
    serializer_class = LeaderboardSerializer
    
    def get_queryset(self):
        return UserProfile.objects.order_by('-score')[:10]

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['score', 'badges', 'completed_challenges']

# Tambahkan view baru di api/views.py
class UserProfileView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_object(self):
        # Mengembalikan profil dari user yang sedang login
        profile, created = UserProfile.objects.get_or_create(user=self.request.user)
        return profile
    
class FaktorEmisiBahanBakarViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FaktorEmisiBahanBakar.objects.all().order_by('jenis_bahan_bakar')
    serializer_class = FaktorEmisiBahanBakarSerializer