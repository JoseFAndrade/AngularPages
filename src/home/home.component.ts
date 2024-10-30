import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  personaDict: any = personas;
  personaArray: any = [];

  constructor() {
    for(let key in this.personaDict){
      this.personaArray.push([key, (this.personaDict)[key]]);
    }
  }

  populateTable(){
    this.delete();

    var input = document.getElementById("page-search-input")
    // @ts-ignore
    var filter = input.value.toUpperCase();
    for( const[key, value] of Object.entries(personas)){
      if(key.toUpperCase().indexOf(filter) > -1){
        this.personaArray.push([key, this.personaDict[key]]);
      }
    }
  }

  delete(){
    this.personaArray = [];
  }

}
