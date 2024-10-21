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
  personaDict: any = personas;
  condition: boolean = false;

  constructor() {
    this.personaName = String(this.route.snapshot.params['name']);
    console.log(this.personaDict);
    this.condition = checkPersona(this.personaName, this.personaDict);

    console.log(this.condition);
    if("abaddon" in this.personaDict)
      console.log("yes");

    function checkPersona(key: any, dict: any){
      const lowerKey = key.toLowerCase();

      for(const dictKey in dict){
        if(dictKey.toLowerCase() === lowerKey){
          return true;
        }
      }

      return false;
    }
  }
}
