import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'business', name: 'Empresas', type: 'link', icon: 'av_timer' , entity:'enterprise', role:'listEnterprise'},
  { state: 'subsidiary', type: 'link', name: 'Sucursales', icon: 'crop_7_5', entity:'subsidiary', role:'listSubsidiary' },
  {
    state: 'users',
    type: 'link',
    name: 'Usuarios',
    icon: 'vertical_align_center', entity:'', role:''
  },
  { state: 'chips', type: 'link', name: 'Clientes', icon: 'vignette' , entity:'', role:''},
  { state: 'toolbar', type: 'link', name: 'Solicitudes', icon: 'voicemail' , entity:'', role:''},
  {
    state: 'progress-snipper',
    type: 'link',
    name: 'Servicios',
    icon: 'border_horizontal',
    entity:'', role:''
  }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
