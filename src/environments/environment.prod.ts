export const environment = {
  production: true,
  // api_image_url: 'https://app1.creditoguarani.com.py/beta1/image/',
  // api_url: 'https://app1.creditoguarani.com.py/beta1',
  // whitelist: ['172.16.1.51', 'https://app1.creditoguarani.com.py', 'app1.creditoguarani.com.py']
  
  /*
  api_image_url: 'https://app2.financorp.com.py/beta1/image/',
  api_url: 'https://app2.financorp.com.py/beta1',
  whitelist: ['172.16.1.51', 'https://app2.financorp.com.py', 'app2.financorp.com.py']*/
  
  

  api_image_url: 'https://appdesa1.financorp.com.py/beta1/image/',
  api_url: 'https://appdesa1.financorp.com.py/beta1',
  whitelist: ['172.16.1.51', 'http://172.16.1.51', '172.16.1.51:9191']
	

};

export const authorities = {
  "role": {
    "enterprise": {
      'addEnterprise': {
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
    	  "permittedRoles": ["ROLE_DELETE.DELETE"]
    	}
    },
    "functionary": {
      "addFunctionary": {
    	   "permittedRoles": ["ROLE_FUNCTIONARY.ADD"]
    	 },
    	"editFunctionary": {
    	  "permittedRoles": ["ROLE_FUNCTIONARY.EDIT"]
    	},
    	"viewFunctionary": {
    	  "permittedRoles": ["ROLE_FUNCTIONARY.VIEW"]
    	},
    	"listFunctionary": {
    	  "permittedRoles": ["ROLE_FUNCTIONARY.LIST"]
    	},
    	"deleteFunctionary": {
    	  "permittedRoles": ["ROLE_FUNCTIONARY.DELETE"]
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
      "informconfClient": {
    	  "permittedRoles": ["ROLE_CLIENT.INFORMCONF"]
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
    "credits-solicitude": {
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
      "abandonCredits": {
    	  "permittedRoles": ["ROLE_SOLICITUDE.ABANDON"]
    	},
    	"deleteCredits": {
    	  "permittedRoles": ["ROLE_SOLICITUDE.DELETE"]
    	}
	},
	"propuesta": {
		"listPropuesta": {
		  "permittedRoles": ["ROLE_PROPUESTA.LIST"]
		}
  	},
    "credits": {
      "addCredits": {
    	   "permittedRoles": ["ROLE_CREDITS.ADD"]
    	 },
    	"editCredits": {
    	  "permittedRoles": ["ROLE_CREDITS.EDIT"]
    	},
    	"viewCredits": {
    	  "permittedRoles": ["ROLE_CREDITS.VIEW"]
    	},
    	"listCredits": {
    	  "permittedRoles": ["ROLE_CREDITS.LIST"]
    	},
    	"deleteCredits": {
    	  "permittedRoles": ["ROLE_CREDITS.DELETE"]
    	}
    },
    "review": {
    	"editReview": {
    	  "permittedRoles": ["ROLE_REVIEW.EDIT"]
    	},
    	"viewReview": {
    	  "permittedRoles": ["ROLE_REVIEW.VIEW"]
    	},
    	"listReview": {
    	  "permittedRoles": ["ROLE_REVIEW.LIST"]
    	}
    },
    "my-review": {
    	"editMyReview": {
    	  "permittedRoles": ["ROLE_MY_REVIEW.EDIT"]
    	},
    	"viewMyReview": {
    	  "permittedRoles": ["ROLE_MY_REVIEW.VIEW"]
    	},
    	"listMyReview": {
    	  "permittedRoles": ["ROLE_MY_REVIEW.LIST"]
    	}
    },
    "check-review": {
    	"editCheckReview": {
    	  "permittedRoles": ["ROLE_CHECK_REVIEW.EDIT"]
    	},
    	"viewCheckReview": {
    	  "permittedRoles": ["ROLE_CHECK_REVIEW.VIEW"]
    	},
    	"listCheckReview": {
    	  "permittedRoles": ["ROLE_CHECK_REVIEW.LIST"]
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
    	  "permittedRoles": ["ROLE_REFERENCE_TYPES.LIST","ROLE_CALCULATIONS_TYPES.LIST","ROLE_RELATIONS_TYPES.LIST","ROLE_FUNCTIONARY_TYPES.LIST",
        "ROLE_OUTLAYS_TYPES.LIST","ROLE_SERVICE_TYPES.LIST","ROLE_MODALITY.LIST","ROLE_PAYMENTS_TYPES.LIST","ROLE_STUDY_TYPES.LIST","ROLE_DOCUMENT_TYPES.LIST"]
    	}
    },
    "review-group": {
    	"viewGroup": {
    	  "permittedRoles": ["ROLE_REVIEW.LIST","ROLE_MY_REVIEW.LIST"]
    	}
    },
    "rrhh": {
    	"viewRRHH": {
    	  "permittedRoles": ["ROLE_FUNCTIONARY.LIST","ROLE_FUNCTIONARY_TYPES.LIST","ROLE_HORARY_TYPES.LIST"]
    	}
    },
    "functionary-types": {
      "addFunctionaryTypes": {
    	   "permittedRoles": ["ROLE_FUNCTIONARY_TYPES.ADD"]
    	 },
    	"editFunctionaryTypes": {
    	  "permittedRoles": ["ROLE_FUNCTIONARY_TYPES.EDIT"]
    	},
    	"viewFunctionaryTypes": {
    	  "permittedRoles": ["ROLE_FUNCTIONARY_TYPES.VIEW"]
    	},
    	"listFunctionaryTypes": {
    	  "permittedRoles": ["ROLE_FUNCTIONARY_TYPES.LIST"]
    	},
      "deleteFunctionaryTypes": {
    	  "permittedRoles": ["ROLE_FUNCTIONARY_TYPES.DELETE"]
    	}
    },
    "horary-types": {
      "addHoraryTypes": {
    	   "permittedRoles": ["ROLE_HORARY_TYPES.ADD"]
    	 },
    	"editHoraryTypes": {
    	  "permittedRoles": ["ROLE_HORARY_TYPES.EDIT"]
    	},
    	"viewHoraryTypes": {
    	  "permittedRoles": ["ROLE_HORARY_TYPES.VIEW"]
    	},
    	"listHoraryTypes": {
    	  "permittedRoles": ["ROLE_HORARY_TYPES.LIST"]
    	},
      "deleteHoraryTypes": {
    	  "permittedRoles": ["ROLE_HORARY_TYPES.DELETE"]
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
    	},
      "deleteReferenceTypes": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.DELETE"]
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
    	},
      "deleteGuaranteeTypes": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.DELETE"]
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
    	},
      "deleteCapitalPeriod": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.DELETE"]
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
    	},
      "deleteCalculationTypes": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.DELETE"]
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
    	},
      "deleteDestinationsTypes": {
    	  "permittedRoles": ["ROLE_DESTINATIONS_TYPES.DELETE"]
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
    	},
      "deleteOutlaysTypes": {
    	  "permittedRoles": ["ROLE_OUTLAYS_TYPES.DELETE"]
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
    	},
      "deleteEgressTypes": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.DELETE"]
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
    	},
      "deleteIngressTypes": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.DELETE"]
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
    	},
      "deleteRelationsTypes": {
    	  "permittedRoles": ["ROLE_RELATIONS_TYPES.DELETE"]
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
    	},
      "deletePaymentsTypes": {
    	  "permittedRoles": ["ROLE_PAYMENTS_TYPES.DELETE"]
    	}
    },
    "exit-types": {
      "addExitTypes": {
    	   "permittedRoles": ["ROLE_EXIT_TYPES.ADD"]
    	 },
    	"editExitTypes": {
    	  "permittedRoles": ["ROLE_EXIT_TYPES.EDIT"]
    	},
    	"viewExitTypes": {
    	  "permittedRoles": ["ROLE_EXIT_TYPES.VIEW"]
    	},
    	"listExitTypes": {
    	  "permittedRoles": ["ROLE_EXIT_TYPES.LIST"]
    	},
      "deleteExitTypes": {
    	  "permittedRoles": ["ROLE_EXIT_TYPES.DELETE"]
    	}
    },
    "position-types": {
      "addPositionTypes": {
    	   "permittedRoles": ["ROLE_POSITION_TYPES.ADD"]
    	 },
    	"editPositionTypes": {
    	  "permittedRoles": ["ROLE_POSITION_TYPES.EDIT"]
    	},
    	"viewPositionTypes": {
    	  "permittedRoles": ["ROLE_POSITION_TYPES.VIEW"]
    	},
    	"listPositionTypes": {
    	  "permittedRoles": ["ROLE_POSITION_TYPES.LIST"]
    	},
      "deletePositionTypes": {
    	  "permittedRoles": ["ROLE_POSITION_TYPES.DELETE"]
    	}
    },
    "study-types": {
      "addStudyTypes": {
    	   "permittedRoles": ["ROLE_SERVICE_TYPES.ADD"]
    	 },
    	"editStudyTypes": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.EDIT"]
    	},
    	"viewStudyTypes": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.VIEW"]
    	},
    	"listStudyTypes": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.LIST"]
    	},
      "deleteStudyTypes": {
    	  "permittedRoles": ["ROLE_SERVICE_TYPES.DELETE"]
    	}
    },
    "document-types": {
      "addDocumentTypes": {
    	   "permittedRoles": ["ROLE_DOCUMENT_TYPES.ADD"]
    	 },
    	"editDocumentTypes": {
    	  "permittedRoles": ["ROLE_DOCUMENT_TYPES.EDIT"]
    	},
    	"viewDocumentTypes": {
    	  "permittedRoles": ["ROLE_DOCUMENT_TYPES.VIEW"]
    	},
    	"listDocumentTypes": {
    	  "permittedRoles": ["ROLE_DOCUMENT_TYPES.LIST"]
    	},
      "deleteDocumentTypes": {
    	  "permittedRoles": ["ROLE_DOCUMENT_TYPES.DELETE"]
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
    	},
      "deleteModality": {
    	  "permittedRoles": ["ROLE_MODALITY.DELETE"]
    	}
    },
    "message": {
      "sendMessage": {
    	   "permittedRoles": ["ROLE_MESSAGE.SEND"]
    	 }
    },
    "informconf": {
      "informconfReport": {
    	   "permittedRoles": ["ROLE_INFORMCONF.REPORT"]
    	 }
    }
  }
};
