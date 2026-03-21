This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## CI/CD (GitHub Actions + Vercel)

Repo นี้มี workflow สำหรับรัน Test แล้ว Deploy ไป Vercel อัตโนมัติที่ `.github/workflows/ci-cd.yml`:

- Pull Request เข้า `main` → รัน `npm test` (build) แล้ว Deploy เป็น **Preview Deployment**
- Push/merge เข้า `main` → รัน `npm test` (build) แล้ว Deploy เป็น **Production Deployment**

### ต้องตั้งค่า GitHub Secrets

ไปที่ GitHub repo → Settings → Secrets and variables → Actions → New repository secret แล้วเพิ่ม:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### หา Vercel IDs/Token จากไหน

1) สร้าง Token: Vercel → Account Settings → Tokens → Create

2) หา `VERCEL_ORG_ID` และ `VERCEL_PROJECT_ID` (วิธีแนะนำ):

- ติดตั้ง Vercel CLI: `npm i -g vercel`
- ล็อกอิน: `vercel login`
- ในโฟลเดอร์โปรเจกต์: `vercel link` (เลือก Team/Project ให้ถูก)
- เปิดไฟล์ `.vercel/project.json` แล้วนำค่า `orgId` และ `projectId` ไปใส่เป็น Secrets

หมายเหตุ: Environment variables อื่น ๆ (เช่น `NEXT_PUBLIC_*`, keys ของ Clerk/Supabase/Google) ให้ตั้งใน Vercel Project Settings → Environment Variables ตามปกติ

หมายเหตุเพิ่มเติม: ใน workflow ใช้ `npm ci --legacy-peer-deps` เพื่อหลีกเลี่ยงการติดตั้งล้มจาก peer dependency บางตัวที่ยังไม่ประกาศรองรับ React 19 แบบ strict
