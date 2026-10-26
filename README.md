
# 🚀 My Awesome Web App

මෙය Next.js (App Router), TypeScript, Tailwind CSS සහ Prisma ORM භාවිතයෙන් නිර්මාණය කරන ලද නවීන වෙබ් අඩවියකි/යෙදුමකි.

---

## 🛠️ Tech Stack (භාවිතා කළ තාක්ෂණයන්)

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database & ORM:** PostgreSQL / [Prisma ORM](https://www.prisma.io/)
- **Authentication:** Auth.js (NextAuth)
- **Hosting:**  Railway

---

## 📁 Project Structure (ෆෝල්ඩර ව්‍යුහය)

```text
├── app/                  # Next.js App Router (Pages, Layouts & API routes)
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage (marketplace landing page)
│   └── components/       # Reusable UI components
│   │    ├── marketplace/     # like daraz 
│   │    │   │
│   │    │   └── mCommon/           #common components for marketplace
│   │    └── inventory/       # for inventory managemet side page components
│   │    │   │
│   │    │   └── iCommon/          #common components for inventory
│   │    └── shared/          # shared components for inventory and marktplace
│   │     
│   └── inventory/        # Reusable UI components    
│   │
│   └── marketplace/
│
├── lib/                  # Utility functions & Prisma client setup
│   └── prisma.ts         # Prisma DB instance
├── prisma/               # Database schema & migrations
│   └── schema.prisma     # Prisma data models
└── public/               # Static assets (Images, Icons, SVG)



## 📡 API Reference / Endpoints

### 1. Get All Products (සියලුම ප්‍රොඩක්ට්ස් ලබා ගැනීම)

* **URL:** `/api/products`
* **Method:** `GET`
* **Auth Required:** No
* **Query Parameters (Optional):**
  * `page` (number) - පිටු අංකය (Default: 1)
  * `limit` (number) - එක් පිටුවකට අයිතම ගණන (Default: 10)

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "prod_123",
      "title": "Wireless Mouse",
      "price": 25.00,
      "inStock": true
    }
  ]
}

