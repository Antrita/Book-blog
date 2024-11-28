import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainNavbar from '../Components/Navbar/Navbar';
import Home from '../pages/Home/Home';
import About from '../Pages/About/About';
import BlogLayout from '../Pages/Blogs/BlogLayout';
import Reviews from '../pages/Blogs/Reviews/Reviews';
import TopBooks from '../pages/Blogs/TopBooks/TopBooks';
import Recommendations from '../pages/Blogs/Recommendations/recom';
import Miscellaneous from '../pages/Blogs/Misc/Misc';
import Contact from '../Pages/Contacts/Contact';

function AppRoutes() {
  return (
    <>
      <MainNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<BlogLayout />}>
          <Route path="reviews" element={<Reviews />} />
          <Route path="top10" element={<TopBooks />} />
          <Route path="recommendations" element={<Recommendations />} />
          <Route path="miscellaneous" element={<Miscellaneous />} />
        </Route>
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default AppRoutes;