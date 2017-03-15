export class Bay{
	id:number;
	name:string;
	cover:string;
	createrid:number;
	creater:string;
	people:People[];
	// skill:Skill[];
	storys:Story[];
	starttime:string;
	updatetime:string;
	// projectexps:ProjectExp[];
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
	flag:string;//add for animation
	id:number;
	avatar:string;
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
	comments:StoryComment[];
}

export class StoryComment{
	storyid:number;
	id:number;
	title:string;
	owner:string;
	role:string;
	starttime:string;
	comment:string;
	avatar:string;
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
  avatar:string;
  role:string;
  name: string;
  nickname:string;
  password: string;
  status: string;
  remember:boolean;
  token:string;
  rights:number[];
  email:string;
  starttime:string;
  updatetime:string;
}