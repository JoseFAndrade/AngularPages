import {PersonaFusion} from './PersonaFusion';
import {Persona} from './Persona';

export class PageTracker{
  page: number;
  data: PersonaFusion[] | undefined;
  persona: Persona | undefined;


  constructor(page: number, data: PersonaFusion[] | undefined, persona: Persona | undefined) {
    this.page = page;
    this.data = data;
    this.persona = persona;
  }

  decreasePage() {
    if(this.page >= 2)
      this.page--;

  }

  increasePage() {
    // @ts-ignore
    //because of the way that this language handles numbers we don't need to deal with floats or remainder values
    if(this.data != undefined){
      let max: number = this.data.length/ 10;
      if(this.page < max){
        this.page++;
      }
    }
  }


}
