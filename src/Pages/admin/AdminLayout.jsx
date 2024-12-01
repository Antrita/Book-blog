import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { 
  BookOpen, 
  Layout, 
  FileEdit, 
  Settings, 
  LogOut,
  Home,
  Menu,
  X
} from 'lucide-react';
import './AdminLayout.css';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navItems = [
    {
      path: '/admin/dashboard',
      label: 'Dashboard',
      icon: <Home size={20} />
    },
    {
      path: '/admin/posts',
      label: 'All Posts',
      icon: <BookOpen size={20} />
    },
    {
      path: '/admin/editor',
      label: 'New Post',
      icon: <FileEdit size={20} />
    },
    {
      path: '/admin/cms',
      label: 'CMS Editor',
      icon: <Layout size={20} />
    },
    {
      path: '/admin/settings',
      label: 'Settings',
      icon: <Settings size={20} />
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="admin-layout">
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h2 className="brand">BookNook</h2>
          <Button 
            variant="link" 
            className="toggle-btn"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <Menu size={24} /> : <X size={24} />}
          </Button>
        </div>

        <Nav className="flex-column sidebar-nav">
          {navItems.map((item) => (
            <Nav.Item key={item.path}>
              <Link
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              >
                {item.icon}
                <span className="nav-label">{item.label}</span>
              </Link>
            </Nav.Item>
          ))}
        </Nav>

        <div className="sidebar-footer">
          <Button 
            variant="outline-danger" 
            className="logout-btn"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      <div className="main-content">
        <Container fluid>
          <Row>
            <Col>
              <div className="content-wrapper">
                <Outlet />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AdminLayout;