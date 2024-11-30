# Book Blog CMS
### A work in Progress

A CMS-based blog for book reviews, recommendations, and miscellaneous bookish content. Built with React, Node.js, and MongoDB.

## Features

### Public Interface
- Book reviews with rating system
- Curated top 10 book lists
- Genre-based reading recommendations 
- Miscellaneous book-related content
- Mobile-responsive Bootstrap design

### Admin Panel
- JWT-based authentication
- Protected admin routes
- Full CRUD operations
- Rich text editor
- Category management

## Tech Stack

- **Frontend:** React 18, React Router, React Bootstrap
- **Backend:** Express, Node.js, MongoDB
- **Auth:** JWT, bcrypt
- **Dev Tools:** Vite, ESLint, Babel
- **DataBase/Backend:** MongoDB

## Installation

```bash
# Clone repository
git clone https://github.com/Antrita/book-blog.git
cd book-blog

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Development
npm run dev

# Production build
npm run build
```

## Project Structure

```
src/
├── api/
│   ├── adminRoutes.jsx      # Admin API endpoints
│   └── BlogRoutes.jsx       # Public blog endpoints
├── Components/
│   ├── HeroSection/
│   ├── Navbar/
│   └── ...
├── Pages/
│   ├── admin/              # Admin interface
│   ├── Blogs/             # Blog categories
│   └── ...
└── utils/
    └── ProtectedRoute.jsx  # Auth protection
```




