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
  { state: 'client', type: 'link', name: 'Clientes', icon: 'assignment_ind', entity:'client', role:'listClient' },
  { state: 'toolbar', type: 'link', name: 'Solicitudes', icon: 'voicemail' , entity:'', role:''},
  {
    state: 'progress-snipper',
    type: 'box',
    name: 'Solicitudes',
    icon: 'assignment',
    entity:'credits',
    role:'listCredits',
    subMenu:[
      {state: 'credits', name: 'Solicitudes Creditos', icon: 'monetization_on', entity:'credits', role:'listCredits'},
      {state: 'card', name: 'Solicitudes Tarjetas', icon: 'credit_card', entity:'card',  role:'listCard'},
      {state: 'review', name: 'Analisis Solicitudes', icon: 'border_horizontal', entity:'review',  role:'listReferenceTypes'},
    ]
  },
  {
    state: 'progress-snipper',
    type: 'box',
    name: 'Servicios Tipos',
    icon: 'border_horizontal',
    entity:'service-types',
    role:'viewTypes',
    subMenu:[
      {state: 'modality', name: 'Modalidades', icon: 'chevron_right', entity:'modality', role:'listModality'},
      {state: 'guarantee-types', name: 'Tipos Garantias', icon: 'chevron_right', entity:'guarantee-types', role:'listGuaranteeTypes'},
      {state: 'capital-period', name: 'Periodos Capitales', icon: 'chevron_right', entity:'capital-period', role:'listCapitalPeriod'},
      {state: 'payments-types', name: 'Tipos Pagos', icon: 'chevron_right', entity:'payments-types', role:'listPaymentsTypes'},
      {state: 'reference-types', name: 'Tipos Referencias', icon: 'chevron_right', entity:'reference-types',  role:'listReferenceTypes'},
      {state: 'calculation-types', name: 'Tipos Calculos', icon: 'chevron_right', entity:'calculation-types', role:'listCalculationTypes'},
      {state: 'destinations-types', name: 'Tipos Destinos', icon: 'chevron_right', entity:'destinations-types',role:'listDestinationsTypes'},
      {state: 'outlays-types', name: 'Tipos Desembolsos', icon: 'chevron_right', entity:'outlays-types', role:'listOutlaysTypes'},
      {state: 'ingress-types', name: 'Tipos Ingresos', icon: 'chevron_right', entity:'ingress-types', role:'listIngressTypes'},
      {state: 'egress-types', name: 'Tipos Egresos', icon: 'chevron_right', entity:'egress-types', role:'listEgressTypes'},
      {state: 'relations-types', name: 'Tipos Vinculos', icon: 'chevron_right', entity:'relations-types', role:'listRelationsTypes'}
    ]
  },
  {
    state: 'progress-snipper',
    type: 'box',
    name: 'Configuraciones',
    icon: 'settings',
    entity:'role',
    role:['listRole'],
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
