# api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from django_filters.rest_framework import FilterSet, CharFilter
from math import radians, sin, cos, sqrt, atan2
from .models import (
    Action, EcoPoint,
    FaktorEmisiListrik, FaktorEmisiTransportasi, FaktorEmisiMakanan
)
from .serializers import (
    ActionSerializer, EcoPointSerializer,
    FaktorEmisiListrikSerializer, FaktorEmisiTransportasiSerializer, FaktorEmisiMakananSerializer
)

# --- VIEWS UNTUK DATA STATIS (AKSI) ---
class ActionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint untuk menampilkan semua data Aksi Nyata (Action).
    """
    queryset = Action.objects.all()
    serializer_class = ActionSerializer


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
        # 1. Terapkan filter standar (search, category) terlebih dahulu.
        #    `filter_queryset` akan menggunakan `filterset_class` kita.
        queryset = self.filter_queryset(self.get_queryset())

        # 2. Ambil parameter lokasi dari URL untuk filter jarak
        params = request.query_params
        lat_user = params.get('lat')
        lon_user = params.get('lon')
        radius_km = params.get('radius')

        # Ini akan menjadi daftar hasil akhir, awalnya dari hasil filter standar.
        final_results = list(queryset)

        # 3. Jika parameter lokasi ada, lakukan perhitungan jarak manual
        if lat_user and lon_user and radius_km:
            try:
                lat_user = float(lat_user)
                lon_user = float(lon_user)
                radius_km = float(radius_km)

                R = 6371  # Radius bumi dalam km
                lat1_rad = radians(lat_user)
                
                locations_within_radius = []
                
                # Iterasi melalui hasil yang SUDAH DIFILTER
                for point in queryset:
                    lat2_rad = radians(point.latitude)
                    delta_lat = lat2_rad - lat1_rad
                    delta_lon = radians(point.longitude) - radians(lon_user)
                    
                    a = sin(delta_lat / 2)**2 + cos(lat1_rad) * cos(lat2_rad) * sin(delta_lon / 2)**2
                    c = 2 * atan2(sqrt(a), sqrt(1 - a))
                    distance = R * c
                    
                    if distance <= radius_km:
                        point.distance = distance # Tambahkan atribut jarak ke objek
                        locations_within_radius.append(point)
                
                # Urutkan berdasarkan jarak dan perbarui hasil akhir
                locations_within_radius.sort(key=lambda x: x.distance)
                final_results = locations_within_radius

            except (ValueError, TypeError):
                # Jika parameter lokasi tidak valid, abaikan dan gunakan hasil filter standar
                pass
        
        # 4. Serialisasi hasil akhir dan kirim sebagai respons
        serializer = self.get_serializer(final_results, many=True)
        return Response(serializer.data)


# --- VIEWS UNTUK PILIHAN FAKTOR EMISI ---
class FaktorEmisiListrikViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint untuk menyediakan pilihan Provinsi/Jaringan Listrik.
    """
    queryset = FaktorEmisiListrik.objects.all().order_by('provinsi')
    serializer_class = FaktorEmisiListrikSerializer

class FaktorEmisiTransportasiViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint untuk menyediakan pilihan Jenis Kendaraan.
    """
    queryset = FaktorEmisiTransportasi.objects.all().order_by('jenis_kendaraan')
    serializer_class = FaktorEmisiTransportasiSerializer

class FaktorEmisiMakananViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint untuk menyediakan pilihan Jenis Makanan.
    """
    queryset = FaktorEmisiMakanan.objects.all().order_by('jenis_makanan')
    serializer_class = FaktorEmisiMakananSerializer


# --- VIEW KALKULATOR ---
class CarbonCalculatorView(APIView):
    """
    API view untuk menghitung jejak karbon berdasarkan input dinamis dari pengguna.
    """
    def post(self, request, *args, **kwargs):
        try:
            listrik_kwh = float(request.data.get('listrik_kwh', 0))
            transportasi_km = float(request.data.get('transportasi_km', 0))
            makanan_porsi = float(request.data.get('makanan_porsi', 0))
            
            listrik_id = int(request.data.get('listrik_id'))
            transportasi_id = int(request.data.get('transportasi_id'))
            makanan_id = int(request.data.get('makanan_id'))
        except (ValueError, TypeError):
            return Response({"error": "Input tidak valid atau tidak lengkap. Pastikan semua pilihan dan angka telah diisi."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            faktor_listrik_obj = FaktorEmisiListrik.objects.get(id=listrik_id)
            faktor_transportasi_obj = FaktorEmisiTransportasi.objects.get(id=transportasi_id)
            faktor_makanan_obj = FaktorEmisiMakanan.objects.get(id=makanan_id)
        except (FaktorEmisiListrik.DoesNotExist, FaktorEmisiTransportasi.DoesNotExist, FaktorEmisiMakanan.DoesNotExist):
            return Response({"error": "Faktor emisi tidak ditemukan untuk ID yang diberikan."}, status=status.HTTP_404_NOT_FOUND)

        emisi_listrik = listrik_kwh * faktor_listrik_obj.faktor
        emisi_transportasi = transportasi_km * faktor_transportasi_obj.faktor
        emisi_konsumsi = makanan_porsi * faktor_makanan_obj.faktor

        total_emisi = emisi_listrik + emisi_transportasi + emisi_konsumsi

        hasil = {
            "totalEmissions": total_emisi,
            "breakdown": {
                "listrik": round(emisi_listrik, 2),
                "transportasi": round(emisi_transportasi, 2),
                "konsumsi": round(emisi_konsumsi, 2),
            }
        }
        return Response(hasil, status=status.HTTP_200_OK)
