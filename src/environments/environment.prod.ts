export const environment = {
  production: true,
  api_url: 'https://conduit.productionready.io/api'
};

export const workflow = {
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
  }
};
