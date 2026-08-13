# Woxly E-Commerce

Woxly is a modern, high-performance e-commerce web application built with **Next.js 16**, **React 19**, and **Tailwind CSS**. Designed for an exceptional user experience, it features smooth animations, responsive design, and global state management for an intuitive shopping flow.

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) + Custom Components
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & Embla Carousel
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Icons:** [Lucide React](https://lucide.dev/) & Tabler Icons
- **Notifications:** [Sonner](https://sonner.emilkowal.ski/)

## 🛒 Application Flow & Features

Woxly provides a complete end-to-end shopping experience. Below is the primary user flow:

### 1. Discovery & Browsing
- **Home Page (`/`)**: Features a dynamic Hero Slider for promotions, featured product categories, and trending/bestselling items.
- **Shop Page (`/shop`)**: A comprehensive product catalog with robust filtering and sorting capabilities. Users can toggle between **Grid View** and **List View** seamlessly.
- **Product Details (`/products/[slug]`)**: In-depth product information, including image galleries (with full-screen lightbox and thumbnail navigation), pricing, variants, and customer reviews.

### 2. User Engagement
- **Watchlist (`/watchlist`)**: Users can save items they are interested in for later by clicking the heart icon on any product card.
- **Authentication (`/login`, `/signup`)**: Secure user authentication for account management and order tracking.

### 3. Purchasing Flow
- **Cart (`/cart`)**: Sliding drawer or dedicated page to review selected items, adjust quantities, and see total costs.
- **Checkout (`/checkout`)**: Streamlined checkout process for shipping details, payment, and order confirmation.
- **Order Success (`/order-success/[id]`)**: Confirmation screen providing the user with their order ID and next steps.

### 4. Post-Purchase & Support
- **Track Order (`/track-order`)**: Users can input their order ID and email to see real-time shipping updates.
- **Account (`/account`)**: User profile management and order history.
- **Information Pages**: Accessible via the footer, including About, Contact, FAQs, Privacy Policy, Terms of Service, and Return Policy.

## 🛠️ Getting Started

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 📂 Project Structure

```
src/
├── app/                  # Next.js App Router pages and layouts
│   ├── products/         # Dynamic product routes
│   ├── shop/             # Main catalog and filtering
│   ├── checkout/         # Checkout flow
│   └── ...               # Other routes (cart, track-order, etc.)
├── components/           # Reusable UI components
│   ├── home/             # Home page specific components (HeroSlider, etc.)
│   ├── layout/           # Header, Footer, Navigation
│   ├── product/          # ProductCard, Galleries, Reviews
│   └── ui/               # Base UI components (buttons, inputs, dialogs)
├── store/                # Zustand state stores (cart, watchlist)
└── lib/                  # Utility functions and shared logic
```

## 📝 Scripts

- `npm run dev` - Starts the development server.
- `npm run build` - Builds the application for production.
- `npm run start` - Starts the production server.
- `npm run lint` - Runs ESLint to catch syntax and styling issues.
