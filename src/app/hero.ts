export class Bay{
	id:number;
	name:string;
	people:People[];
	skill:Skill[];
	storys:Story[];
	projectexps:ProjectExp[];
}

export class People{
	name : string;
	gender: string;
	age:number;
	cellphone:string;
	mail:string;
	home:string;
}

export class Skill{
	language:string;
	level:string;
	value:number;
	years:number;
	rating:number[];
}

export class Story{
	//add for animation
	flag:string;
	id:number;
	bayid:number;
	title:string;
	cover:string;
	subtitle:string;
	owner:string;
	place:string;
	company:string;
	role:string;
	starttime:string;
	endtime:string;
	period:string;
	description:string;
}

export class ProjectExp{
	company:string;
	name:string;
	description:string;
	starttime:string;
	endtime:string;
	period:string;
	role:string;
	roledes:string;
}

export class User {
  id: number;
  bayid:number;
  role:string;
  name: string;
  password: string;
  status: string;
}