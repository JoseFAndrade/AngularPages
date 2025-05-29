import {AfterViewInit, Component, inject, ViewChild, viewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FusionCalculatorComponent} from '../fusion-calculator/fusion-calculator.component';
import {AsyncPipe} from '@angular/common';
import {Persona} from '../../Persona';

@Component({
  selector: 'app-persona-page',
  standalone: true,
  imports: [
    FusionCalculatorComponent,
    AsyncPipe
  ],
  templateUrl: './persona-page.component.html',
  styleUrl: './persona-page.component.css'
})


export class PersonaPageComponent implements AfterViewInit {
  // @ts-ignore
  @ViewChild(FusionCalculatorComponent) fusionCalculator: FusionCalculatorComponent;

  //fusionCaculator: FusionCalculatorComponent;

  route: ActivatedRoute = inject(ActivatedRoute);
  personaName = "";
  personaDict: any = personas;
  persona: any;
  persona2: Persona;
  ngOnInit(): void{
    /*
    this.sharedPersonaService.getData$().pipe(takeUntil(this.unsubscribe)).subscribe(persona => {
      this.persona = persona;
    })*/

    //this.sharedPersonaService.getData$().subscribe(persona => this.persona = persona);
  }

  ngAfterViewInit(){
    console.log("After view");
    //console.log(this.fusionCalculator.getAllPersonaWithinArcana("Judgement"));
    //console.log(this.fusionCalculator.getMatchingFusions("Abaddon","Judgement"));
  }


  constructor() {

    this.personaName = String(this.route.snapshot.params['name']);
    this.persona = checkPersona(this.personaName, this.personaDict);
    let rare: boolean = this.persona.rare != undefined ? this.persona.rare : false;
    let special: boolean = this.persona.special != undefined ? this.persona.special : false;
    this.persona2 = new Persona(this.personaName,this.persona.level,this.persona.arcana,
      this.persona.elems,this.persona.area,this.persona.floor,this.persona.inherits,this.persona.item,this.persona.itemr,
      this.persona.skills,this.persona.stats,rare,special);

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
