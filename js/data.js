const dataPengguna = [
  { email: "mahasiswa@ecampus.ut.ac.id", password: "ut12345", nama: "Alharis" },
];

const dataBahanAjar = [
  {
    kodeLokasi: "0TMP01",
    kodeBarang: "ASIP4301",
    nama: "Pengantar Ilmu Komunikasi",
    jenis: "BMP",
    edisi: 2,
    stok: 548,
  },
  {
    kodeLokasi: "0TMP01",
    kodeBarang: "EKMA4116",
    nama: "Pengantar Bisnis",
    jenis: "BMP",
    edisi: 3,
    stok: 320,
  },
  {
    kodeLokasi: "0JKT02",
    kodeBarang: "STSI4209",
    nama: "Pemrograman Web",
    jenis: "BMP",
    edisi: 1,
    stok: 87,
  },
  {
    kodeLokasi: "0JKT02",
    kodeBarang: "MKDK4001",
    nama: "Pendidikan Kewarganegaraan",
    jenis: "Modul",
    edisi: 4,
    stok: 12,
  },
];

const dataTracking = {
  18503984974: {
    nama: "ROIKA HEPRIDA SITIO",
    ekspedisi: "TANGERANGSELATAN -> PEMATANGSIANTAR",
    tanggalKirim: "2021-03-10",
    paket: "Paket Bahan Ajar Semester 1",
    total: 275000,
    progress: 100,
    perjalanan: [
      { waktu: "2021-03-20 13:34", ket: "Selesai antar di PEMATANGSIANTAR" },
      { waktu: "2021-03-20 09:05", ket: "Proses antar di PEMATANGSIANTAR" },
      { waktu: "2021-03-19 22:05", ket: "Tiba di Hub SPP MEDAN" },
      { waktu: "2021-03-12 10:37", ket: "Tiba di Hub TANGERANGSELATAN" },
      {
        waktu: "2021-03-10 15:56",
        ket: "Penerimaan di loket TANGERANGSELATAN",
      },
    ],
  },
  20240001: {
    nama: "ALHARIS",
    ekspedisi: "JNE Reguler",
    tanggalKirim: "2026-09-25",
    paket: "Paket Bahan Ajar Semester 5",
    total: 190000,
    progress: 50,
    perjalanan: [
      { waktu: "2026-09-27 08:10", ket: "Tiba di Hub JAKARTA" },
      { waktu: "2026-09-25 14:00", ket: "Penerimaan di loket UT Daerah" },
    ],
  },
};
