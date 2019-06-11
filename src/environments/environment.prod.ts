export const environment = {
  production: true,
  api_image_url: 'http://mail.creditoguarani.com.py:4443/beta1/image/',
  api_url: 'http://mail.creditoguarani.com.py:4443/beta1',
  whitelist: ['172.16.1.51', 'http://172.16.1.51', '172.16.1.51:9191']
};

export const authorities = {
  "role": {
    "enterprise": {
      "addEnterprise": {
    	   "permittedRoles": ["ROLE_ENTERPRISE.ADD"]
    	 },
    	"editEnterprise": {
    	  "permittedRoles": ["ROLE_ENTERPRISE.EDIT"]
    	},
    	"viewEnterprise": {
    	  "permittedRoles": ["ROLE_ENTERPRISE.VIEW"]
    	},
    	"listEnterprise": {
    	  "permittedRoles": ["ROLE_ENTERPRISE.LIST"]
    	}
    },
    "subsidiary": {
      "addSubsidiary": {
    	   "permittedRoles": ["ROLE_SUBSIDIARY.ADD"]
    	 },
    	"editSubsidiary": {
    	  "permittedRoles": ["ROLE_SUBSIDIARY.EDIT"]
    	},
    	"viewSubsidiary": {
    	  "permittedRoles": ["ROLE_SUBSIDIARY.VIEW"]
    	},
    	"listSubsidiary": {
    	  "permittedRoles": ["ROLE_SUBSIDIARY.LIST"]
    	}
    },
    "users": {
      "addUsers": {
    	   "permittedRoles": ["ROLE_USERS.ADD"]
    	 },
    	"editUsers": {
    	  "permittedRoles": ["ROLE_USERS.EDIT"]
    	},
    	"viewUsers": {
    	  "permittedRoles": ["ROLE_USERS.VIEW"]
    	},
    	"listUsers": {
    	  "permittedRoles": ["ROLE_USERS.LIST"]
    	},
    	"deleteUsers": {
    	  "permittedRoles": ["ROLE_DELETE.LIST"]
    	}
    },
    "client": {
      "addClient": {
    	   "permittedRoles": ["ROLE_CLIENT.ADD"]
    	 },
    	"editClient": {
    	  "permittedRoles": ["ROLE_CLIENT.EDIT"]
    	},
    	"viewClient": {
    	  "permittedRoles": ["ROLE_CLIENT.VIEW"]
    	},
    	"listClient": {
    	  "permittedRoles": ["ROLE_CLIENT.LIST"]
    	},
    	"deleteClient": {
    	  "permittedRoles": ["ROLE_CLIENT.DELETE"]
    	}
    },
    "role": {
      "addRole": {
    	   "permittedRoles": ["ROLE_ROLE.ADD"]
    	 },
    	"editRole": {
    	  "permittedRoles": ["ROLE_ROLE.EDIT"]
    	},
    	"viewRole": {
    	  "permittedRoles": ["ROLE_ROLE.VIEW"]
    	},
    	"listRole": {
    	  "permittedRoles": ["ROLE_ROLE.LIST"]
    	},
    	"deleteRole": {
    	  "permittedRoles": ["ROLE_ROLE.DELETE"]
    	}
    },
    "reference-types": {
      "addReferenceTypes": {
    	   "permittedRoles": ["ROLE_REFERENCE_TYPES.ADD"]
    	 },
    	"editReferenceTypes": {
    	  "permittedRoles": ["ROLE_REFERENCE_TYPES.EDIT"]
    	},
    	"viewReferenceTypes": {
    	  "permittedRoles": ["ROLE_REFERENCE_TYPES.VIEW"]
    	},
    	"listReferenceTypes": {
    	  "permittedRoles": ["ROLE_REFERENCE_TYPES.LIST"]
    	}
    },
    "calculation-types": {
      "addCalculationTypes": {
    	   "permittedRoles": ["ROLE_CALCULATIONS_TYPES.ADD"]
    	 },
    	"editCalculationTypes": {
    	  "permittedRoles": ["ROLE_CALCULATIONS_TYPES.EDIT"]
    	},
    	"viewCalculationTypes": {
    	  "permittedRoles": ["ROLE_CALCULATIONS_TYPES.VIEW"]
    	},
    	"listCalculationTypes": {
    	  "permittedRoles": ["ROLE_CALCULATIONS_TYPES.LIST"]
    	}
    },
    "destinations-types": {
      "addDestinationsTypes": {
    	   "permittedRoles": ["ROLE_DESTINATIONS_TYPES.ADD"]
    	 },
    	"editDestinationsTypes": {
    	  "permittedRoles": ["ROLE_DESTINATIONS_TYPES.EDIT"]
    	},
    	"viewDestinationsTypes": {
    	  "permittedRoles": ["ROLE_DESTINATIONS_TYPES.VIEW"]
    	},
    	"listDestinationsTypes": {
    	  "permittedRoles": ["ROLE_DESTINATIONS_TYPES.LIST"]
    	}
    },
    "outlays-types": {
      "addOutlaysTypes": {
    	   "permittedRoles": ["ROLE_OUTLAYS_TYPES.ADD"]
    	 },
    	"editOutlaysTypes": {
    	  "permittedRoles": ["ROLE_OUTLAYS_TYPES.EDIT"]
    	},
    	"viewOutlaysTypes": {
    	  "permittedRoles": ["ROLE_OUTLAYS_TYPES.VIEW"]
    	},
    	"listOutlaysTypes": {
    	  "permittedRoles": ["ROLE_OUTLAYS_TYPES.LIST"]
    	}
    },
    "egress-types": {
      "addEgressTypes": {
    	   "permittedRoles": ["ROLE_EGRESS_TYPES.ADD"]
    	 },
    	"editEgressTypes": {
    	  "permittedRoles": ["ROLE_EGRESS_TYPES.EDIT"]
    	},
    	"viewEgressTypes": {
    	  "permittedRoles": ["ROLE_EGRESS_TYPES.VIEW"]
    	},
    	"listEgressTypes": {
    	  "permittedRoles": ["ROLE_EGRESS_TYPES.LIST"]
    	}
    },
    "ingress-types": {
      "addIngressTypes": {
    	   "permittedRoles": ["ROLE_INGRESS_TYPES.ADD"]
    	 },
    	"editIngressTypes": {
    	  "permittedRoles": ["ROLE_INGRESS_TYPES.EDIT"]
    	},
    	"viewIngressTypes": {
    	  "permittedRoles": ["ROLE_INGRESS_TYPES.VIEW"]
    	},
    	"listIngressTypes": {
    	  "permittedRoles": ["ROLE_INGRESS_TYPES.LIST"]
    	}
    },
    "relations-types": {
      "addRelationsTypes": {
    	   "permittedRoles": ["ROLE_RELATIONS_TYPES.ADD"]
    	 },
    	"editRelationsTypes": {
    	  "permittedRoles": ["ROLE_RELATIONS_TYPES.EDIT"]
    	},
    	"viewRelationsTypes": {
    	  "permittedRoles": ["ROLE_RELATIONS_TYPES.VIEW"]
    	},
    	"listRelationsTypes": {
    	  "permittedRoles": ["ROLE_RELATIONS_TYPES.LIST"]
    	}
    },
    "payments-types": {
      "addPaymentsTypes": {
    	   "permittedRoles": ["ROLE_PAYMENTS_TYPES.ADD"]
    	 },
    	"editPaymentsTypes": {
    	  "permittedRoles": ["ROLE_PAYMENTS_TYPES.EDIT"]
    	},
    	"viewPaymentsTypes": {
    	  "permittedRoles": ["ROLE_PAYMENTS_TYPES.VIEW"]
    	},
    	"listPaymentsTypes": {
    	  "permittedRoles": ["ROLE_PAYMENTS_TYPES.LIST"]
    	}
    },
    "message": {
      "sendMessage": {
    	   "permittedRoles": ["ROLE_MESSAGE.SEND"]
    	 }
    }
  }
};
