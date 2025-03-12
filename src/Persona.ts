export class Persona{

  name: string;
  level: number;
  arcana: string;
  elements: string[];
  area: string;
  floor: string;
  inherits: string;
  item: string;
  enhancedItem: string;
  skills: any;
  stats: any;


  constructor(name: string, level: number, arcana: string, elements: string[], area: string, floor: string, inherits: string, item: string, enhancedItem: string, skills: any, stats: any) {
    this.name = name;
    this.level = level;
    this.arcana = arcana;
    this.elements = elements;
    this.area = area;
    this.floor = floor;
    this.inherits = inherits;
    this.item = item;
    this.enhancedItem = enhancedItem;
    this.skills = skills;
    this.stats = stats;
  }
}
