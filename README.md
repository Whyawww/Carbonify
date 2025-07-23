# 🌍 Carbonify - Jejak Karbon & Aksi Iklim

**Carbonify** adalah platform web interaktif yang dirancang untuk meningkatkan kesadaran tentang jejak karbon dan mendorong aksi nyata dalam menghadapi perubahan iklim. Proyek ini dibangun sebagai bagian dari **Technology Innovative Challenge 8.0** dengan tema "Impact World through Code: Building Solutions for Sustainable Development Goals".

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-green?style=for-the-badge)](https://your-live-demo-url.com) 
*(Ganti URL di atas dengan link Vercel Anda setelah deploy)*

![Carbonify Screenshot](carbonify-app/public/images/image.png) 
*(Pastikan path gambar ini benar atau ganti dengan URL online)*

---

## ✨ Fitur Utama

-   **Desain Futuristik**: Antarmuka modern dengan tema Aurora GeoGlow dan efek cahaya kursor yang interaktif.
-   **Kalkulator Karbon Dinamis**: Menghitung emisi berdasarkan data spesifik (lokasi, jenis kendaraan, dll) yang terhubung dengan backend Django.
-   **Gamifikasi**: Sistem poin dan leaderboard untuk memotivasi pengguna menyelesaikan tantangan ramah lingkungan.
-   **Otentikasi Google**: Kemudahan login dengan satu klik menggunakan akun Google.
-   **Peta Lokal Interaktif**: Peta berbasis Leaflet yang menunjukkan lokasi ramah lingkungan seperti bank sampah, thrift store, dll., dengan fitur pencarian dan filter radius.
-   **Desain Responsif**: Tampilan yang dioptimalkan untuk berbagai perangkat, dari desktop hingga mobile.

---

## 🛠️ Tech Stack & Tools

<table>
  <tr>
    <td align="center" width="96">
      <a href="https://nextjs.org/">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" alt="Next.js" width="65" height="65" />
      </a>
      <br>Next.js
    </td>
    <td align="center" width="96">
      <a href="https://react.dev/">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" width="65" height="65" />
      </a>
      <br>React
    </td>
     <td align="center" width="96">
      <a href="https://www.typescriptlang.org/">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" alt="TypeScript" width="65" height="65" />
      </a>
      <br>TypeScript
    </td>
    <td align="center" width="96">
      <a href="https://tailwindcss.com/">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" width="65" height="65" />
      </a>
      <br>Tailwind CSS
    </td>
    <td align="center" width="96">
      <a href="https://www.djangoproject.com/">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg" alt="Django" width="65" height="65" />
      </a>
      <br>Django
    </td>
    <td align="center" width="96">
        <a href="https://leafletjs.com/">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/leaflet/leaflet-original.svg" alt="Leaflet" width="65" height="65" />
        </a>
        <br>Leaflet.js
    </td>
    <td align="center" width="96">
      <a href="https://www.framer.com/motion/">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg" alt="Framer Motion" width="65" height="65" />
      </a>
      <br>Framer Motion
    </td>
     <td align="center" width="96">
      <a href="https://prettier.io/">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prettier/prettier-original.svg" alt="Prettier" width="65" height="65" />
      </a>
      <br>Prettier
    </td>
  </tr>
</table>

---

## 🚀 Instalasi & Menjalankan Proyek

Proyek ini terdiri dari dua bagian: **frontend (Next.js)** dan **backend (Django)**.

### Backend (Django)
1.  **Masuk ke direktori backend:**
    ```bash
    cd django-next-project
    ```
2.  **Buat dan aktifkan virtual environment:**
    ```bash
    python -m venv venv
    .\venv\Scripts\activate
    ```
3.  **Install dependensi:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Jalankan server backend:**
    ```bash
    python manage.py runserver
    ```
    Backend akan berjalan di `http://127.0.0.1:8000`.

### Frontend (Next.js)
1.  **Buka terminal baru** dan masuk ke direktori frontend:
    ```bash
    cd carbonify-app
    ```
2.  **Install dependensi:**
    ```bash
    npm install
    ```
3.  **Jalankan server pengembangan:**
    ```bash
    npm run dev
    ```
    Frontend akan berjalan di `http://localhost:3000`.

---

Dibuat dengan semangat untuk bumi yang lebih baik. 💚