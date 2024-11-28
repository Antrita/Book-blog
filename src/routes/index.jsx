import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainNavbar from '../Components/Navbar/Navbar';
import Home from '../Pages/Home/Home';
import About from '../Pages/About/About';
import BlogLayout from '../Pages/Blogs/BlogLayout';
import Reviews from '../Pages/Blogs/Reviews/Reviews';
import TopBooks from '../Pages/Blogs/TopBooks/TopBooks';
import Recommendations from '../pages/Blogs/Recommendations/recom';
import Miscellaneous from '../pages/Blogs/Misc/Misc';
import Contact from '../Pages/Contacts/Contact';
import BlogEditor from '../Pages/admin/BlogEditor';
import AdminLogin from '../Pages/admin/AdminLogin';
import BlogList from '../Pages/admin/BlogList';
import { ProtectedRoute } from '../utils/ProtectedRoute';

function AppRoutes() {
  return (
    <>
      <MainNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Blog Routes */}
        <Route path="/blogs" element={<BlogLayout />}>
          <Route index element={<Reviews />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="top10" element={<TopBooks />} />
          <Route path="recommendations" element={<Recommendations />} />
          <Route path="miscellaneous" element={<Miscellaneous />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route 
          path="/admin/editor" 
          element={
            <ProtectedRoute>
              <BlogEditor />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/posts" 
          element={
            <ProtectedRoute>
              <BlogList />
            </ProtectedRoute>
          } 
        />

        {/* Other Routes */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default AppRoutes;