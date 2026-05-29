# AyuClinc - Vercel के लिए Setup Guide

यह guide आपको AyuClinc को Vercel पर deploy करने के लिए सभी जानकारी देता है।

## 📋 Overview

AyuClinc एक Ayurveda clinic के लिए एक modern web application है जो निम्नलिखित features provide करता है:

- **Clinic Information Management** - Clinic details, hours, contact info
- **Services Management** - Services listing और pricing
- **Appointments** - Online appointment booking
- **Blog** - Health tips और articles
- **Gallery** - Clinic photos और testimonials
- **Team Management** - Doctor और staff profiles
- **Admin Panel** - Complete content management
- **Multi-language Support** - English और Hindi

## 🚀 Quick Start

### 1. Code को GitHub पर Push करें

```bash
cd repo_ayuclinc/artifacts/ayuclinc
git add .
git commit -m "Prepare for Vercel deployment"
git push origin Rapl
```

### 2. Vercel पर Project Create करें

1. https://vercel.com पर जाएँ
2. "Add New" → "Project" select करें
3. GitHub repository select करें
4. Branch: `Rapl` select करें
5. "Import" click करें

### 3. Database Setup करें

**Vercel Postgres Create करें:**

1. Vercel Dashboard → "Storage" tab
2. "Create New" → "Postgres" click करें
3. Database name: `ayuclinc-db`
4. Region select करें
5. "Create" click करें
6. Connection string copy करें

**Vercel Blob Create करें:**

1. Vercel Dashboard → "Storage" tab
2. "Create New" → "Blob" click करें
3. Name: `ayuclinc-blob`
4. "Create" click करें
5. Token copy करें

### 4. Environment Variables Set करें

Vercel Project Settings में जाएँ और ये variables add करें:

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | Vercel Postgres URL | Required - database connection |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token | Required - file storage |
| `SESSION_SECRET` | Random 32+ char string | Required - session encryption |
| `ADMIN_PASSWORD` | Your password | Required - admin login |
| `ADMIN_EMAIL` | Your email | Required - notifications |
| `NODE_ENV` | `production` | Required - production mode |
| `SMTP_HOST` | `smtp.gmail.com` | Optional - email notifications |
| `SMTP_PORT` | `587` | Optional - email notifications |
| `SMTP_USER` | Your email | Optional - email notifications |
| `SMTP_PASS` | App password | Optional - email notifications |

### 5. Deploy करें

1. Vercel Dashboard में "Deploy" button click करें
2. Build process complete होने का wait करें
3. Site live हो जाएगा!

## 🔑 Environment Variables की Details

### Required Variables

**DATABASE_URL**
- Vercel Postgres से copy करें
- Format: `postgresql://user:password@host:port/database`
- यह database में सभी clinic data store करता है

**BLOB_READ_WRITE_TOKEN**
- Vercel Blob से copy करें
- यह images, documents आदि store करता है
- 500MB तक files upload कर सकते हैं

**SESSION_SECRET**
- Admin login के लिए session encryption
- कम से कम 32 characters होना चाहिए
- Generate करने के लिए: `openssl rand -base64 32`

**ADMIN_PASSWORD**
- Admin panel में login करने के लिए
- `/admin` पर जाकर password से login करें

**ADMIN_EMAIL**
- Appointment notifications यहाँ भेजे जाते हैं
- Clinic contact email

**NODE_ENV**
- हमेशा `production` set करें Vercel पर

### Optional Variables

**Email Configuration (SMTP)**

अगर appointment notifications चाहिए:

```
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = your-email@gmail.com
SMTP_PASS = your-app-password
```

Gmail के लिए app password generate करें:
1. https://myaccount.google.com/apppasswords जाएँ
2. "App passwords" select करें
3. Password generate करें और copy करें

## 📁 Project Structure

```
artifacts/ayuclinc/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   └── lib/           # Utilities
│   └── public/            # Static files
├── server/                # Express backend
│   ├── _core/            # Core setup (auth, vite, etc)
│   ├── routers.ts        # tRPC API routes
│   ├── db.ts             # Database queries
│   ├── storage-vercel.ts # Vercel Blob integration
│   └── email.ts          # Email sending
├── drizzle/              # Database schema
│   └── schema.ts         # Table definitions
├── shared/               # Shared types
├── package.json          # Dependencies
├── vite.config.ts        # Frontend build config
├── vercel.json          # Vercel deployment config
└── .env.example         # Environment variables template
```

## 🗄️ Database Schema

Application निम्नलिखित tables use करता है:

| Table | Purpose |
|-------|---------|
| `users` | Admin users और authentication |
| `clinic_info` | Clinic details, hours, contact |
| `services` | Clinic services listing |
| `appointments` | Patient appointments |
| `blog_posts` | Blog articles |
| `testimonials` | Patient testimonials |
| `faqs` | Frequently asked questions |
| `gallery_images` | Clinic photos |
| `team_members` | Doctor और staff profiles |
| `newsletter_subscribers` | Email subscribers |
| `contact_messages` | Contact form submissions |

## 🔐 Security Notes

1. **Session Secret** - Strong random string use करें
2. **Admin Password** - Complex password set करें
3. **Database** - Vercel Postgres automatically encrypted है
4. **Storage** - Vercel Blob secure है
5. **SMTP** - App password use करें (full password नहीं)
6. **Environment Variables** - Vercel में encrypted store होते हैं

## 📱 Features

### Public Pages

- **Home** - Landing page with clinic info
- **Services** - Services listing
- **About** - Clinic information
- **Blog** - Health articles
- **Gallery** - Clinic photos
- **Team** - Doctor profiles
- **Contact** - Contact form
- **Appointments** - Booking form

### Admin Panel

- **Dashboard** - Overview
- **Clinic Info** - Edit clinic details
- **Services** - Manage services
- **Appointments** - View और manage bookings
- **Blog** - Create और edit articles
- **Testimonials** - Approve testimonials
- **Gallery** - Upload images
- **Team** - Manage staff
- **FAQs** - Manage questions
- **Newsletter** - Email subscribers
- **Messages** - Contact form submissions

## 🧪 Testing

### Local Testing (Optional)

```bash
# Dependencies install करें
pnpm install

# Build करें
pnpm build

# Type checking
pnpm typecheck

# Development server
pnpm dev
```

### Post-Deployment Testing

1. **Site Access करें**
   ```
   https://your-app.vercel.app
   ```

2. **Admin Panel Check करें**
   ```
   https://your-app.vercel.app/admin
   ```

3. **API Health Check करें**
   ```
   curl https://your-app.vercel.app/healthz
   ```

4. **File Upload Test करें**
   - Admin panel में image upload करें
   - Vercel Blob में store हो गया verify करें

## 🐛 Troubleshooting

### Build Fails

**समस्या:** Vercel deployment fail हो रहा है

**समाधान:**
1. Vercel logs check करें
2. Local में `pnpm build` run करके test करें
3. Dependencies सही हैं verify करें
4. TypeScript errors fix करें

### Database Connection Error

**समस्या:** "DATABASE_URL is not configured"

**समाधान:**
1. Vercel Settings में DATABASE_URL check करें
2. URL format सही है verify करें
3. Vercel Postgres active है verify करें
4. Deployment को redeploy करें

### File Upload Not Working

**समस्या:** Images upload नहीं हो रहे

**समाधान:**
1. BLOB_READ_WRITE_TOKEN set है verify करें
2. Vercel Blob active है verify करें
3. Token valid है verify करें
4. File size < 500MB है verify करें

### Admin Login Not Working

**समस्या:** Admin password काम नहीं कर रहा

**समाधान:**
1. ADMIN_PASSWORD सही है verify करें
2. SESSION_SECRET set है verify करें
3. Cookies enabled हैं verify करें
4. Browser cache clear करें

## 📚 Documentation

- **VERCEL_DEPLOYMENT.md** - Detailed deployment guide
- **STORAGE_MIGRATION.md** - Storage setup details
- **DEPLOYMENT_CHECKLIST.md** - Pre-deployment checklist
- **.env.example** - Environment variables template

## 💡 Tips

1. **Domain Setup** - Custom domain के लिए Vercel settings में जाएँ
2. **SSL Certificate** - Automatically enabled है
3. **Analytics** - Vercel Analytics enable करें
4. **Monitoring** - Error tracking setup करें
5. **Backups** - Regular database backups लें

## 🆘 Support

अगर कोई issue आए:

1. Vercel Logs check करें
2. Environment variables verify करें
3. Database connection test करें
4. GitHub में issue create करें
5. Vercel support contact करें

## ✅ Deployment Checklist

- [ ] Code GitHub पर push किया
- [ ] Vercel project created
- [ ] Vercel Postgres setup किया
- [ ] Vercel Blob setup किया
- [ ] Environment variables set किए
- [ ] Deployment successful
- [ ] Site accessible है
- [ ] Admin panel working है
- [ ] Database connected है
- [ ] File upload working है

## 🎉 Success!

अगर सभी steps complete हैं, तो आपका AyuClinc site live है!

अब आप:
1. Admin panel में login करें
2. Clinic information update करें
3. Services add करें
4. Blog posts create करें
5. Team members add करें
6. Gallery images upload करें

Happy deployment! 🚀

---

**Last Updated:** May 29, 2026
**Version:** 1.0
**Status:** Ready for Production
