# E-Commerce MVP

A simple e-commerce Minimum Viable Product (MVP) built with a friend using React and Supabase. For testing and experimentation only.

## Main Features

- Authentication: Login/register (Supabase Auth)
- Products page: Search, filters (category), sorting, infinite scroll
- Cart + Wishlist
- Promo codes at checkout
- User dashboard: Edit profile + view orders
- Admin dashboard: Full CRUD for products, manage promo codes and users

## Tech Stack

- **Frontend**: React (Vite or CRA), React Router, Tailwind CSS, Shadcn/UI, Sonner (notifications), Zustand (state for cart/wishlist/user), react-infinite-scroll-component
- **Backend**: Supabase (Auth, Database, Storage)

## Database Structure

- `users`: id, name, email, role ('user' or 'admin')
- `products`: id, title, description, price, image_url, category, stock
- `cart_items`: user_id, product_id, quantity (unique constraint)
- `wishlist_items`: user_id, product_id (unique)
- `orders`: id, user_id, total_amount, status, promocode_id, created_at
- `order_items`: order_id, product_id, quantity, price_at_purchase
- `promocodes`: code (unique), discount_percentage, expires_at, is_active
- Storage: bucket "product-images"
- RLS enabled: Public read on products, owner/admin access on others

## Setup

1. `git clone <repo-url>`
2. `npm install`
3. Add env vars in `.env`:
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
4. `npm run dev`

## Notes

- Experimental project only (no real payments or reviews)
- To create admin: Manually change role in database

Enjoy the code! 🚀
