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
  { state: 'client', type: 'link', name: 'Clientes', icon: 'assignment_ind', entity:'client', role:'listClient' },
  { state: 'informconf', type: 'link', name: 'Informconf', icon: 'assignment_ind', entity:'informconf', role:'informconfReport' },
  //{ state: 'cuotasWs', type: 'link', name: 'Archivo Cuotas', icon: 'assignment_ind', entity:'cuotasWs', role:'cuotasWsUploadFile' },
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
  {
    state: 'progress-snipper',
    type: 'box',
    name: 'Solicitudes',
    icon: 'assignment',
    entity:'credits-solicitude',
    role:'listCredits',
    subMenu:[
      {state: 'credits-solicitude', name: 'Solicitudes Creditos', icon: 'monetization_on', entity:'credits-solicitude', role:'listCredits'},
      {state: 'card', name: 'Solicitudes Tarjetas', icon: 'credit_card', entity:'card',  role:'listCard'},
      {state: 'propuesta', type: 'link', name: 'Propuesta Credito', icon: 'monetization_on', entity:'propuesta', role:'listPropuesta'},
      {state: 'descuentoCH', name: 'Descuento cheque', icon: 'chrome_reader_mode', entity:'propuesta', role:'solDescuento'}
    ]
  },
  {
    state: 'progress-snipper',
    type: 'box',
    name: 'Creditos',
    icon: 'attach_money',
    entity:'credits',
    role:'listCredits',
    subMenu:[
      {state: 'credits', name: 'Creditos', icon: 'monetization_on', entity:'credits', role:'listCredits'}
    ]
  },
  {
    state: 'progress-snipper',
    type: 'box',
    name: 'Analisis',
    icon: 'filter',
    entity:'review-group',
    role:'viewGroup',
    subMenu:[
      {state: 'review', name: 'Analisis Solicitudes', icon: 'assignment_turned_in', entity:'review',  role:'listReview'},
      {state: 'my-review', name: 'Mis Analisis', icon: 'assignment_turned_in', entity:'my-review',  role:'listMyReview'},
      {state: 'check-review', name: 'Verificar Analisis', icon: 'assignment_turned_in', entity:'check-review',  role:'listCheckReview'}
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
      {state: 'modality', name: 'Modalidades', icon: '', entity:'modality', role:'listModality'},
      {state: 'guarantee-types', name: 'Tipos Garantias', icon: '', entity:'guarantee-types', role:'listGuaranteeTypes'},
      {state: 'capital-period', name: 'Periodos Capitales', icon: '', entity:'capital-period', role:'listCapitalPeriod'},
      {state: 'payments-types', name: 'Tipos Pagos', icon: '', entity:'payments-types', role:'listPaymentsTypes'},
      {state: 'reference-types', name: 'Tipos Referencias', icon: '', entity:'reference-types',  role:'listReferenceTypes'},
      {state: 'calculation-types', name: 'Tipos Calculos', icon: '', entity:'calculation-types', role:'listCalculationTypes'},
      {state: 'destinations-types', name: 'Tipos Destinos', icon: '', entity:'destinations-types',role:'listDestinationsTypes'},
      {state: 'outlays-types', name: 'Tipos Desembolsos', icon: '', entity:'outlays-types', role:'listOutlaysTypes'},
      {state: 'ingress-types', name: 'Tipos Ingresos', icon: '', entity:'ingress-types', role:'listIngressTypes'},
      {state: 'egress-types', name: 'Tipos Egresos', icon: '', entity:'egress-types', role:'listEgressTypes'},
      {state: 'relations-types', name: 'Tipos Vinculos', icon: '', entity:'relations-types', role:'listRelationsTypes'},
      {state: 'position-types', name: 'Tipos Cargos', icon: '', entity:'position-types', role:'listPositionTypes'},
      {state: 'functionary-types', name: 'Tipos Funcionarios', icon: '', entity:'functionary-types', role:'listFunctionaryTypes'},
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
