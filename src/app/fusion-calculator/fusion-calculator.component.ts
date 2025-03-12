import {Component} from '@angular/core';
import {Persona} from '../../Persona';

@Component({
  selector: 'app-fusion-calculator',
  standalone: true,
  imports: [],
  templateUrl: './fusion-calculator.component.html',
  styleUrl: './fusion-calculator.component.css'
})


export class FusionCalculatorComponent {

  //from data import of js
  personasDict = personas;

  totalPersonaList: Persona[];
  //list divided up by arcana -> will help when fusing
  personaByArcana: {[arcana: string]: Persona[]} = {};
  arcanaCombos = arcana2CombosRoyal;
  totalCombinations: any = {};



  constructor() {
    console.log(this.arcanaCombos);
    this.totalPersonaList = this.populateBothPersonaList();
  }

  populateBothPersonaList(){
    let list: Persona[] = [];
    for(let key in this.personasDict){
      let shortcut = this.personasDict[key];
      let temp: Persona = new Persona(key, shortcut.level, shortcut.arcana, shortcut.elems,shortcut.area,shortcut.floor,
        shortcut.inherits,shortcut.item, shortcut.itemr, shortcut.skills, shortcut.stats);

      //dictionary
      if(!this.personaByArcana[temp.arcana])
        this.personaByArcana[temp.arcana] = [temp];
      else
        this.personaByArcana[temp.arcana].push(temp);

      list.push(temp);
    }
    console.log("after");
    console.log(this.getAllPersonaWithinArcana("Judgement"));

    return list;
  }

  fuse(p1: Persona, p2: Persona){
    let level = this.fusionLevel(p1.level,p2.level);
    let arcana = this.determineArcana(p1.arcana,p2.arcana);

    

  }

  fusionLevel(p1Level: number, p2Level: number  ){

    return Math.floor((p1Level + p2Level) / 2) + 1;
  }

  determineArcana(p1Arcana: string, p2Arcana: string){
    for(let i = 0; i < this.arcanaCombos.length; i++) {

      if (this.arcanaCombos[i].source[0] === p1Arcana) {
        if (this.arcanaCombos[i].source[1] === p2Arcana)
          return this.arcanaCombos[i].result;
      }
    }
    return "";
  }

  getAllPersonaWithinArcana(Arcana: string){
    let personaList: typeof Persona[] = [];
    let arcanaCombinations = this.arcanaCombos.filter((x: { result: string; }) => {
      return x.result === Arcana;
    });

    console.log(arcanaCombinations);

    for(let index in arcanaCombinations){
      let combination = arcanaCombinations[index];
      let arcanaOne = combination.source[0];
      let arcanaTwo = combination.source[1];

      for(let i = 0, p1 = arcanaOne[i]; p1 != null; i++){
        for(let j = 0, p2 = arcanaTwo[j]; p2 != null; j++){
          //fuse these personas and check if the result is the persona's current page we are in


        }
      }

    }


    return personaList;

  }
}
