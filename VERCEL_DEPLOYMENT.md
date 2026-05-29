# Vercel Deployment Guide for AyuClinc

यह guide आपको AyuClinc को Vercel पर deploy करने में मदद करेगा।

## Prerequisites

- GitHub account (code को push करने के लिए)
- Vercel account (free tier काफी है)
- PostgreSQL database (Vercel Postgres recommended)

## Step 1: GitHub में Code Push करें

```bash
cd repo_ayuclinc
git add .
git commit -m "Prepare for Vercel deployment"
git push origin Rapl
```

## Step 2: Vercel में Project Create करें

1. https://vercel.com पर जाएँ
2. "Add New" → "Project" क्लिक करें
3. अपना GitHub repository select करें (ayuclinc)
4. Branch select करें: `Rapl`
5. "Import" क्लिक करें

## Step 3: Vercel Postgres Setup करें

### 3a. Database Create करें

1. Vercel Dashboard में जाएँ
2. "Storage" tab क्लिक करें
3. "Create New" → "Postgres" क्लिक करें
4. Database का नाम दें: `ayuclinc-db`
5. Region select करें (अपने पास का)
6. "Create" क्लिक करें

### 3b. Connection String Copy करें

1. Database को click करें
2. ".env.local" tab में जाएँ
3. `POSTGRES_URL_NON_POOLING` को copy करें (यह आपका DATABASE_URL है)

## Step 4: Vercel Blob Storage Setup करें

1. Vercel Dashboard में "Storage" tab
2. "Create New" → "Blob" क्लिक करें
3. Blob का नाम दें: `ayuclinc-blob`
4. "Create" क्लिक करें
5. ".env.local" tab में `BLOB_READ_WRITE_TOKEN` को copy करें

## Step 5: Environment Variables Set करें

Vercel Project में:

1. "Settings" → "Environment Variables" जाएँ
2. नीचे दिए गए सभी variables को add करें:

```
DATABASE_URL = [Vercel Postgres से copied]
BLOB_READ_WRITE_TOKEN = [Vercel Blob से copied]
SESSION_SECRET = [कोई strong random string, min 32 chars]
ADMIN_PASSWORD = [अपना admin password]
ADMIN_EMAIL = [आपका email]
NODE_ENV = production
```

### SESSION_SECRET कैसे generate करें:

**Linux/Mac में terminal में:**
```bash
openssl rand -base64 32
```

**Windows में PowerShell में:**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { [byte](Get-Random -Maximum 256) }))
```

### Optional Email Configuration:

अगर appointment notifications चाहिए तो:

```
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = your-email@gmail.com
SMTP_PASS = your-app-password
```

Gmail के लिए:
1. https://myaccount.google.com/apppasswords जाएँ
2. "App passwords" generate करें
3. उसे `SMTP_PASS` में paste करें

## Step 6: Database Migrations Run करें

1. Vercel Dashboard में Project खोलें
2. "Deployments" tab में latest deployment देखें
3. Deployment complete होने का wait करें
4. अगर कोई error हो तो logs check करें

### Database को manually initialize करने के लिए:

```bash
# Local में (अगर database URL है)
DATABASE_URL="your-postgres-url" pnpm db:push
```

## Step 7: Deploy करें

1. Vercel में "Deployments" tab जाएँ
2. "Deploy" button दिखेगा या automatic deployment हो सकती है
3. Deployment complete होने का wait करें
4. आपका site live हो जाएगा!

## Troubleshooting

### Database Connection Error

**समस्या:** `DATABASE_URL is not configured`

**समाधान:**
1. Vercel Settings में DATABASE_URL check करें
2. सुनिश्चित करें कि URL सही है
3. Deployment को redeploy करें

### Storage Upload Error

**समस्या:** `Storage upload failed`

**समाधान:**
1. BLOB_READ_WRITE_TOKEN check करें
2. Vercel Blob storage active है या नहीं check करें
3. Token को refresh करें

### Build Fails

**समस्या:** Build में error आ रहा है

**समाधान:**
1. Vercel Deployments में logs देखें
2. Local में `pnpm build` run करके check करें
3. Dependencies सही हैं या नहीं verify करें

## Important Files

- `.env.example` - सभी required environment variables
- `vercel.json` - Vercel configuration
- `server/storage-vercel.ts` - Vercel Blob integration
- `drizzle/schema.ts` - Database schema

## Database Schema Initialize करना

पहली बार deployment के बाद database tables create करने के लिए:

```bash
# Local machine से (अगर DATABASE_URL है)
DATABASE_URL="postgresql://..." pnpm db:push
```

या Vercel में एक API endpoint call करके:

```bash
curl -X POST https://your-vercel-app.vercel.app/api/init-db
```

## Support

अगर कोई issue आए:

1. Vercel Logs check करें
2. `.env.example` से सभी variables verify करें
3. Database connection test करें
4. GitHub में issue create करें

## Next Steps

1. Admin panel में login करें: `https://your-app.vercel.app/admin`
2. Clinic information update करें
3. Services, blog posts, team members add करें
4. Gallery images upload करें

Happy Deployment! 🚀
