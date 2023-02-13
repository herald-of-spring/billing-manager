// route to get logged in user's info (needs the token)
// used
export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

// used
export const createUser = (userData) => {
  return fetch('/api/users/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};
// used
export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const getAllUsers = (token) => {
  return fetch('/api/users/all', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    }
  });
};

export const saveResetToken = (resetData) => {
  return fetch('/api/users/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resetData),
  });
};

export const useResetToken = (reset_token, resetData) => {
  return fetch(`/api/users/update/${reset_token}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resetData),
  });
};

// export const deleteUser = () => {}
// used
export const createShipment = (token, shipmentDetails) => {
  return fetch('/api/shipments/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(shipmentDetails),
  });
};
// used
export const getShipment = (token, key = null, value = null) => {
  return key 
    ? fetch(`/api/shipments/${key}/${value}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }) 
    : fetch('/api/shipments/', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
};
// used
export const updateShipment = (token, shipmentId, shipmentDetails) => {
  return fetch(`/api/shipments/update/${shipmentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(shipmentDetails),
  });
};

// export const deleteShipment = () => {}

export const createAdvance = (token, advanceDetails) => {
  return fetch('/api/advances/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(advanceDetails),
  });
};

export const showAllAdvances = (token) => {
  return fetch('/api/advances', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const showMyAdvances = (token, email) => {
  return fetch('/api/advances/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: {email}
  });
};

// used
export const showShipmentAdvances = (token, contract_num) => {
  return fetch('/api/advances/shipment', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: {contract_num}
  });
};

export const completeAdvance = (token, advanceId) => {
  return fetch(`/api/advances/complete/${advanceId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const updateAdvance = (token, advanceId, advanceDetails) => {
  return fetch(`/api/advances/update/${advanceId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(advanceDetails)
  });
};

// export const deleteAdvance = () => {}