// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //api_url: 'http://localhost:8989/beta1',
  api_image_url: 'https://app1.creditoguarani.com.py/beta1/image/',
  api_url: 'https://app1.creditoguarani.com.py/beta1',
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
    "credits": {
      "addCredits": {
    	   "permittedRoles": ["ROLE_SOLICITUDE.ADD"]
    	 },
    	"editCredits": {
    	  "permittedRoles": ["ROLE_SOLICITUDE.EDIT"]
    	},
    	"viewCredits": {
    	  "permittedRoles": ["ROLE_SOLICITUDE.VIEW"]
    	},
    	"listCredits": {
    	  "permittedRoles": ["ROLE_SOLICITUDE.LIST","ROLE_SOLICITUDE.LISTALL"]
    	},
    	"deleteCredits": {
    	  "permittedRoles": ["ROLE_SOLICITUDE.DELETE"]
    	}
    },
    "card": {
      "addCard": {
    	   "permittedRoles": ["ROLE_SOLICITUDE.ADD"]
    	 },
    	"editCard": {
    	  "permittedRoles": ["ROLE_SOLICITUDE.EDIT"]
    	},
    	"viewCard": {
    	  "permittedRoles": ["ROLE_SOLICITUDE.VIEW"]
    	},
    	"listCard": {
    	  "permittedRoles": ["ROLE_SOLICITUDE.LIST","ROLE_SOLICITUDE.LISTALL"]
    	},
    	"deleteCard": {
    	  "permittedRoles": ["ROLE_SOLICITUDE.DELETE"]
    	}
    },
    "service-types": {
    	"viewTypes": {
    	  "permittedRoles": ["ROLE_REFERENCE_TYPES.LIST","ROLE_CALCULATIONS_TYPES.LIST","ROLE_RELATIONS_TYPES.LIST",
        "ROLE_OUTLAYS_TYPES.LIST","ROLE_SERVICE_TYPES.LIST","ROLE_MODALITY.LIST","ROLE_PAYMENTS_TYPES.LIST"]
    	}
    },
    "reference-types": {
      "addReferenceTypes": {
    	   "permittedRoles": ["ROLE_SERVICE_TYPES.ADD"]
    	 },
    	"editReferenceTypes": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.EDIT"]
    	},
    	"viewReferenceTypes": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.VIEW"]
    	},
    	"listReferenceTypes": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.LIST"]
    	}
    },
    "guarantee-types": {
      "addGuaranteeTypes": {
    	   "permittedRoles": ["ROLE_SERVICE_TYPES.ADD"]
    	 },
    	"editGuaranteeTypes": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.EDIT"]
    	},
    	"viewGuaranteeTypes": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.VIEW"]
    	},
    	"listGuaranteeTypes": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.LIST"]
    	}
    },
    "capital-period": {
      "addCapitalPeriod": {
    	   "permittedRoles": ["ROLE_SERVICE_TYPES.ADD"]
    	 },
    	"editCapitalPeriod": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.EDIT"]
    	},
    	"viewCapitalPeriod": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.VIEW"]
    	},
    	"listCapitalPeriod": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.LIST"]
    	}
    },
    "calculation-types": {
      "addCalculationTypes": {
    	   "permittedRoles": ["ROLE_SERVICE_TYPES.ADD"]
    	 },
    	"editCalculationTypes": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.EDIT"]
    	},
    	"viewCalculationTypes": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.VIEW"]
    	},
    	"listCalculationTypes": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.LIST"]
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
    	   "permittedRoles": ["ROLE_SERVICE_TYPES.ADD"]
    	 },
    	"editEgressTypes": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.EDIT"]
    	},
    	"viewEgressTypes": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.VIEW"]
    	},
    	"listEgressTypes": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.LIST"]
    	}
    },
    "ingress-types": {
      "addIngressTypes": {
    	   "permittedRoles": ["ROLE_SERVICE_TYPES.ADD"]
    	 },
    	"editIngressTypes": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.EDIT"]
    	},
    	"viewIngressTypes": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.VIEW"]
    	},
    	"listIngressTypes": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.LIST"]
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
    "modality": {
      "addModality": {
    	   "permittedRoles": ["ROLE_MODALITY.ADD"]
    	 },
    	"editModality": {
    	  "permittedRoles": ["ROLE_MODALITY.EDIT"]
    	},
    	"viewModality": {
    	  "permittedRoles": ["ROLE_MODALITY.VIEW"]
    	},
    	"listModality": {
    	  "permittedRoles": ["ROLE_MODALITY.LIST"]
    	}
    },
    "message": {
      "sendMessage": {
    	   "permittedRoles": ["ROLE_MESSAGE.SEND"]
    	 }
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
