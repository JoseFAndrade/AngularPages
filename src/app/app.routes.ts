import { Routes } from '@angular/router';
import {PersonaListComponent} from './personaList/personaList.component';
import {SecondComponent} from './second/second.component';
import {HomeComponent} from './home/home.component';
import {PersonaPageComponent} from './persona-page/persona-page.component';
import {ItemListComponent} from './item-list/item-list.component';
import {SkillListComponent} from './skill-list/skill-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'personaList', component: PersonaListComponent},
  { path: 'second-component', component: SecondComponent},
  { path: 'persona/:name', component: PersonaPageComponent},
  { path: 'items', component: ItemListComponent},
  { path: 'skills', component: SkillListComponent}
];
