// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch('/api/users/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const getAllUsers = () => {
  return fetch('/api/users/all', {
    headers: {
      'Content-Type': 'application/json',
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

export const showAllAdvances = () => {
  return fetch('/api/advances', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const showMyAdvances = (token, userId = null) => {
  return userId 
    ? fetch(`/api/advances/user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }) 
    : fetch('/api/advances/user', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
};

export const showShipmentAdvances = (token, shipmentId) => {
  return fetch(`/api/advances/shipment/${shipmentId}`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
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