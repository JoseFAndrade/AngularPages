import {Persona} from './Persona';

export class FusionHelper{



  static fuse(p1: Persona, p2: Persona, arcana: string, personaByArcana: {[arcana: string] : Persona[]}){
    let targetLevel = this.fusionLevel(p1.level,p2.level);

    if(p1.arcana === p2.arcana){
      //level goes down when staying within the same arcana
      return this.fusionMatch(targetLevel, arcana, false, personaByArcana);
    }

    return this.fusionMatch(targetLevel,arcana,true, personaByArcana);
  }

  static fusionMatch(level: number, arcana: string, up: boolean, personaByArcana: {[arcana: string]: Persona[]}){
    let closestDownNumber = Number.MIN_VALUE;
    let closestDownPersona: Persona | null = null;
    for(let p in personaByArcana[arcana]){
      let temp = personaByArcana[arcana][p];

      //if the level matches then return the person who it matches to
      if(temp.level === level){
        return temp;
      }
      //handle rounding up
      else if(up && temp.level > level)
        return temp;
      //handle rounding down
      else if(!up && temp.level <= level && temp.level > closestDownNumber){
        closestDownNumber = temp.level;
        closestDownPersona = temp;
      }
    }

    if(!up)
      return closestDownPersona;
    //default return the roundup value

    return null;
  }

  static fusionLevel(p1Level: number, p2Level: number  ){

    return Math.floor((p1Level + p2Level) / 2) + 1;
  }

  static determineArcana(p1Arcana: string, p2Arcana: string, arcanaCombos: any){
    for(let i = 0; i < arcanaCombos.length; i++) {

      if (arcanaCombos[i].source[0] === p1Arcana) {
        if (arcanaCombos[i].source[1] === p2Arcana)
          return arcanaCombos[i].result;
      }
    }
    return "";
  }

  static getAllPersonaWithinArcana(Arcana: string, arcanaCombos: any, personaByArcana: {[arcana: string]: Persona[]}){
    let personaList: Persona[] = [];
    let arcanaCombinations = arcanaCombos.filter((x: { result: string; }) => {
      return x.result === Arcana;
    });

    for(let index in arcanaCombinations){
      let combination = arcanaCombinations[index];
      let arcanaOne = combination.source[0];
      let arcanaTwo = combination.source[1];


      let ArcanaOnePersonaList = personaByArcana[arcanaOne];
      let ArcanaTwoPersonaList = personaByArcana[arcanaTwo];

      for(let personaOne in ArcanaOnePersonaList){
        for(let personaTwo in ArcanaTwoPersonaList){
          let p1 = ArcanaOnePersonaList[personaOne];
          let p2 = ArcanaTwoPersonaList[personaTwo];

          let result = this.fuse(p1,p2,Arcana,personaByArcana);
          console.log("Combination of: " + p1.name + "            " + p2.name);
          console.log(result);

          if (result instanceof Persona) {
            personaList.push(result);
          }
        }
      }
    }

    return personaList;
  }
}
