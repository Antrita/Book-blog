
import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNavbar from '../../Components/Navbar/Navbar';

function BlogLayout() {
  return (
    <div className="blog-layout">
     
      <div className="blog-content">
        <Outlet /> {/* This will render the child routes */}
      </div>
    </div>
  );
}

export default BlogLayout;