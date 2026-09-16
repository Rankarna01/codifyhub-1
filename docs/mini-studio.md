# CodifyHub Mini Studio

Section interaktif menggunakan React 19, TypeScript, React Three Fiber 9, Drei 10, dan Three.js. Mini Studio ditambahkan tepat setelah `<Hero />` di `app/page.tsx`, menggunakan token biru/navy website, dan memuat Poppins hanya untuk section ini. Hero lama tetap tampil utuh, diikuti Mini Studio, ClientsCarousel, dan semua section yang sebelumnya ada. Tidak ada file atau fitur lama yang dihapus.

Integrasi Next.js memakai `placement="section"`, heading `h2`/`h3`, dan jarak atas yang lebih ringkas. Hero lama tetap menjadi `h1` utama. Demo Vite memakai `placement="hero"` bawaan agar dapat berdiri sendiri. Gambar fallback pada section dimuat secara malas; scene 3D baru dimuat ketika viewport-nya terlihat.

## Instalasi dan hot reload

Gunakan Node.js 22.12+ (atau 24 LTS) dan npm.

```bash
npm ci
npm run studio:dev
```

Buka alamat lokal yang dicetak Vite, biasanya `http://localhost:5173`. Perubahan pada komponen, CSS, dan konfigurasi otomatis diterapkan dengan hot reload. Demo Vite tidak membutuhkan Supabase/database. CTA konsultasi demo menuju nomor WhatsApp yang sudah digunakan repo (`6282275373233`); portofolio menuju `https://codifyhub.id/#portofolio`.

```bash
npm run studio:test
npm run studio:build
npm run studio:preview
```

`studio:build` memeriksa TypeScript dan menghasilkan `dist-studio`. Untuk website Next.js lengkap:

```bash
npm run dev
npm run build
```

Website lengkap tetap membutuhkan konfigurasi Supabase/Postgres yang sebelumnya dipakai proyek. CTA di halaman utama membuka `OrderModal` yang sudah ada, sedangkan `Lihat Portofolio` menuju `#portofolio`.

Konfigurasi website lengkap menggunakan `DATABASE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, dan `SUPABASE_SERVICE_ROLE_KEY`. Jangan menaruh service role key di variabel `NEXT_PUBLIC_*`. Tanpa service role key, kode upload yang sudah ada menghentikan tahap pengumpulan route pada build Next.js.

## Struktur

| File di `components/mini-studio/` | Tanggung jawab |
| --- | --- |
| `MiniStudioHero.tsx` / `mini-studio.module.css` | Copy, CTA, kontrol, aksesibilitas, fallback, lazy loading |
| `StudioCanvas.tsx` | Lifecycle renderer, visibilitas, cahaya, kualitas perangkat |
| `Mascot.tsx` | Bentuk sementara, animasi tubuh, adapter GLB |
| `materials.tsx` | Material bersama dan bump texture kecil untuk kesan lembut |
| `Room.tsx` | Ruangan, furnitur, area klik, monitor, camilan |
| `config.ts` | Posisi, collider, tujuan, durasi, bobot aktivitas, kamera, model |
| `machine.ts` | Satu state machine dan satu permintaan terakhir |
| `navigation.ts` | A* 2D, radius karakter, pengecekan segmen dan perataan jalur |
| `CameraControls.tsx` | Rotasi terbatas, zoom, reset, perilaku sentuh |
| `types.ts` | Kontrak konfigurasi dan state |
| `tests/machine.test.ts` | Transisi, rute, interupsi, pause, reduced motion, autoplay |

`components/sections/MiniStudio.tsx` menghubungkan hero dengan modal konsultasi Next.js. `studio/` dan `vite.studio.config.ts` menjalankan komponen yang sama tanpa ketergantungan Next.js.

## Interaksi

- Laptop/kursi: Ngoding; monitor: Cek Website; camilan: Makan; beanbag: Istirahat; maskot: Sapa Kamu.
- Tombol aktivitas dapat digunakan dengan Tab, Enter, dan Space; pilihan aktif memakai `aria-pressed`. Semua interaksi furnitur memiliki alternatif tombol. Status memakai live region `polite`.
- **Arahkan**: klik area kosong di lantai. Titik di luar ruangan atau terlalu dekat furnitur ditolak. Radius karakter juga dihitung dalam rute, bukan hanya titik pusatnya.
- **Putar**: seret untuk memutar kamera dalam batas yang sudah ditentukan. Klik Putar lagi untuk kembali ke interaksi objek. Zoom memakai tombol +/−; wheel/pinch tidak diambil alih, sehingga scroll halaman tetap bekerja pada mode biasa dan Arahkan. Reset juga keluar dari mode kamera.
- Pause menghentikan clock, animasi, berjalan, dan autoplay. Pilihan baru ketika pause menjadi antrean; pilihan terakhir dijalankan setelah resume.
- Gerak tenang mengikuti `prefers-reduced-motion` dan dapat dipilih secara manual. Autoplay, kedipan, napas, dan gerakan berulang berhenti. Aktivitas manual langsung menampilkan pose diam di tujuan, tanpa animasi perjalanan. Preferensi OS selalu dihormati.

## State machine dan navigasi

State publik: `idle`, `walking`, `coding`, `reviewing`, `eating`, `sleeping`, `waving`.

Pergantian aktivitas melewati `release` (hentikan gestur), `exit` (keluar dari tempat duduk bila perlu), `travel` (ikuti rute), `dock` (naik ke kursi/beanbag), `align` (menghadap objek), lalu `active`. Masuk kursi dilakukan dari sisi kanan agar tidak melewati sandaran. Dock/exit memakai koridor khusus serta pergeseran vertikal/pose untuk menduduki furnitur; koridor ini adalah satu-satunya pengecualian terhadap collider tempat duduk terkait. Rute biasa selalu menghindari semua collider yang diperlebar dengan radius karakter.

Permintaan baru menggantikan target sebelumnya, termasuk ketika bangun atau sedang masuk kursi. Tidak ada setTimeout animasi per aktivitas, sehingga klik berulang tidak menumpuk tween. Clock di-clamp saat tab kembali aktif. Aktivitas otomatis memiliki bobot Ngoding 5, Cek Website 4, Makan 1, Istirahat 1, Sapa Kamu 1, dan tidak mengulang aktivitas yang sama berturut-turut. Input manual menahan autoplay selama 32 detik waktu scene aktif.

Tambahkan furnitur melalui `FURNITURE`: posisi, `interactionArea`, `collider`, `destination` yang walkable, opsional `dock`, sudut hadap, dan aktivitas. Tambahkan render furnitur di `Room.tsx`. Untuk aktivitas baru, perbarui union `Activity`, konfigurasi, ikon, pose/clip, dan tes keterjangkauan. Jalankan tes setelah mengubah layout atau radius.

## Status maskot dan mengganti model asli

**Model saat ini adalah model prosedural sementara, bukan konversi 3D/rig dari gambar 2D.** Referensi adalah lembar pose yang diberikan pengguna: tubuh biru membulat, anggota badan pendek, panel wajah hitam, dan mata berbentuk logo. Tidak ditambahkan telinga, ekor, pakaian, atau aksesori permanen. Cookie hanya merupakan properti aktivitas makan. Tidak ada simulasi bulu, partikel, postprocessing glow, atau aset model dari pihak ketiga.

`public/mini-studio/mascot-reference.webp` adalah salinan referensi yang dikompresi; fallback memakai crop CSS pada pose pertama. Referensi asli tidak diubah. Akurasi siluet dan kesan bulu model sementara masih perlu review visual pemilik brand.

Untuk model asli:

1. Simpan GLB/GLTF beserta resource relatifnya di `public/mini-studio/`. Gunakan rig berunit meter, kaki di y=0, sumbu atas +Y, dan menghadap +Z. Tinggi model sekitar 1.72 unit sebelum skala 0.78.
2. Isi `MASCOT_ASSET.url`, `scale`, dan pemetaan clip di `config.ts`. Adapter memuat GLB secara malas, mengkloning skeleton, dan melakukan crossfade clip.
3. Clip yang diharapkan: `Idle`, `Walk`, `Code`, `Review`, `Eat`, `Sleep`, `Wave`. Gunakan animasi di tempat (tanpa root motion); gerakan translasi milik state machine.
4. Sesuaikan adapter `OriginalMascot` dengan rig final: offset duduk/berbaring, fase dock/exit, ekspresi wajah, waktu gigitan, dan crossfade. Nama clip saja tidak menjamin retargeting yang tepat. Uji semua pasangan aktivitas serta reduced motion setelah penggantian.

## Performa dan fallback

- Headline/CTA dirender sebelum impor scene. Three.js dimuat terpisah setelah scene terlihat dan WebGL2 tersedia.
- Poppins di-host sendiri dari `@fontsource`; tidak ada permintaan font eksternal baru.
- Geometri sederhana, material dipakai bersama, satu sumber bayangan, tanpa simulasi fisika/bulu dan tanpa postprocessing.
- Mobile: DPR 1, antialias off, shadow map 512. Desktop: DPR maksimal 1.5, shadow map 1024. Monitor memakai CanvasTexture 512×320 yang dibuat sekali.
- Di luar viewport atau saat tab disembunyikan, `frameloop="never"` menghentikan render dan clock. Ketika pause/reduced motion, render `demand` hanya saat ada perubahan.
- Kegagalan impor/model/renderer, WebGL2 tidak tersedia, atau context loss menampilkan kembali referensi dan membiarkan CTA tetap dapat digunakan. Kontrol scene dinonaktifkan ketika belum siap.
- Build dan tes logika tidak menggantikan review browser/GPU. Periksa desktop dan ponsel target sebelum merge untuk akurasi komposisi, material, pose, sentuhan, serta perangkat yang kehilangan konteks WebGL.

## Validasi perubahan

Tujuh tes logika lulus, termasuk seluruh 25 pasangan aktivitas; build Vite dan pemeriksaan TypeScript lulus. Build Next.js juga diverifikasi dengan nilai uji nonproduksi untuk service role key hanya pada proses build. Ini memverifikasi kompilasi/prerender, bukan konektivitas, autentikasi, atau operasi backend Supabase. Tidak ada kredensial produksi yang disimpan atau dipakai. Review browser/perangkat belum dilakukan.

Pengetikan ikon status di dua halaman admin dipersempit dari `React.ElementType` menjadi `LucideIcon` agar tidak berbenturan dengan elemen JSX 3D yang didaftarkan React Three Fiber. Perbaikan tersebut hanya mengubah tipe, tanpa mengubah perilaku admin. Lockfile npm dan Bun disinkronkan, termasuk dependency GSAP dari perubahan terbaru di `main`.
