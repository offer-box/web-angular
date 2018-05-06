import { Routes } from '@angular/router';


import { NgbdAccordionBasic } from './accordion/accordion.component';
import { NgbdAlertBasic } from './alert/alert.component';


export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'accordion',
        component: NgbdAccordionBasic,
        data: {
          title: 'Perfil',
          urls: [{ title: 'Home', url: '/dashboard' }, { title: 'Configurações' }, { title: 'Perfil' }]
        }
      },
      {
        path: 'alert',
        component: NgbdAlertBasic,
        data: {
          title: 'Licitações',
          urls: [{ title: 'Home', url: '/dashboard' }, { title: 'Configurações' }, { title: 'Licitações' }]
        }
      },]
  }
];
