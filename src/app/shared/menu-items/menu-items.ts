import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: '', name: 'Personal', type: 'title-', icon: 'crop_7_5' , entity:'enterprise', role:'listEnterpriseP'},
  { state: 'business', name: 'Empresas', type: 'link', icon: 'business' , entity:'enterprise', role:'listEnterprise'},
  { state: 'subsidiary', type: 'link', name: 'Sucursales', icon: 'account_balance', entity:'subsidiary', role:'listSubsidiary' },
  { state: 'users', type: 'link', name: 'Usuarios', icon: 'group', entity:'subsidiary', role:'listSubsidiary' },
  { state: 'customers', type: 'link', name: 'Clientes', icon: 'account_box', entity:'subsidiary', role:'listSubsidiary' },
  { state: 'chips', type: 'link', name: 'Clientes', icon: 'vignette' , entity:'', role:''},
  { state: 'toolbar', type: 'link', name: 'Solicitudes', icon: 'voicemail' , entity:'', role:''},
  {
    state: 'progress-snipper',
    type: 'box',
    name: 'Solicitudes',
    icon: 'border_horizontal',
    entity:'',
    role:'',
    subMenu:[
      {state: 'creditos', name: 'Solicitudes Creditos', icon: 'border_horizontal', entity:'creditos', role:'listPaymentsTypes'},
      {state: 'tarjetas', name: 'Solicitudes Tarjetas', icon: 'border_horizontal', entity:'tarjetas',  role:'listReferenceTypes'},
      {state: 'analisis', name: 'Analisis Solicitudes', icon: 'border_horizontal', entity:'reference-types',  role:'listReferenceTypes'},
      { state: 'people', type: 'link', name: 'Personas', icon: 'group', entity:'people', role:'listPeople' }
    ]
  },
  {
    state: 'progress-snipper',
    type: 'box',
    name: 'Servicios',
    icon: 'border_horizontal',
    entity:'',
    role:'',
    subMenu:[
      {state: 'payments-types', name: 'Tipos Pagos', icon: 'border_horizontal', entity:'payments-types', role:'listPaymentsTypes'},
      {state: 'reference-types', name: 'Tipos Referencias', icon: 'border_horizontal', entity:'reference-types',  role:'listReferenceTypes'},
      {state: 'calculation-types', name: 'Tipos Calculos', icon: 'border_horizontal', entity:'calculation-types', role:'listCalculationTypes'},
      {state: 'destinations-types', name: 'Tipos Destinos', icon: 'border_horizontal', entity:'destinations-types',role:'listDestinationsTypes'},
      {state: 'outlays-types', name: 'Tipos Desembolsos', icon: 'border_horizontal', entity:'outlays-types', role:'listOutlaysTypes'},
      {state: 'ingress-types', name: 'Tipos Ingresos', icon: 'border_horizontal', entity:'ingress-types', role:'listIngressTypes'},
      {state: 'egress-types', name: 'Tipos Egresos', icon: 'border_horizontal', entity:'egress-types', role:'listEgressTypes'},
      {state: 'relations-types', name: 'Tipos Vinculos', icon: 'border_horizontal', entity:'relations-types', role:'listRelationsTypes'}
    ]
  },
  {
    state: 'progress-snipper',
    type: 'box',
    name: 'Configuraciones',
    icon: 'border_horizontal',
    entity:'',
    role:'',
    subMenu:[
      {state: 'role', name: 'Roles', icon: 'border_horizontal', entity:'role', role:'listRole'}
    ]
  }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
