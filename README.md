# 📰 Sellpintar - Article Management Platform

Website manajemen artikel dengan otentikasi dan otorisasi berbasis role **User** dan **Admin**, dibangun menggunakan Next.js (App Router) dan terintegrasi dengan REST API eksternal.

## 🚀 Demo

- 🌐 **Home:** [https://sellpintar-ivannafrizaldi.vercel.app](https://sellpintar-ivannafrizaldi.vercel.app)
- 🔐 **Login:** [https://sellpintar-ivannafrizaldi.vercel.app/login](https://sellpintar-ivannafrizaldi.vercel.app/login)
- 📝 **Register:** [https://sellpintar-ivannafrizaldi.vercel.app/register](https://sellpintar-ivannafrizaldi.vercel.app/register)

## 📁 Repository

GitHub: [https://github.com/i-nafrizaldi/sellpintar-ivannafrizaldi](https://github.com/i-nafrizaldi/sellpintar-ivannafrizaldi)

---

## ✨ Fitur

### 1. User

#### 🔐 Authentication
- Login dengan validasi form (Zod + React Hook Form)
- Register dengan validasi form
- Redirect ke halaman artikel setelah login/register
- Logout yang redirect ke halaman login

#### 📄 List Artikel
- Filter berdasarkan kategori
- Searching artikel dengan debounce (300–500ms)
- Pagination jika artikel lebih dari 9

#### 📚 Detail Artikel
- Menampilkan konten lengkap
- Menampilkan 3 artikel lain dengan kategori yang sama

### 2. Admin

#### 🔐 Authentication
- Login dan register dengan validasi form
- Redirect otomatis setelah login/register
- Logout dengan redirect ke halaman login

#### 🏷️ Manajemen Kategori
- Melihat daftar kategori
- Searching kategori dengan debounce (300–500ms)
- Pagination jika data lebih dari 10
- Membuat kategori baru dengan validasi form
- Edit kategori dengan validasi form

#### 📝 Manajemen Artikel
- List artikel admin: filter, search, dan pagination
- Buat artikel baru dengan tampilan preview
- Edit artikel dengan tampilan preview dan validasi

---

## 🧪 Teknologi

| Teknologi         | Deskripsi                                        |
|-------------------|--------------------------------------------------|
| **Next.js**       | App Router (Server & Client Rendering)           |
| **Tailwind CSS**  | Utility-first styling                            |
| **Shadcn/ui**     | Komponen UI modern & clean                       |
| **Axios**         | Fetching API                                     |
| **Lucide React**  | Icon library modern                              |
| **Zod + RHF**     | Validasi dan manajemen form                      |
| **Redux Toolkit** | Manajemen global state                           |
| **Git + GitHub**  | Version control & kolaborasi                     |

---

## 🌐 API

- Base URL: `https://test-fe.mysellerpintar.com/api`
- Semua endpoint telah terintegrasi penuh di sisi client menggunakan Axios

---

## 🧭 Navigasi Halaman

### 🔓 Public Pages
- Home: `/`
- Login: `/login`
- Register: `/register`

### 📖 User Pages
- List Artikel: `/`
- Detail Artikel: `/articles/[id]`
- Profil User: `/profile/[id]`

### 🛠️ Admin Dashboard
- Dashboard Article: `/dashboard/articles`
- Create Article: `/dashboard/articles/create`
- Edit Article: `/dashboard/articles/[id]/edit`
- Dashboard Category: `/dashboard/categories`

---

## 💡 Fitur Tambahan

- ✅ Responsive di layar HP, Tablet, dan Desktop
- ✅ Loader, success message, dan error handler yang jelas
- ✅ Proteksi route dengan HOC `AuthGuard` & `AdminAuthGuard`
- ✅ Sidebar hanya muncul di halaman dashboard
- ✅ Backup data dummy & fallback jika API bermasalah

---

## 🛠️ Instalasi & Setup

```bash
# Clone repository
git clone https://github.com/i-nafrizaldi/sellpintar-ivannafrizaldi.git
cd sellpintar-ivannafrizaldi

# Install dependencies
npm install

# Jalankan project
npm run dev
```
---
## 🙌 Penulis
Made with ❤️ by Ivan Nafrizaldi
LinkedIn: linkedin.com/in/ivannafrizaldi
