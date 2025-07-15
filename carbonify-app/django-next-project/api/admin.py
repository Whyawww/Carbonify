from django.contrib import admin
from .models import Action, EcoPoint, FaktorEmisiListrik, FaktorEmisiTransportasi, FaktorEmisiMakanan

# Model yang sudah ada
admin.site.register(Action)
admin.site.register(EcoPoint)

# Model baru untuk faktor emisi
admin.site.register(FaktorEmisiListrik)
admin.site.register(FaktorEmisiTransportasi)
admin.site.register(FaktorEmisiMakanan)
