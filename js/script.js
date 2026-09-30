const page = document.body.dataset.page;
const $ = (id) => document.getElementById(id);
const rupiah = (n) => "Rp " + n.toLocaleString("id-ID");

function bukaModal(id) {
  $(id).classList.add("show");
}
function tutupModal(id) {
  $(id).classList.remove("show");
}

// Halaman selain login wajib punya sesi
if (page !== "login" && !sessionStorage.getItem("user")) {
  location.href = "index.html";
}

// ---------- LOGIN ----------
if (page === "login") {
  $("formLogin").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("email").value.trim();
    const pass = $("password").value;
    const err = $("loginError");
    err.textContent = "";
    if (!email || !pass) {
      err.textContent = "Email dan password wajib diisi.";
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      err.textContent = "Format email tidak valid.";
      return;
    }
    const user = dataPengguna.find(
      (u) => u.email === email && u.password === pass,
    );
    if (!user) {
      alert("email/password yang anda masukkan salah");
      return;
    }
    sessionStorage.setItem("user", user.nama);
    location.href = "dashboard.html";
  });
  $("btnLupa").onclick = () => bukaModal("modalLupa");
  $("btnDaftar").onclick = () => bukaModal("modalDaftar");
  document
    .querySelectorAll("[data-close]")
    .forEach((el) =>
      el.addEventListener("click", () => tutupModal(el.dataset.close)),
    );
  $("formLupa").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Tautan reset password dikirim ke " + $("emailLupa").value);
    tutupModal("modalLupa");
  });
  $("formDaftar").addEventListener("submit", (e) => {
    e.preventDefault();
    if ($("passDaftar").value.length < 6) {
      alert("Password minimal 6 karakter.");
      return;
    }
    alert(
      "Pendaftaran untuk " + $("namaDaftar").value + " berhasil (simulasi).",
    );
    tutupModal("modalDaftar");
  });
}

// ---------- NAVBAR (semua halaman dalam) ----------
if (page !== "login") {
  const out = $("logout");
  if (out)
    out.onclick = () => {
      sessionStorage.clear();
      location.href = "index.html";
    };
  document.querySelectorAll("[data-soon]").forEach((a) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      alert(a.dataset.soon + " belum tersedia pada versi praktik ini.");
    }),
  );
}

// ---------- DASHBOARD ----------
if (page === "dashboard") {
  const jam = new Date().getHours();
  const sapaan =
    jam < 11 ? "pagi" : jam < 15 ? "siang" : jam < 18 ? "sore" : "malam";
  $("greeting").textContent =
    "Selamat " + sapaan + ", " + sessionStorage.getItem("user") + "!";
}

// ---------- TRACKING ----------
if (page === "tracking") {
  $("formCari").addEventListener("submit", (e) => {
    e.preventDefault();
    const no = $("noDO").value.trim();
    const hasil = $("hasil");
    if (!no) {
      alert("Nomor Delivery Order wajib diisi.");
      return;
    }
    const d = dataTracking[no];
    if (!d) {
      hasil.innerHTML =
        '<p class="error">Nomor DO ' + no + " tidak ditemukan.</p>";
      return;
    }
    const status = d.progress >= 100 ? "Selesai diantar" : "Dalam perjalanan";
    hasil.innerHTML =
      '<div class="info"><h2>' +
      d.nama +
      "</h2><div>No. DO: " +
      no +
      "</div><div>" +
      d.ekspedisi +
      "</div></div>" +
      "<p><b>Status:</b> " +
      status +
      " (" +
      d.progress +
      "%)</p>" +
      '<div class="bar"><div style="width:' +
      d.progress +
      '%"></div></div>' +
      "<p>Tanggal kirim: <b>" +
      d.tanggalKirim +
      "</b><br>Jenis paket: <b>" +
      d.paket +
      "</b><br>Total pembayaran: <b>" +
      rupiah(d.total) +
      "</b></p>" +
      "<h3>Perjalanan Paket</h3>" +
      '<ul class="timeline">' +
      d.perjalanan
        .map((p) => "<li>" + p.ket + "<small>" + p.waktu + "</small></li>")
        .join("") +
      "</ul>";
  });
}

// ---------- STOK ----------
if (page === "stok") {
  const tbody = $("isiStok");
  function tambahBaris(b) {
    const tr = document.createElement("tr");
    [b.kodeLokasi, b.kodeBarang, b.nama, b.jenis, b.edisi, b.stok].forEach(
      (v, i) => {
        const td = document.createElement("td");
        td.textContent = v;
        if (i === 5 && b.stok < 20) td.className = "low";
        tr.appendChild(td);
      },
    );
    tbody.appendChild(tr);
  }
  dataBahanAjar.forEach(tambahBaris);

  $("formStok").addEventListener("submit", (e) => {
    e.preventDefault();
    const b = {
      kodeLokasi: $("kLokasi").value.trim().toUpperCase(),
      kodeBarang: $("kBarang").value.trim().toUpperCase(),
      nama: $("nBarang").value.trim(),
      jenis: $("jBarang").value,
      edisi: parseInt($("edisi").value, 10),
      stok: parseInt($("stok").value, 10),
    };
    if (!b.kodeLokasi || !b.kodeBarang || !b.nama) {
      alert("Semua kolom teks wajib diisi.");
      return;
    }
    if (isNaN(b.edisi) || b.edisi < 1 || isNaN(b.stok) || b.stok < 0) {
      alert("Edisi minimal 1 dan stok tidak boleh negatif.");
      return;
    }
    if (dataBahanAjar.some((x) => x.kodeBarang === b.kodeBarang)) {
      alert("Kode barang sudah ada.");
      return;
    }
    dataBahanAjar.push(b);
    tambahBaris(b);
    e.target.reset();
  });
}
