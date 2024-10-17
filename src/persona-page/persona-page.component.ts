import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-persona-page',
  standalone: true,
  imports: [],
  templateUrl: './persona-page.component.html',
  styleUrl: './persona-page.component.css'
})
export class PersonaPageComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  personaName = "";
  constructor() {
    this.personaName = String(this.route.snapshot.params['name']);
  }
}
