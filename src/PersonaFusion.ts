import {Persona} from './Persona';

export class PersonaFusion{

  fusionOne: Persona;
  fusionTwo: Persona;
  result: Persona;


  constructor(fusionOne: Persona, fusionTwo: Persona, result: Persona) {
    this.fusionOne = fusionOne;
    this.fusionTwo = fusionTwo;
    this.result = result;
  }
}
