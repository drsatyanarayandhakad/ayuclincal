# Storage Migration: Manus Forge → Vercel Blob

यह document बताता है कि storage को Manus Forge से Vercel Blob में कैसे migrate करें।

## क्या बदला?

### पहले (Manus Forge):
```typescript
import { storagePut, storageGet } from "./storage";

// Files को Manus Forge में upload होते थे
const { url } = await storagePut("images/clinic.jpg", fileBuffer);
// URL: /manus-storage/images/clinic_abc123.jpg
```

### अब (Vercel Blob):
```typescript
import { storagePut, storageGet } from "./storage-vercel";

// Files को Vercel Blob में upload होते हैं
const { url } = await storagePut("images/clinic.jpg", fileBuffer);
// URL: https://your-blob-store.vercel-storage.com/images/clinic_abc123.jpg
```

## Implementation Details

### 1. नया Storage Module

**File:** `server/storage-vercel.ts`

यह module Vercel Blob API को use करता है:
- `put()` - Files upload करता है
- `get()` - Files retrieve करता है
- `del()` - Files delete करता है

### 2. Environment Variables

**पहले:**
```
BUILT_IN_FORGE_API_URL=https://forge.manus.im
BUILT_IN_FORGE_API_KEY=your-key
```

**अब:**
```
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
```

### 3. URL Format बदला

- **पहले:** `/manus-storage/path/to/file`
- **अब:** `https://your-blob-store.vercel-storage.com/path/to/file`

यह public URLs हैं, कोई authentication नहीं चाहिए।

## Migration Steps

### Step 1: Code Update करें

अगर आप पहले से Manus storage use कर रहे थे:

```typescript
// पहले:
import { storagePut } from "./storage";

// अब:
import { storagePut } from "./storage-vercel";
```

### Step 2: Environment Variables Update करें

Vercel Settings में:

1. `BUILT_IN_FORGE_API_URL` को remove करें
2. `BUILT_IN_FORGE_API_KEY` को remove करें
3. `BLOB_READ_WRITE_TOKEN` को add करें (Vercel Blob से)

### Step 3: Existing Files Migrate करें

अगर आपके पास पहले से Manus storage में files हैं:

```bash
# Script to migrate files from Manus to Vercel Blob
# (यह manually करना पड़ेगा या custom script बनानी होगी)
```

### Step 4: Deploy करें

```bash
git add .
git commit -m "Migrate storage from Manus Forge to Vercel Blob"
git push origin Rapl
```

Vercel automatically redeploy करेगा।

## Features Comparison

| Feature | Manus Forge | Vercel Blob |
|---------|------------|------------|
| File Upload | ✅ | ✅ |
| File Download | ✅ | ✅ |
| File Delete | ✅ | ✅ |
| Public URLs | ✅ | ✅ |
| Signed URLs | ✅ | ✅ |
| Max File Size | 50MB | 500MB |
| Free Tier | Limited | 1000 uploads/month |
| Cost | Custom | Pay-as-you-go |

## API Reference

### storagePut()

```typescript
async function storagePut(
  relKey: string,           // File path (e.g., "images/clinic.jpg")
  data: Buffer | string,    // File content
  contentType?: string      // MIME type (default: "application/octet-stream")
): Promise<{ key: string; url: string }>
```

**Example:**
```typescript
const { url } = await storagePut(
  "clinic/banner.jpg",
  fileBuffer,
  "image/jpeg"
);
console.log(url); // https://your-blob-store.vercel-storage.com/clinic/banner_abc123.jpg
```

### storageGet()

```typescript
async function storageGet(
  relKey: string
): Promise<{ key: string; url: string }>
```

**Example:**
```typescript
const { url } = await storageGet("clinic/banner.jpg");
```

### storageGetSignedUrl()

```typescript
async function storageGetSignedUrl(
  relKey: string
): Promise<string>
```

**Example:**
```typescript
const signedUrl = await storageGetSignedUrl("clinic/banner.jpg");
// Vercel Blob में सभी URLs already public हैं
```

### storageDelete()

```typescript
async function storageDelete(
  relKey: string
): Promise<void>
```

**Example:**
```typescript
await storageDelete("clinic/banner.jpg");
```

## Troubleshooting

### Error: "BLOB_READ_WRITE_TOKEN is not set"

**समस्या:** Environment variable set नहीं है।

**समाधान:**
1. Vercel Dashboard में जाएँ
2. Project Settings → Environment Variables
3. `BLOB_READ_WRITE_TOKEN` add करें
4. Vercel Blob से token copy करें

### Error: "Upload failed"

**समस्या:** File upload नहीं हो रही।

**समाधान:**
1. File size check करें (max 500MB)
2. Token valid है या नहीं check करें
3. Network connection check करें
4. Vercel Blob storage active है या नहीं verify करें

### URLs में /manus-storage/ दिख रहा है

**समस्या:** पुरानी storage से files still use हो रही हैं।

**समाधान:**
1. Database में stored URLs को update करें
2. या files को re-upload करें
3. या एक redirect setup करें

## Performance Notes

- **Upload Speed:** Vercel Blob बहुत तेज़ है
- **Download Speed:** CDN के through serve होता है
- **Latency:** Minimal (same region में)
- **Reliability:** 99.99% uptime

## Cost Estimation

**Vercel Blob Pricing:**
- Free: 1000 uploads/month, 1GB storage
- Paid: $0.50 per 1000 uploads, $0.015 per GB/month

**Example:**
- 100 uploads/month = Free
- 5000 uploads/month = $2.25/month

## Security

- सभी files automatically encrypted हैं
- URLs public हैं (authentication नहीं)
- Private files के लिए signed URLs use करें
- CORS configured है

## Next Steps

1. ✅ Code update करें (storage-vercel.ts)
2. ✅ Environment variables set करें
3. ✅ Deploy करें
4. ✅ Test करें (file upload/download)
5. ✅ Existing files migrate करें (अगर कोई हों)

Happy migrating! 🚀
