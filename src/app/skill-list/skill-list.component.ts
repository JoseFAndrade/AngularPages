import { Component } from '@angular/core';

@Component({
  selector: 'app-skill-list',
  standalone: true,
  imports: [],
  templateUrl: './skill-list.component.html',
  styleUrl: './skill-list.component.css'
})
export class SkillListComponent {

  protected readonly skillMapRoyal = skillMapRoyal;

  skillArray: any = [];


  constructor() {
    for( let key in this.skillMapRoyal){
      this.skillArray.push([key,(this.skillMapRoyal)[key]]);
    }

    console.log(this.skillArray);
  }

  fixPersonaList( personaList: any){
    let result: String[] = [];

    for(let key in personaList){
      result.push(key + " (" + personaList[key] + ") ");
    }

    console.log(result);

    return result.join(", ");
  }
}
