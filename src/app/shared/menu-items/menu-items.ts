import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'business', name: 'Empresas', type: 'link', icon: 'av_timer' },
  { state: 'subsidiary', type: 'link', name: 'Sucursales', icon: 'crop_7_5' },
  {
    state: 'users',
    type: 'link',
    name: 'Usuarios',
    icon: 'vertical_align_center'
  },
  { state: 'chips', type: 'link', name: 'Clientes', icon: 'vignette' },
  { state: 'toolbar', type: 'link', name: 'Solicitudes', icon: 'voicemail' },
  {
    state: 'progress-snipper',
    type: 'link',
    name: 'Servicios',
    icon: 'border_horizontal'
  }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
