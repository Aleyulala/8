# 📌 saved

> **Giriş sayfası olmayan, tamamen tarayıcınızın yerel IndexedDB hafızasında çalışan, GitHub Pages uyumlu ve GPL-3.0 lisanslı açık kaynaklı Linkwarden alternatifi.**

---

## 🌟 Neden `saved`?

[Linkwarden](https://linkwarden.app) harika bir açık kaynaklı yer imi yöneticisidir, ancak çalıştırmak için Docker, PostgreSQL veritabanı, kimlik doğrulama/giriş ve bir sunucu gerektirir. 

**`saved`**, Linkwarden'ın sade ve modern arayüzünden ilham alarak geliştirilmiş, ancak **hiçbir sunucuya, veritabanı kurulumuna veya üyelik girişine ihtiyaç duymayan** hafif, yerel ve gizlilik odaklı bir alternatiftir:

- 🚀 **Giriş Sayfası Yok:** Uygulamayı açtığınız anda hazır. Hesap açma, şifre girme veya oturum yönetimi gerekmez.
- 🌐 **GitHub Pages Uyumlu:** Tamamen statik istemci tarafı (SPA) mimarisi. Sıfır maliyetle doğrudan GitHub Pages veya herhangi bir statik sunucuda çalışır.
- 💾 **IndexedDB ile Yerel Depolama:** Verileriniz (`Dexie.js` ile reaktif olarak) tarayıcınızın güvenli yerel hafızasında saklanır. Hiçbir veri harici sunuculara iletilmez.
- 🗂️ **Koleksiyonlar & Etiketler:** Yer imlerinizi özel renkli koleksiyonlar ve `#etiket`ler ile düzenleyin.
- 📖 **Okuma Listesi & Arşiv:** Okumak istediğiniz içerikleri "Okuma Listesi"nde tutun, tamamlandığında işaretleyin veya arşivleyin.
- 🔄 **Tam Veri Taşınabilirliği (İçe/Dışa Aktarma):**
  - **Netscape Bookmark HTML:** Chrome, Firefox, Safari, Edge, Raindrop ve Linkwarden ile tam uyumlu yer imi içe ve dışa aktarımı.
  - **JSON Tam Yedekleme:** Koleksiyonlar, etiketler, notlar ve tüm bağlantılarınızı tek tıkla yedekleyin veya geri yükleyin.
- 🌓 **Karanlık / Aydınlık Mod:** Sistem temanıza uyum sağlayan modern ve göz yormayan arayüz.
- ⚖️ **GNU GPL v3.0 Lisansı:** %100 özgür ve açık kaynak kodlu.

---

## 📂 Proje Dizin Yapısı

Bu proje şu konumda yer almaktadır:
```
/home/negronn/İndirilenler/saved/
```

Klasör hiyerarşisi:
```
saved/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Otomatik GitHub Pages dağıtımı
├── src/
│   ├── components/             # React bileşenleri
│   │   ├── Navbar.tsx          # Arama, görünüm ve hızlı butonlar
│   │   ├── Sidebar.tsx         # Koleksiyonlar, etiketler ve filtreler
│   │   ├── LinkCard.tsx        # Linkwarden tarzı kart görünümü
│   │   ├── LinkListItem.tsx    # Kompakt liste görünümü
│   │   ├── AddEditLinkModal.tsx# Bağlantı ekleme/düzenleme formu
│   │   ├── ManageCollectionsModal.tsx # Koleksiyon yönetimi
│   │   ├── ManageTagsModal.tsx # Etiket yönetimi
│   │   ├── LinkDetailModal.tsx # Bağlantı detay & kişisel notlar
│   │   ├── ImportExportModal.tsx # HTML ve JSON aktarımı
│   │   └── SettingsModal.tsx   # Depolama durumu ve GPL 3.0 bilgisi
│   ├── db/
│   │   └── index.ts            # Dexie.js (IndexedDB) şeması ve başlangıç verileri
│   ├── types/
│   │   └── index.ts            # TypeScript tipleri
│   ├── utils/
│   │   ├── bookmarkParser.ts   # Netscape HTML yer imi işleyicisi
│   │   ├── exportImport.ts     # JSON yedekleme ve depolama boyutu hesabı
│   │   └── favicon.ts          # Favicon ve alan adı yardımcıları
│   ├── App.tsx                 # Ana uygulama
│   ├── main.tsx                # Giriş noktası
│   └── index.css               # Tailwind CSS yönergeleri
├── index.html                  # HTML şablonu
├── LICENSE                     # GNU General Public License v3.0
├── package.json                # Bağımlılıklar ve komutlar
├── tsconfig.json               # TypeScript yapılandırması
└── vite.config.ts              # Vite (base: './' - GitHub Pages için göreceli yollar)
```

---

## 🛠️ Kurulum ve Yerel Çalıştırma

Projeyi çalıştırmak için Node.js (v18+) gereklidir.

```bash
# Proje klasörüne gidin:
cd /home/negronn/İndirilenler/saved

# Bağımlılıkları yükleyin:
npm install

# Geliştirme sunucusunu başlatın:
npm run dev
```

Tarayıcınızda açılan adrese (genellikle `http://localhost:5173`) giderek anında kullanmaya başlayabilirsiniz.

---

## 🚀 GitHub Pages Üzerinde Yayınlama

Projede önceden yapılandırılmış GitHub Actions iş akışı (`.github/workflows/deploy.yml`) mevcuttur.

1. GitHub'da `saved` adında yeni bir **Public** veya **Private** depo açın.
2. Yerel projenizi GitHub'a gönderin:
   ```bash
   cd /home/negronn/İndirilenler/saved
   git init
   git add .
   git commit -m "feat: saved - Linkwarden alternative for GitHub Pages"
   git branch -M main
   git remote add origin https://github.com/<KULLANICI_ADINIZ>/saved.git
   git push -u origin main
   ```
3. GitHub deponuzda **Settings** > **Pages** menüsüne gidin:
   - **Source** olarak **GitHub Actions** seçeneğini seçin.
4. GitHub Actions otomatik olarak projeyi derleyecek ve `https://<kullanici-adiniz>.github.io/saved/` adresinde canlıya alacaktır!

---

## 📜 Lisans

Bu proje **GNU General Public License v3.0 (GPL-3.0)** altında lisanslanmıştır. Tam lisans metni için [LICENSE](./LICENSE) dosyasına göz atabilirsiniz.
