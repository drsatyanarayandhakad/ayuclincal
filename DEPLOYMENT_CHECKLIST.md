# Vercel Deployment Checklist

यह checklist आपको Vercel पर successful deployment के लिए guide करेगा।

## Pre-Deployment (Local)

- [ ] Repository को latest code के साथ update करें
- [ ] `pnpm install` run करें
- [ ] `pnpm build` successfully complete हो
- [ ] `pnpm typecheck` कोई error न दे
- [ ] सभी changes को commit करें
- [ ] GitHub पर push करें

```bash
cd repo_ayuclinc/artifacts/ayuclinc
pnpm install
pnpm build
pnpm typecheck
git add .
git commit -m "Ready for Vercel deployment"
git push origin Rapl
```

## Vercel Setup

### Account & Project

- [ ] Vercel account create करें (https://vercel.com)
- [ ] GitHub से authorize करें
- [ ] Repository को Vercel में import करें
- [ ] Branch select करें: `Rapl`

### Database Setup

- [ ] Vercel Postgres create करें
  - [ ] Database name: `ayuclinc-db`
  - [ ] Region select करें
  - [ ] `POSTGRES_URL_NON_POOLING` copy करें
- [ ] Vercel Blob create करें
  - [ ] Blob name: `ayuclinc-blob`
  - [ ] `BLOB_READ_WRITE_TOKEN` copy करें

### Environment Variables

Project Settings → Environment Variables में add करें:

- [ ] `DATABASE_URL` = Vercel Postgres URL
- [ ] `BLOB_READ_WRITE_TOKEN` = Vercel Blob token
- [ ] `SESSION_SECRET` = Random 32+ char string
- [ ] `ADMIN_PASSWORD` = Your admin password
- [ ] `ADMIN_EMAIL` = Your email address
- [ ] `NODE_ENV` = `production`

**Optional (Email के लिए):**
- [ ] `SMTP_HOST` = `smtp.gmail.com`
- [ ] `SMTP_PORT` = `587`
- [ ] `SMTP_USER` = Your email
- [ ] `SMTP_PASS` = App password
- [ ] `ADMIN_EMAIL` = Admin email

## Deployment

- [ ] Vercel में "Deploy" button click करें
- [ ] Build process complete होने का wait करें
- [ ] Deployment logs check करें
- [ ] कोई errors नहीं हैं verify करें

### Build Logs Check करें

```
✅ Build successful
✅ Functions deployed
✅ Frontend built
✅ No errors
```

## Post-Deployment

### Site Access करें

- [ ] Vercel domain पर जाएँ (e.g., `ayuclinc.vercel.app`)
- [ ] Homepage load हो रहा है verify करें
- [ ] No 404 or 500 errors

### Admin Panel Test करें

- [ ] `/admin` पर जाएँ
- [ ] Admin password से login करें
- [ ] Dashboard load हो रहा है verify करें

### Database Test करें

- [ ] Clinic info page खोलें
- [ ] Data load हो रहा है verify करें
- [ ] अगर कोई data नहीं है तो admin panel से add करें

### File Upload Test करें

- [ ] Admin panel में image upload करें
- [ ] Upload successful हो
- [ ] Image display हो रहा है verify करें
- [ ] Vercel Blob में file store हो गई verify करें

### API Test करें

```bash
# Health check
curl https://your-app.vercel.app/healthz

# Sitemap
curl https://your-app.vercel.app/sitemap.xml

# Clinic info
curl https://your-app.vercel.app/api/trpc/clinic.getInfo
```

## Monitoring

### Daily Checks

- [ ] Site accessible है
- [ ] No error logs
- [ ] Database responsive है
- [ ] Storage working है

### Weekly Checks

- [ ] Performance metrics check करें
- [ ] Error rates check करें
- [ ] Database size check करें
- [ ] Storage usage check करें

## Troubleshooting

### Build Fails

- [ ] Logs में error message देखें
- [ ] Local में `pnpm build` run करके test करें
- [ ] Dependencies सही हैं verify करें
- [ ] Node version compatible है verify करें

### Database Connection Error

- [ ] DATABASE_URL सही है verify करें
- [ ] Vercel Postgres active है verify करें
- [ ] Connection string में typo नहीं है
- [ ] Firewall rules check करें

### Storage Not Working

- [ ] BLOB_READ_WRITE_TOKEN set है verify करें
- [ ] Vercel Blob active है verify करें
- [ ] Token valid है verify करें
- [ ] File size < 500MB है verify करें

### Site Not Loading

- [ ] Vercel deployment status check करें
- [ ] Browser cache clear करें
- [ ] DNS propagation wait करें (24 hours)
- [ ] Vercel status page check करें

## Optimization

- [ ] Custom domain setup करें (optional)
- [ ] SSL certificate enable करें (automatic)
- [ ] Analytics enable करें
- [ ] Performance monitoring setup करें

## Backup & Security

- [ ] Database backups enable करें
- [ ] Environment variables secure हैं verify करें
- [ ] Admin password strong है verify करें
- [ ] Session secret complex है verify करें

## Documentation

- [ ] VERCEL_DEPLOYMENT.md read करें
- [ ] STORAGE_MIGRATION.md read करें
- [ ] Environment variables document करें
- [ ] Deployment process document करें

## Final Verification

- [ ] ✅ Site live है
- [ ] ✅ Admin panel working है
- [ ] ✅ Database connected है
- [ ] ✅ Storage working है
- [ ] ✅ Emails sending हैं (अगर configured)
- [ ] ✅ No critical errors

## Go Live!

अगर सभी items checked हैं:

1. ✅ Domain setup करें (अगर custom domain चाहिए)
2. ✅ DNS point करें Vercel को
3. ✅ SSL certificate verify करें
4. ✅ Final testing करें
5. ✅ Users को announce करें

---

**Deployment Date:** _______________

**Deployed By:** _______________

**Notes:** _______________

Happy deployment! 🚀
