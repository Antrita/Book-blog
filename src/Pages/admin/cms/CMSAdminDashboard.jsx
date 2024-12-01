import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Tab, Button } from 'react-bootstrap';
import { useApi } from '../../../utils/api';
import ComponentEditor from './ComponentEditor';
//import ThemeEditor from './ThemeEditor';
import BlogEditor from '../BlogEditor';
import LayoutManager from './LayoutManager';

const CMSAdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('components');
  const { callApi } = useApi();
  const [components, setComponents] = useState([]);
  const [theme, setTheme] = useState(null);
  const [layouts, setLayouts] = useState([]);

  useEffect(() => {
    fetchCMSData();
  }, []);

  const fetchCMSData = async () => {
    try {
      const [componentsData, themeData, layoutsData] = await Promise.all([
        callApi(api.get, '/api/admin/components'),
        callApi(api.get, '/api/admin/theme'),
        callApi(api.get, '/api/admin/layouts')
      ]);
      setComponents(componentsData);
      setTheme(themeData);
      setLayouts(layoutsData);
    } catch (error) {
      console.error('Error fetching CMS data:', error);
    }
  };

  const handleComponentUpdate = async (componentData) => {
    try {
      await callApi(api.put, `/api/admin/components/${componentData.id}`, componentData);
      fetchCMSData();
    } catch (error) {
      console.error('Error updating component:', error);
    }
  };

  return (
    <Container fluid className="cms-dashboard">
      <Row>
        <Col md={3} className="cms-sidebar">
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link 
                active={activeSection === 'components'}
                onClick={() => setActiveSection('components')}
              >
                Components
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeSection === 'theme'}
                onClick={() => setActiveSection('theme')}
              >
                Theme
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeSection === 'layouts'}
                onClick={() => setActiveSection('layouts')}
              >
                Layouts
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeSection === 'blogs'}
                onClick={() => setActiveSection('blogs')}
              >
                Blog Posts
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>

        <Col md={9} className="cms-content">
          <Tab.Content>
            {activeSection === 'components' && (
              <ComponentEditor 
                components={components}
                onUpdate={handleComponentUpdate}
              />
            )}
            {activeSection === 'theme' && (
              <ThemeEditor 
                theme={theme}
                onUpdate={handleThemeUpdate}
              />
            )}
            {activeSection === 'layouts' && (
              <LayoutManager 
                layouts={layouts}
                components={components}
                onUpdate={handleLayoutUpdate}
              />
            )}
            {activeSection === 'blogs' && (
              <BlogEditor />
            )}
          </Tab.Content>
        </Col>
      </Row>
    </Container>
  );
};

export default CMSAdminDashboard;