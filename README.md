# LUNA Fashion – Catalogue + WhatsApp demo

Responsive React/Vite demonstration website with customer pages and a public admin demo.

## Start

```bash
npm install
npm run dev
```

GitHub Codespaces forwards port 5173. Open the forwarded URL.

## Pages
- `/` – homepage
- `/shop` – product collection
- `/admin` – public admin demo (no authentication)

## Important
- No backend or shared database. Admin edits persist only in the **current browser's localStorage**.
- The WhatsApp number is a **placeholder**. Change it in `src/App.jsx` default settings or the Admin demo settings before any real use.
- Demo image URLs are external Unsplash images; replace with licensed brand images before delivering a commercial site.
- The public admin is **not secure for production**. Do not use it with real customer/business data.
- `vercel.json` enables direct browsing/refreshing the `/admin` route on Vercel.
