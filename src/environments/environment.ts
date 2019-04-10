// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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
    "user": {
      "addUser": {
    	   "permittedRoles": ["ROLE_USER.ADD"]
    	 },
    	"editUser": {
    	  "permittedRoles": ["ROLE_USER.EDIT"]
    	},
    	"viewUser": {
    	  "permittedRoles": ["ROLE_USER.VIEW"]
    	},
    	"listUser": {
    	  "permittedRoles": ["ROLE_USER.LIST"]
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
