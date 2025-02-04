/*
 * Created by josea on 10/14/2024
*/

import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'p-list',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './personaList.component.html',
  styleUrl: './personaList.component.css'
})

export class PersonaListComponent{

}
