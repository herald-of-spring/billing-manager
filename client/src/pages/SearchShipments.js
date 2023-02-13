import React, { useState } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns, Alert, Dropdown, Modal } from 'react-bootstrap';
import { BsPencilSquare } from 'react-icons/bs';

import Auth from '../utils/auth';
import { createShipment, getShipment, updateShipment, showShipmentAdvances, updateAdvance } from '../utils/API';
import { shipmentAlias, emptyShipmentForm } from '../utils/variables';

const SearchShipments = () => {
  // create state for holding returned shipment data
  const [shipmentList, setShipmentList] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  // create state for holding filter data
  const availableFilters = ['contract_num', 'bl_id', 'eta', 'product']
  const [filterSelection, setFilterSelection] = useState(availableFilters[0]);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  // set state for alert message
  const [errorContent, setErrorContent] = useState('');
  // set initial form state  
  const [shipmentDetails, setShipmentDetails] = useState(emptyShipmentForm);
  // set state for form validation
  // const [validated] = useState(false);
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  // set state for alert (for creating shipments)
  const [shipmentAlert, setShipmentAlert] = useState(false);
  // set state for alert message
  const [shipmentAlertContent, setShipmentAlertContent] = useState('');
  // set state for alert variant
  const [variant, setVariant] = useState('danger');
  // set state for shipment target
  const [selectedShipment, setSelectedShipment] = useState({ contract_num: '', index: '' });
  // set state for advance visibility
  const [showAdvance, setShowAdvance] = useState(false);
  // set state for advance data
  const [advanceList, setAdvanceList] = useState([]);

  // create method to search for shipments and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      throw new Error("You must be logged in to use this feature.");
    }
    setShowAlert(false);

    try {
      let response;
      if (!searchInput) {
        response = await getShipment(token);
      }
      else {
        response = await getShipment(token, filterSelection, searchInput);
      }

      const shipmentData = await response.json();
      if (!response.ok) {
        throw new Error(shipmentData.message);
      }
      console.log(shipmentData);
      setShipmentList({ ...shipmentData });
      setSearchInput('');
    } catch (err) {
      console.error(err);
      setShipmentList([]);
      setErrorContent(err);
      setShowAlert(true);
    }
  };

  // tracks shipment form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setShipmentDetails({ ...shipmentDetails, [name]: value });
  };

  // create function to handle creating a shipment
  const handleCreateShipment = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      throw new Error("You must be logged in to use this feature.");
    }
    setShipmentAlert(false);

    try {
      const response = await createShipment(token, shipmentDetails);
      const item = await response.json();
      if (!response.ok) {
        throw new Error(await item.message);
      }

      console.log(item);
      setShipmentAlertContent('Shipment entry successfully created.');
      setVariant('success');
      setShipmentAlert(true);
      setShipmentDetails(emptyShipmentForm);
    } catch (err) {
      console.error(err);
      setShipmentAlertContent(err);
      setVariant('danger');
      setShipmentAlert(true);
    }
  };

  // create function to handle updating a shipment
  const handleEditShipment = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      throw new Error("You must be logged in to use this feature.");
    }
    setShipmentAlert(false);

    try {
      const response = await updateShipment(token, selectedShipment.contract_num, shipmentDetails);
      const item = await response.json();
      if (!response.ok) {
        throw new Error(await item.message);
      }

      console.log(item);
      setShipmentAlertContent('Shipment entry successfully updated. Please refresh to see changes.');
      setVariant('success');
      setShipmentAlert(true);
      setShipmentDetails(emptyShipmentForm);
    } catch (err) {
      console.error(err);
      setShipmentAlertContent(err);
      setVariant('danger');
      setShipmentAlert(true);
    }
  };

  const findShipmentAdvance = async () => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      throw new Error("You must be logged in to use this feature.");
    }
    setShipmentAlert(false);

    try {
      const response = await showShipmentAdvances(token, selectedShipment.contract_num);
      const item = await response.json();
      if (!response.ok) {
        throw new Error(await item.message);
      }

      console.log(item);
      setAdvanceList({...item});
    } catch (err) {
      console.error(err);
      setShipmentAlertContent(err);
      setVariant('danger');
      setShipmentAlert(true);
    }
  }

  const editAdvance = async () => {

  }

  function CustomModal({ title, prefill, callback, inactive = false }) {
    return (
      <Modal
        size='lg'
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setShipmentDetails(emptyShipmentForm);
        }}
        fullscreen='true'
        aria-labelledby='shipment-modal'>
        <Modal.Header closeButton>
          <Modal.Title id='shipment-editor'>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form validate={values => {
            const errors = {};
            if (!values.shipping_line && !values.forwarder) {
              errors.shipping_line = "Either Shipping Line or Forwarder needs to have a value.";
              errors.forwarder = "Either Shipping Line or Forwarder needs to have a value.";
            }
            return errors;
          }}
          onSubmit={callback}>
            {/* show alert if server response is bad */}
            <Alert dismissible onClose={() => setShipmentAlert(false)} show={shipmentAlert} variant={variant}>
              {shipmentAlertContent}
            </Alert>
            {Object.keys(shipmentDetails).map((key) => (
              <Form.Group as={Row} className='mb-1' key={key}>
                <Form.Label column sm={6}>{shipmentAlias[key].name}</Form.Label>
                <Form.Control
                  type={shipmentAlias[key].type}
                  name={key}
                  onChange={handleInputChange}
                  value={shipmentDetails[key]}
                  validate={shipmentAlias[key].required ? required : ''}
                  plaintext={inactive}
                  readOnly={inactive}
                />
                <Form.Control.Feedback type='invalid'>{shipmentAlias[key].name} is required!</Form.Control.Feedback>
              </Form.Group> )
            )}
            {inactive ? <Button
                          variant='success'
                          onClick={() => {
                            findShipmentAdvance();
                            setShowAdvance(true);
                          }}>
                          Show Advances
                        </Button>
            : <Button type='submit' variant='success'>{title}</Button>}
          </Form>
          {showAdvance ? () => {
            advanceList.map((advance, index) => {
              return (
                <Card key={shipment.contract_num}>
                  <Card.Body>
                    <Card.Title>
                      <Card.Link
                        onClick={() => {
                          setShipmentDetails({ ... shipmentDetails, ...shipment });
                          setShowModal(true);
                          setSelectedShipment({ contract_num: shipment.contract_num, index });
                        }}
                        title="View Shipment"
                        callback={false}
                        inactive={true}>
                        {shipment.contract_num}
                      </Card.Link>
                      <Button
                        variant="light"
                        className="ms-3 mb-0"
                        onClick={() => {
                          setShipmentDetails({ ... shipmentDetails, ...shipment });
                          setShowModal(true);
                          setSelectedShipment({ contract_num: shipment.contract_num, index });
                        }}
                        title="Edit Shipment"
                        callback={handleEditShipment}
                        inactive={true}>
                        <BsPencilSquare />
                      </Button>
                    </Card.Title>
                    <Card.Subtitle className="mb-1 text-muted">Total Fees: ???</Card.Subtitle>
                    {/* <Card.Text></Card.Text> */}
                  </Card.Body>
                </Card>
              );
            });
          } : <></>}

        </Modal.Body>
      </Modal>
    )
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <Button
            variant='success'
            size='lg'
            onClick={() => setShowModal(true)}
            title="Create Shipment"
            callback={handleCreateShipment}
            inactive={true}>
            Create Shipment
          </Button>
        </Container>
        <Container>
          <h1>Shipment Search</h1>
          <Form onSubmit={handleFormSubmit}>
            {/* show alert if server response is bad */}
            <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
              {errorContent}
            </Alert>
            <Form.Row>
              <Col xs={12} md={6}>
                <Dropdown onSelect={(eventKey, event) => setFilterSelection(eventKey)}>
                  <Dropdown.Toggle variant='info'>
                    {shipmentAlias[filterSelection].name}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {availableFilters.map((el) => <Dropdown.Item eventKey={el}>{shipmentAlias[el].name}</Dropdown.Item>)}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type={shipmentAlias[filterSelection].type}
                  size='lg'
                  placeholder={`Search by ${shipmentAlias[filterSelection].name}`}
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {shipmentList.length
            ? `Viewing ${shipmentList.length} results:`
            : ''}
        </h2>
        <CardColumns>
          {shipmentList.map((shipment, index) => {
            return (
              <Card key={shipment.contract_num}>
                <Card.Body>
                  <Card.Title>
                    <Card.Link
                      onClick={() => {
                        setShipmentDetails({ ... shipmentDetails, ...shipment });
                        setShowModal(true);
                        setSelectedShipment({ contract_num: shipment.contract_num, index });
                      }}
                      title="View Shipment"
                      callback={false}
                      inactive={true}>
                      {shipment.contract_num}
                    </Card.Link>
                    <Button
                      variant="light"
                      className="ms-3 mb-0"
                      onClick={() => {
                        setShipmentDetails({ ... shipmentDetails, ...shipment });
                        setShowModal(true);
                        setSelectedShipment({ contract_num: shipment.contract_num, index });
                      }}
                      title="Edit Shipment"
                      callback={handleEditShipment}
                      inactive={true}>
                      <BsPencilSquare />
                    </Button>
                  </Card.Title>
                  <Card.Subtitle className="mb-1 text-muted">Total Fees: ???</Card.Subtitle>
                  {/* <Card.Text></Card.Text> */}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>

      <CustomModal />
    </>
  );
};

export default SearchShipments;
