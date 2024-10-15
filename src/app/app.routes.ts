import { Routes } from '@angular/router';
import {PersonaListComponent} from '../personaList/personaList.component';
import {SecondComponent} from '../second/second.component';
import {HomeComponent} from '../home/home.component';

export const routes: Routes = [
  { path: 'personaList', component: PersonaListComponent},
  { path: 'second-component', component: SecondComponent},
  { path: '', component: HomeComponent}
];
