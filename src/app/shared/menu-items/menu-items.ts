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
  // { state: 'users', type: 'link', name: 'Usuarios', icon: 'group', entity:'subsidiary', role:'listSubsidiary' },
  { state: 'client', type: 'link', name: 'Pacientes', icon: 'assignment_ind', entity:'client', role:'listClient' },
  { state: 'schedule', name: 'Agendas', type: 'link', icon: 'business' , entity:'subsidiary', role:'listSubsidiary'},
  { state: 'toolbar', type: 'link', name: 'Solicitudes', icon: 'voicemail' , entity:'', role:''},
  {
    state: 'progress-snipper',
    type: 'box',
    name: 'Recursos Humanos',
    icon: 'group',
    entity:'rrhh',
    role:'viewRRHH',
    subMenu:[
      {state: 'functionary', name: 'Funcionarios', icon: '', entity:'functionary', role:'listFunctionary'},
      {state: 'horary-types', name: 'Tipos Horarios', icon: '', entity:'horary-types', role:'listHoraryTypes'},
      {state: 'exit-types', name: 'Motivos de Retiros', icon: '', entity:'exit-types', role:'listExitTypes'},
    ]
  },
  // {
  //   state: 'progress-snipper',
  //   type: 'box',
  //   name: 'Solicitudes',
  //   icon: 'assignment',
  //   entity:'credits-solicitude',
  //   role:'listCredits',
  //   subMenu:[
  //     {state: 'credits-solicitude', name: 'Solicitudes Creditos', icon: 'monetization_on', entity:'credits-solicitude', role:'listCredits'},
  //     {state: 'card', name: 'Solicitudes Tarjetas', icon: 'credit_card', entity:'card',  role:'listCard'}
  //   ]
  // },
  // {
  //   state: 'progress-snipper',
  //   type: 'box',
  //   name: 'Creditos',
  //   icon: 'attach_money',
  //   entity:'credits',
  //   role:'listCredits',
  //   subMenu:[
  //     {state: 'credits', name: 'Creditos', icon: 'monetization_on', entity:'credits', role:'listCredits'}
  //   ]
  // },
  // {
  //   state: 'progress-snipper',
  //   type: 'box',
  //   name: 'Analisis',
  //   icon: 'filter',
  //   entity:'review-group',
  //   role:'viewGroup',
  //   subMenu:[
  //     {state: 'review', name: 'Analisis Solicitudes', icon: 'assignment_turned_in', entity:'review',  role:'listReview'},
  //     {state: 'my-review', name: 'Mis Analisis', icon: 'assignment_turned_in', entity:'my-review',  role:'listMyReview'},
  //     {state: 'check-review', name: 'Verificar Analisis', icon: 'assignment_turned_in', entity:'check-review',  role:'listCheckReview'}
  //   ]
  // },
  {
    state: 'progress-snipper',
    type: 'box',
    name: 'Servicios Tipos',
    icon: 'border_horizontal',
    entity:'service-types',
    role:'viewTypes',
    subMenu:[
      // {state: 'payments-types', name: 'Tipos Pagos', icon: '', entity:'payments-types', role:'listPaymentsTypes'},
      {state: 'functionary-types', name: 'Tipos Funcionarios', icon: '', entity:'functionary-types', role:'listFunctionaryTypes'},
      // {state: 'reference-types', name: 'Tipos Referencias', icon: '', entity:'reference-types',  role:'listReferenceTypes'},
      // {state: 'outlays-types', name: 'Tipos Desembolsos', icon: '', entity:'outlays-types', role:'listOutlaysTypes'},
      // {state: 'ingress-types', name: 'Tipos Ingresos', icon: '', entity:'ingress-types', role:'listIngressTypes'},
      // {state: 'egress-types', name: 'Tipos Egresos', icon: '', entity:'egress-types', role:'listEgressTypes'},
      {state: 'position-types', name: 'Tipos Cargos', icon: '', entity:'position-types', role:'listPositionTypes'},
      {state: 'tryst-types', name: 'Tipos Citas', icon: '', entity:'tryst-types', role:'listTrystTypes'},
      {state: 'tryst-status', name: 'Estado Citas', icon: '', entity:'tryst-status', role:'listTrystStatus'},
      {state: 'document-types', name: 'Tipos Documentos', icon: '', entity:'document-types', role:'listDocumentTypes'},
      {state: 'study-types', name: 'Tipos Estudios', icon: '', entity:'study-types', role:'listStudyTypes'}
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
