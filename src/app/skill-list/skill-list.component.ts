import {Component} from '@angular/core';
import {NavigationComponent} from '../navigation/navigation.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-skill-list',
  standalone: true,
  imports: [
    NavigationComponent,
    RouterLink
  ],
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

  }

  fixPersonaList( personaList: any){
    let level: String[] = [];
    let persona: String[] = [];

    for(let key in personaList){
      //result.push(key + " (" + personaList[key] + ") ");
      persona.push(key);
      level.push( " ("+ personaList[key] + ") " );
    }

    return persona.map((item, index) => ({item1: item, item2: level[index]}));
    //return result.join(", ");
  }
}
