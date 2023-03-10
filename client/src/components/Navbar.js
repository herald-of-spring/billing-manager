import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';
import { getMe } from '../utils/API';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  const isSuper = async () => {
    const response = await getMe(Auth.getToken());
    if (!response.ok) {
      return false;
    }
    const me = await response.json();
    return me.isSuper;
  }

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            Shipment Manager
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/users'>
                Users
              </Nav.Link>
              <Nav.Link as={Link} to='/'>
                Shipments
              </Nav.Link>
              {/* if user is logged in show their advances and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/myAdvances'>
                    My Advances
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Log Out</Nav.Link>
                </> 
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Log In/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Log In</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
