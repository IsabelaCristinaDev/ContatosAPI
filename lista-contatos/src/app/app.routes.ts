import { Routes } from '@angular/router';

import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';

export const routes: Routes = [
  { path: 'formulario', component: ContactFormComponent },
  { path: 'detalhe/:id', component: ContactDetailComponent },
  { path: 'lista', component: ContactListComponent },
  { path: '', redirectTo: 'formulario', pathMatch: 'full' },
];
