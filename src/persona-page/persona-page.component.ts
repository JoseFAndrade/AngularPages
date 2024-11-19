import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SharedPersonaDataService} from '../shared-persona-data.service';
import {Subject, takeUntil} from 'rxjs';

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
  persona: any;

  ngOnInit(): void{
    /*
    this.sharedPersonaService.getData$().pipe(takeUntil(this.unsubscribe)).subscribe(persona => {
      this.persona = persona;
    })*/

    //this.sharedPersonaService.getData$().subscribe(persona => this.persona = persona);
  }


  constructor(private sharedPersonaService: SharedPersonaDataService) {

    this.personaName = String(this.route.snapshot.params['name']);
    //console.log(this.personaDict);
    this.persona = checkPersona(this.personaName, this.personaDict);

    console.log(this.persona);

    function checkPersona(key: any, dict: any){
      const lowerKey = key.toLowerCase();

      for (const dictKey in dict) {
        if (dictKey.toLowerCase() === lowerKey) {

          return dict[key];
        }
      }

      return null;
    }
  }

  protected readonly elements = elements;
  protected readonly Object = Object;
  protected readonly stats = stats;
}
