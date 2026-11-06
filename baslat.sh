#!/usr/bin/env bash
# Saved başlatıcı betiği
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

echo "============================================="
echo "   🚀 Saved - Bağlantı Yöneticisi Başlatılıyor"
echo "============================================="
echo "Adres: http://localhost:5173"
echo "Durdurmak için Ctrl+C tuşlarına basabilirsiniz."
echo ""

# Tarayıcıyı otomatik açarak Vite dev sunucusunu başlatır
npm run dev -- --open
