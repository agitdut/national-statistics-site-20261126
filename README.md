# national-statistics-site-20261126

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/agitdut/national-statistics-site-20261126/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/agitdut/national-statistics-site-20261126/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

**NusaStat** — portal statistik nasional Indonesia: penduduk, ekonomi, dan kesejahteraan 283,5 juta orang dalam satu situs statis yang bekerja di desktop dan ponsel, lengkap dengan sumber dan tahun setiap angka.

Beranda merangkum delapan indikator utama (penduduk 283,5 jt, PDB US$ 1,40 tn, pertumbuhan 5,03%, inflasi 1,57%, pengangguran 4,91%, kemiskinan 8,57%, IPM 75,02), grafik pertumbuhan PDB dan penduduk 2015–2024, lima provinsi terpadat, dan rilis BPS terbaru. Halaman Penduduk menampilkan struktur umur, seri waktu penduduk, dan tabel sepuluh provinsi yang bisa diurutkan, masing-masing dengan halaman detailnya sendiri. Halaman Ekonomi menampilkan PDB menurut lapangan usaha, inflasi, pengangguran, perdagangan luar negeri, dan kemiskinan. Alat Banding membandingkan dua provinsi berdampingan dan menempatkan Indonesia di antara negara-negara ASEAN. Halaman Indikator memuat 31 indikator yang bisa dicari, disaring per kategori, dan diunduh sebagai CSV. Halaman Sumber & Metodologi menjelaskan asal setiap angka dan cara membacanya.

Semua angka berasal dari publikasi resmi — Badan Pusat Statistik (BPS), World Bank World Development Indicators 2024, IMF World Economic Outlook, dan Bank Indonesia — dan dicantumkan beserta sumber serta tahunnya di samping angka.

## Run it

```sh
node serve.ts
```

Lalu buka http://localhost:8080. Tidak ada build step dan tidak ada permintaan jaringan: situs ini statis (`app/`), seluruh data tersimpan di berkasnya sendiri.

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` menyalin `app/` dan `screenshots/` ke `/output` dan menulis `/output/dossier.json` dengan pustaka `vendor/makefun-frontend.ts` dari kit.

---

<sub>Entered on [make.fun](https://make.fun/?ref=git&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
