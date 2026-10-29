<p align="center">
  <img src="./assets/icon.png" width="160" alt="DisCode Logo" style="border-radius: 28px; box-shadow: 0 8px 24px rgba(88, 101, 242, 0.4);" />
</p>

<h1 align="center">DisCode — Visual Discord Rich Presence</h1>

<p align="center">
  <b>Tingkatkan status Discord kamu dengan ikon bahasa dinamis, kustomisasi timer akurat, dan Dashboard Pengaturan dengan Live Preview interaktif.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/VS%20Code-v1.85%2B-blue?logo=visualstudiocode" alt="VS Code Version">
  <img src="https://img.shields.io/badge/Discord%20RPC-Supported-5865F2?logo=discord" alt="Discord RPC">
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
</p>

---

## 🌟 Fitur Utama

- 🎨 **Live Preview Settings UI (`Ctrl + Alt + D`):** Tidak perlu lagi otak-atik `settings.json`! Atur semua konfigurasi lewat antarmuka grafis yang ramah pengguna lengkap dengan simulasi profil Discord yang bergerak secara *real-time*.
- ⚡ **Instant Sync (Tanpa Restart):** Ubah pengaturan atau kustom durasi waktu dan langsung terapkan ke Discord dalam <1 detik lewat tombol **Instant Sync**.
- ⏱️ **Kustom Durasi Waktu (Elapsed Timer):**
  - Hitung durasi per sesi VS Code, reset otomatis per file, atau **masukkan durasi jam & menit koding secara manual** (misal langsung mulai dari `2 Jam 30 Menit`).
  - Dilengkapi tombol preset cepat (`+1 Jam`, `+2 Jam`, `+3.5 Jam`, `+5 Jam`).
- 📁 **Ikon Bahasa & File Dinamis:** Logo utama di Discord otomatis berganti sesuai ekstensi file yang aktif (React, TypeScript, Python, Go, Rust, Docker, HTML, CSS, dll).
- 🚪 **Perilaku Fleksibel Saat File Ditutup:** Pilih untuk tetap menampilkan file terakhir, menampilkan folder workspace saja, beralih ke status *Idling*, atau menghapus status sama sekali.
- 🔒 **Privasi & Keamanan:** Sembunyikan nama file, sembunyikan nama repo Git, atau masukkan folder ke daftar *blacklist* agar tidak pernah muncul di profil publik.
- 🛡️ **Zero Lag & Stabilitas IPC:** Menggunakan protokol IPC lokal Windows/Unix dengan proteksi *exponential backoff* dan penanganan *rate-limiting* 15 detik agar editor tetap mulus tanpa kompromi performa.

---

## 🚀 Cara Menjalankan

### 1. Buka Menu Pengaturan
Ada 3 cara praktis untuk membuka Dashboard DisCode:
- **Shortcut Keyboard:** Tekan **`Ctrl + Alt + D`** (di macOS: `Cmd + Alt + D`).
- **Status Bar:** Klik tombol **`Discord: Connected`** di pojok kanan bawah.
- **Command Palette:** Tekan `Ctrl + Shift + P` $\to$ pilih `Discord Presence: Open Settings & Live Preview`.

### 2. Reset / Terapkan Durasi Waktu
- Gunakan tombol **`⚡ Terapkan Waktu Saja`** di menu pengaturan untuk langsung meng-update durasi jam koding ke Discord seketika.

---

## 📦 Pemasangan Manual (.VSIX)

1. Unduh file `discode-1.3.0.vsix`.
2. Di VS Code, buka menu **Extensions** (`Ctrl + Shift + X`).
3. Klik ikon titik tiga (**`...`**) di pojok kanan atas tab Extensions.
4. Pilih **Install from VSIX...** lalu pilih file `discode-1.3.0.vsix`.

---

## 💻 Pengembangan Lokal

```bash
# Clone repository
git clone https://github.com/developer/discode.git
cd discode

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Jalankan Unit Testing
npm test

# Tekan F5 di VS Code untuk meluncurkan jendela Extension Development Host
```

---

## 📄 Lisensi
Didistribusikan di bawah lisensi MIT.
