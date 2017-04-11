export class Bay{
	on_err:boolean;
	id:number;
	name:string;
	cover:string;
	createrid:number;
	creater:string;
	invitekey:string;
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
  id: number;
  bayid:number;
  avatar:string;
  role:string;
  nickname:string;
  token:string;
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
	ownerid:number;
	owner:string;
	moneyimg:string;
	avatar:string;
	bayid:number;
	title:string;
	cover:string;
	coverthumbnail:string;//add for img inshare
	subtitle:string;
	place:string;
	company:string;
	role:string;
	starttime:string;
	updatetime:string;
	endtime:string;
	period:string;
	description:string;
	subcontents:SubContent[];
	likes:People[];
	gifts:People[];
	visitors:string[];
	comments:StoryComment[];
}

export class SubContent{
	illustration:string;//add for img inshare
	thumbnail:any;
	content:string;
}

export class StoryComment{
	storyid:number;
	id:number;
	title:string;
	owner:string;
	ownerid:number;
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
  on_err:boolean;
  err_msg:any;
  invitekey:string;
  nightmode:boolean;//add for nightmode 
  id: number;
  bayid:number;
  avatar:string;
  badge:number;
  moneyimg:string;
  sex:number;
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

export class UserInfo{
  openid:string;
  nickname:string;
  sex:number;
  province:string;
  city:string;
  country:string;
  headimgurl:string;
  privilege:any[];
}