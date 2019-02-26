export class Stream {
  id: string;
  game: string;
  name: string;
  description: string;
  display_name: string;
  language: string;
  viewers: string;
  logo: string;
  url: string;

  constructor(obj?:any){
    this.id=obj.id;
  	this.game=obj.game;
    this.name=obj.name;
  	this.description=obj.description;
  	this.display_name=obj.display_name;
  	this.language=obj.language;
  	this.viewers=obj.viewers;
  	this.logo=obj.logo;
  	this.url=obj.url;
  }
}