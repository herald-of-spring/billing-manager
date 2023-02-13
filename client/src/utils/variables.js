export const shipmentAlias = {
  // shipment information
  bl_id: {
    name: 'Bill of Lading (BL)',
    type: 'text',
    required: false
  },
  etd: {
    name: 'Estimated Time of Delivery (ETD)',
    type: 'date',
    required: true
  },
  eta: {
    name: 'Estimated Time of Arrival (ETA)',
    type: 'date',
    required: true
  },
  contract_num: {
    name: 'Contract Number',
    type: 'text',
    required: true
  },
  product: {
    name: 'Product',
    type: 'text',
    required: true
  },
  count: {
    name: 'Count',
    type: 'number',
    required: true
  },
  dest_port: {
    name: 'Destination Port',
    type: 'text',
    required: true
  },
  loading_loc: {
    name: 'Loading Location',
    type: 'text',
    required: false
  },
  shipping_line: {
    name: 'Shipping Line',
    type: 'text',
    required: false
  },
  forwarder: {
    name: 'Forwarder',
    type: 'text',
    required: false
  },
  ocean_freight: {
    name: 'Ocean Freight (OF) Fee',
    type: 'number',
    required: true
  },
  thc: {
    name: 'Terminal Handling Charges (THC)',
    type: 'number',
    required: true
  },
  bl_price: {
    name: 'BL Price',
    type: 'number',
    required: true
  },
  seal: {
    name: 'Seal',
    type: 'number',
    required: true
  },
  lss: {
    name: 'Low Sulfur Surcharge (LSS)',
    type: 'number',
    required: false
  },
  telex_release: {
    name: 'Telex Release',
    type: 'number',
    required: false
  },
  payment_term: {
    name: 'Payment Terms',
    type: 'text',
    required: false
  },
  // fee information
  phytosanitary: {
    name: 'Phytosanitary Fee',
    type: 'number',
    required: true
  },
  phytosanitary_invoice: {
    name: 'Phytosanitary Invoice',
    type: 'text',
    required: false
  },
  phytosanity_reg: {
    name: 'Phytosanitary Registration Fee',
    type: 'number',
    required: true
  },
  preloading: {
    name: 'Preloading Fee',
    type: 'number',
    required: true
  },
  traffic_control: {
    name: 'Traffic Control Fee',
    type: 'number',
    required: true
  },
  handler: {
    name: 'Handling Fee',
    type: 'number',
    required: true
  },
  handling_tip: {
    name: 'Handling Tip',
    type: 'number',
    required: true
  },
  seal_tip: {
    name: 'Seal Tip',
    type: 'number',
    required: true
  },
  infrastructure_fee: {
    name: 'Infrastructure Fee',
    type: 'number',
    required: true
  },
  customs_reg: {
    name: 'Customs Registration',
    type: 'number',
    required: true
  },
  customs_reg_tip: {
    name: 'Customs Tip',
    type: 'number',
    required: true
  },
  return_customs_dec: {
    name: 'Customs Declaration Sheet',
    type: 'number',
    required: true
  },
  co: {
    name: 'Certificate of Origin (CO)',
    type: 'number',
    required: true
  },
  co_tip: {
    name: 'CO Tip',
    type: 'number',
    required: true
  },
  courier: {
    name: 'Courier Fee',
    type: 'number',
    required: true
  },
}

export const emptyShipmentForm = {
  bl_id: '', 
  etd: '',
  eta: '',
  contract_num: '',
  product: '',
  count: '',
  dest_port: '',
  loading_loc: '',
  shipping_line: '',
  forwarder: '',
  ocean_freight: '',
  thc: '',
  bl_price: '',
  seal: '',
  lss: '',
  telex_release: '',
  payment_term: '',
  phytosanitary: '',
  phytosanitary_invoice: '',
  phytosanity_reg: '',
  preloading: '',
  traffic_control: '',
  handler: '',
  handling_tip: '',
  seal_tip: '',
  infrastructure_fee: '',
  customs_reg: '',
  customs_reg_tip: '',
  return_customs_dec: '',
  co: '',
  co_tip: '',
  courier: '',
}

