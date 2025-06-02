import {Component, Input, OnInit} from '@angular/core';
import {Persona} from '../../Persona';
import {PersonaFusion} from '../../PersonaFusion';
import {PageTracker} from '../../PageTracker';

@Component({
  selector: 'app-fusion-calculator',
  standalone: true,
  imports: [],
  templateUrl: './fusion-calculator.component.html',
  styleUrl: './fusion-calculator.component.css'
})


export class FusionCalculatorComponent implements OnInit {

  //from data import of js
  personasDict = personas;

  totalPersonaList: Persona[];
  //list divided up by arcana -> will help when fusing
  personaByArcana: {[arcana: string]: Persona[]} = {};
  arcanaCombos = arcana2CombosRoyal;
  totalCombinations: any = {};

  //data needed for the html to function
  matchingFusions: PersonaFusion[] | undefined = undefined;
  fusionsFrom: PersonaFusion[] | undefined = undefined;
  p1: PageTracker;
  p2: PageTracker;


  @Input() currentPersona: Persona | undefined;

  ngOnInit(){
    console.log("test");
    console.log(this.currentPersona);
    if (this.currentPersona instanceof Persona) {
      let list : PersonaFusion[] = [];
      this.outsidefusions(this.currentPersona).forEach((function (value){
        if(!value.fusionOne.rare && !value.fusionTwo.rare ){
          list.push(value);
        }
      }));
      console.log("outgoing fusions")
      console.log(list);

      //going to try a different way of doing this


      let test: PersonaFusion[] = this.doAll(<Persona>this.getPersona("Arsène"));
      console.log("all outgoing fusions 2");
      console.log(test);
      console.log("ayyyyyyyyy");
      console.log(this.fuse(<Persona>this.getPersona("Arsène"), <Persona>this.getPersona("Abaddon"), this.determineArcana("Fool","Judgement")));
      console.log("Obariyon and izanagi fusion");
      console.log( this.fuse(<Persona>this.getPersona("Obariyon"), <Persona>this.getPersona("Izanagi"), "Fool"));
      //console.log(this.fuse(<Persona>this.getPersona("Yamata-no-Orochi"),<Persona>this.getPersona("Abaddon"),"Judgement"));
    }
  }

  doAll(persona: Persona): PersonaFusion[]{
    let result: PersonaFusion[] = [];
    for(let i = 0; i < this.totalPersonaList.length; i++){
      /*
      if(this.totalPersonaList[i].name === "Arsène"){
        console.log("within arsene");
        console.log(persona.arcana);
        console.log(this.totalPersonaList[i].arcana);
        console.log(this.totalPersonaList[i])
        combination = this.fuse(persona,this.totalPersonaList[i], this.determineArcana(persona.arcana,this.totalPersonaList[i].arcana));
        console.log(combination);
        combination = this.fuse(this.totalPersonaList[i], persona, this.determineArcana(this.totalPersonaList[i].arcana,persona.arcana,));
        console.log(combination);
      }*/
      //console.log(this.totalPersonaList[i])
      let combination = this.fuse(persona,this.totalPersonaList[i], this.determineArcana(persona.arcana,this.totalPersonaList[i].arcana));
      if(combination instanceof Persona){
        let fusion = new PersonaFusion(persona,this.totalPersonaList[i], combination);
        result.push(fusion);
      }
    }
    return result;
  }

  getPersona(name: string): Persona | null{
    let result: Persona | null = null;
    this.totalPersonaList.forEach((function (persona: Persona) {
      if(persona.name === name)
        result = persona;
    }))

    return result;
  }

  constructor() {
    this.totalPersonaList = this.populateBothPersonaList();

    //sort by level
    for(let key in this.personaByArcana){
      this.personaByArcana[key].sort( (a,b) => {
        return a.level - b.level;
      });
    }

    if(this.currentPersona != undefined) {
      this.matchingFusions = this.getMatchingFusions(this.currentPersona.name, this.currentPersona.arcana);
    }

    this.p1 = new PageTracker(1,this.matchingFusions,this.currentPersona);
    this.p2 = new PageTracker(1, this.fusionsFrom, this.currentPersona);
  }

  populateBothPersonaList(){

    let list: Persona[] = [];


    for(let key in this.personasDict){
      let shortcut = this.personasDict[key];
      let rare: boolean = shortcut.rare != undefined ? shortcut.rare : false;
      let special: boolean = shortcut.special != undefined ? shortcut.special : false;
      let temp: Persona = new Persona(key, shortcut.level, shortcut.arcana, shortcut.elems,shortcut.area,shortcut.floor,
        shortcut.inherits,shortcut.item, shortcut.itemr, shortcut.skills, shortcut.stats,rare,special);

      //dictionary
      if(!this.personaByArcana[temp.arcana])
        this.personaByArcana[temp.arcana] = [temp];
      else
        this.personaByArcana[temp.arcana].push(temp);

      list.push(temp);
    }

    return list;
  }

  //TODO: implement fuse validation when fusing within the same arcana
  //todo: what i mean by this is that the same persona can't come up in same arcana fusion
  fuse(p1: Persona, p2: Persona, arcana: string){
    let targetLevel = this.fusionLevel(p1.level,p2.level);
    if(p1.arcana === p2.arcana){
      //level goes down when staying within the same arcana
      return this.fusionMatch(targetLevel, arcana, false,p1,p2);
    }

    return this.fusionMatch(targetLevel,arcana,true);
  }



  fusionMatch(level: number, arcana: string, up: boolean, p1?: Persona, p2?: Persona){
    let closestDownNumber = Number.MIN_VALUE;
    let closestDownPersona: Persona | null = null;
    for(let p in this.personaByArcana[arcana]){
      let temp = this.personaByArcana[arcana][p];
      //if the level matches then return the person who it matches to
      if(temp.level === level){
        return temp;
      }
      //handle rounding up
      else if(up && temp.level > level)
        return temp;
      //handle going down
      else if(!up && temp.level <= level && temp.level > closestDownNumber && (temp.name != p1?.name && temp.name != p2?.name)){
        closestDownNumber = temp.level;
        closestDownPersona = temp;
      }
    }

    if(!up)
      return closestDownPersona;
    //default return the roundup value

    return null;
  }

  fusionLevel(p1Level: number, p2Level: number  ){
    return Math.floor((p1Level + p2Level) / 2) + 1;
  }

  //todo: need to make this determine arcana function work because its not working the other way around
  determineArcana(p1Arcana: string, p2Arcana: string){
    for(let i = 0; i < this.arcanaCombos.length; i++) {

      if (this.arcanaCombos[i].source[0] === p1Arcana) {
        if (this.arcanaCombos[i].source[1] === p2Arcana)
          return this.arcanaCombos[i].result;
      }
    }
    return "";
  }

  outsidefusions(persona: Persona){
    let ans: PersonaFusion[] = [];
    //works as intended
    let arcanaCombinations = this.arcanaCombos.filter((x: { source: String[]; }): boolean => {
      return (x.source[0] === persona.arcana) || (x.source[1] === persona.arcana);});

    console.log(arcanaCombinations);

    for(let index in arcanaCombinations){
      let combination = arcanaCombinations[index];
      let arcanaTwo: string = combination.source[0] !== persona.arcana ? persona.arcana : combination.source[1];

      let arcanaOneList: Persona[] = this.personaByArcana[persona.arcana];
      let arcanaTwoList: Persona[] = this.personaByArcana[arcanaTwo];

      for(let personaOne in arcanaOneList){
        for(let personaTwo in arcanaTwoList){
          //this will remove any duplicates
          if(persona.arcana === arcanaTwo && personaTwo <= personaOne) continue;

          let p1 = arcanaOneList[personaOne];
          let p2 = arcanaTwoList[personaTwo];

          //skip if neither are the persona we are trying to fuse out
          if(p1.name != persona.name && p2.name != persona.name)
            continue;

          let result: Persona | null = this.fuse(p1,p2,this.determineArcana(p1.arcana,p2.arcana));
          if(result instanceof Persona ){
            let fusion = new PersonaFusion(p1,p2,result);
            ans.push(fusion);
          }
        }
      }
    }

    return ans;
  }

  getAllPersonaFusionsWithinArcana(Arcana: string){
    let personaList: PersonaFusion[] = [];
    let arcanaCombinations = this.arcanaCombos.filter((x: { result: string; }) => {
      return x.result === Arcana;
    });

    for(let index in arcanaCombinations){
      let combination = arcanaCombinations[index];
      let arcanaOne = combination.source[0];
      let arcanaTwo = combination.source[1];

      //console.log(this.personaByArcana[arcanaOne]);
      //console.log(this.personaByArcana[arcanaTwo]);

      let ArcanaOnePersonaList = this.personaByArcana[arcanaOne];
      let ArcanaTwoPersonaList = this.personaByArcana[arcanaTwo];

      for(let personaOne in ArcanaOnePersonaList){
        for(let personaTwo in ArcanaTwoPersonaList){
          if(arcanaOne === arcanaTwo && personaTwo <= personaOne) continue;
          let p1 = ArcanaOnePersonaList[personaOne];
          let p2 = ArcanaTwoPersonaList[personaTwo];

          let result = this.fuse(p1,p2,Arcana);
          //console.log("Combination of: " + p1.name + "            " + p2.name);
          //console.log(result);


          if (result instanceof Persona) {
            let fusion: PersonaFusion = new PersonaFusion(p1,p2,result);
            if(p1.name != p2.name)
              personaList.push(fusion);
          }
        }
      }
    }

    return personaList;
  }

  getMatchingFusions(name: string, arcana: string){
    let list: PersonaFusion[] = [];
    this.getAllPersonaFusionsWithinArcana(arcana).forEach((function (value){
      if(value.result.name === name && !value.fusionOne.rare && !value.fusionTwo.rare ){
        list.push(value);
      }
    }))

    return list;
  }

  /*** This funtion will return us the elements that will be displayed for the table | 10 elements each page ***/
  getPageData(pagetracker: PageTracker){
    //very rare case of this not generating then we need to generate it ourselves
    //let data : PersonaFusion[] = [];
    if(pagetracker.data == undefined && this.currentPersona != undefined) {
      pagetracker.data = this.getMatchingFusions(this.currentPersona.name, this.currentPersona?.arcana);
    }
    return pagetracker.data?.slice( ( (pagetracker.page - 1 ) * 10 )  , (pagetracker.page * 10) );
  }

  getPageData2(pagetracker: PageTracker){
    if(pagetracker.data == undefined && this.currentPersona != undefined){
      pagetracker.data = this.outsidefusions(this.currentPersona);
    }
    return pagetracker.data?.slice( ( (pagetracker.page - 1 ) * 10 )  , (pagetracker.page * 10) );

  }
}
