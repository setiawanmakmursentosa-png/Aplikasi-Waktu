# Jejak Foto 2.0

Kamera pribadi berbasis web. Foto baru tanpa logo. ID foto lokal bukan kode verifikasi atau bukti keaslian.

## Pembaruan untuk repository Aplikasi-Waktu

1. Ekstrak ZIP ini.
2. Di GitHub buka Aplikasi-Waktu > jejak-foto-github-netlify > dist.
3. Pilih Add file > Upload files. Unggah index.html, app.js, dan geo.js dari folder dist hasil ekstraksi. Pastikan ketiganya berada pada folder dist yang sama. Commit changes.
4. Netlify akan deploy otomatis jika terhubung ke branch main. Jika tidak, jalankan deploy ulang.
5. Base directory: jejak-foto-github-netlify. Publish directory: dist. Build command kosong.
6. Buka situs melalui Safari/Chrome, muat ulang, pastikan label VERSI 2.0 terlihat. Izinkan kamera/lokasi jika diminta.

Jangan membuat folder dist baru di dalam dist lama. Tidak perlu mengganti nama repository atau membuat proyek Netlify baru.

## Pemasangan baru

Unggah isi ZIP ke repository. Jika dist dan netlify.toml berada di root, base directory kosong dan publish directory dist. netlify.toml sudah menentukan publish directory. Untuk Netlify Drop, unggah folder dist saja setelah ekstraksi.

## Perubahan

- Mempertahankan tingkat wilayah yang tersedia pada respons peta, termasuk city_district, municipality, county, state_district dan kode pos. Bagian yang tidak ada tidak ditebak.
- Memilih sampel GPS nyata dengan akurasi terbaik dalam jendela 15 detik, membuang data kedaluwarsa dan mereset seleksi saat berpindah jauh.
- Alamat yang sudah tidak dekat dengan koordinat terpilih disembunyikan, lalu dicari ulang.
- Tombol perbarui GPS dan cari ulang alamat terpisah. Permintaan alamat dibatasi minimal 15 detik dan hasil terdekat disimpan sementara selama 5 menit.
- Tombol aktivasi di luar cap foto. Cap disembunyikan sampai kamera aktif. Panel alamat selalu tersedia.
- Ekspor foto menyimpan ID, koordinat, akurasi dan waktu pengukuran GPS pada cap. Catatan galeri menyimpan rincian lokasi dan sumber alamat.
- Foto impor diberi keterangan bahwa waktu dan lokasi adalah saat pemrosesan, bukan waktu/lokasi asli foto tersebut.
- Galeri lama dipertahankan pada domain/browser yang sama. Tidak ada akun, sinkronisasi Drive otomatis atau klaim verifikasi foto.

## Batasan yang perlu diketahui

Alamat berasal dari Nominatim/OpenStreetMap dan merupakan alamat objek peta terdekat. Tidak dijamin sama dengan Timemark atau nama gedung sebenarnya. Koordinat dikirim ke penyedia alamat. Internet diperlukan untuk pencarian alamat. Jika peta tidak memuat RT/RW, gedung atau kode pos, aplikasi tidak menambahkannya.

Penggunaan layanan Nominatim publik hanya untuk penggunaan ringan/pribadi. Untuk dipakai banyak pengguna, gunakan layanan geocoding dengan kapasitas/ketentuan yang sesuai dan pembatasan terpusat. Jangan menambah permintaan paralel untuk menghindari batas layanan.

Jam mengikuti perangkat, bukan server waktu terpercaya. Izin kamera/GPS dikendalikan browser. Aplikasi tidak dapat menjamin izin hanya muncul sekali atau memastikan pengguna menyelesaikan Simpan Gambar pada menu iOS.

Galeri lokal terikat browser dan domain. Unduh foto penting sebelum mengganti domain atau menghapus data browser. Foto yang sudah diambil tidak berubah setelah pembaruan.

## Pemeriksaan

Jalankan node tests/geo.cjs dan node tests/app.cjs. Pengujian terisolasi memeriksa pemilihan GPS, alamat kosong/lengkap, pembatasan permintaan, ekspor, label impor dan jalur simpan. Data uji bukan hasil geocoding langsung. Kamera/GPS/penyimpanan di iPhone dan tampilan visual browser belum diuji langsung.
