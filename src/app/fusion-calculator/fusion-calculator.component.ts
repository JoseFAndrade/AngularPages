import {Component} from '@angular/core';

@Component({
  selector: 'app-fusion-calculator',
  standalone: true,
  imports: [],
  templateUrl: './fusion-calculator.component.html',
  styleUrl: './fusion-calculator.component.css'
})


export class FusionCalculatorComponent {

  arcanaCombos = arcana2CombosRoyal;
  totalCombinations: any = {};

  personaByArcana: {[key: string]: [] } = {};


  constructor() {
    console.log(this.arcanaCombos)
  }

  fusionLevel(p1Level: number, p2Level: number  ){

    return Math.floor((p1Level + p2Level) / 2) + 1;
  }

  fusionArcana(p1Arcana: String, p2Arcana: String){

    for(let i = 0; i < this.arcanaCombos.length; i++) {

      if (this.arcanaCombos[i].source[0] === p1Arcana) {
        if (this.arcanaCombos[i].source[1] === p2Arcana)
          return this.arcanaCombos[i].result;
      }
    }
    return "";
  }
}
