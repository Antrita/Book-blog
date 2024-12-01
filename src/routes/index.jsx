import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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
import AdminLayout from '../Pages/admin/AdminLayout';
import CMSAdminDashboard from '../Pages/admin/cms/CMSAdminDashboard';
import ComponentEditor from '../Pages/admin/cms/ComponentEditor';
//import ThemeEditor from '../Pages/admin/cms/ThemeEditor';
import LayoutManager from '../Pages/admin/cms/LayoutManager';
import ProtectedRoute from '../utils/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';
import AdminSettings from '../Pages/admin/AdminSettings';

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated && window.location.pathname.startsWith('/admin/')) {
      navigate('/admin');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MainNavbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Blog Routes */}
        <Route path="/blogs" element={<BlogLayout />}>
          <Route index element={<Reviews />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="top10" element={<TopBooks />} />
          <Route path="recommendations" element={<Recommendations />} />
          <Route path="miscellaneous" element={<Miscellaneous />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin">
          <Route 
            index 
            element={
              isAuthenticated ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <AdminLogin />
              )
            } 
          />
          
          {/* Protected Admin Routes */}
          <Route 
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* Existing Admin Routes */}
            <Route path="dashboard" element={<BlogList category="all" title="Dashboard" />} />
            <Route path="posts" element={<BlogList category="all" title="All Posts" />} />
            <Route path="editor" element={<BlogEditor />} />
            <Route path="editor/:id" element={<BlogEditor />} />

            {/* New CMS Routes */}
            <Route path="cms" element={<CMSAdminDashboard />}>
              <Route index element={<ComponentEditor />} />
              <Route path="components" element={<ComponentEditor />} />
             
              <Route path="layouts" element={<LayoutManager />} />
            </Route>

            {/* Settings Route */}
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>

        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default AppRoutes;