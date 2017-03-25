import { environment } from '../environments/environment';

var uploadstr=  'http://localhost:3200/';
var hoststr=  'http://localhost:3200/';
if (environment.production) {
    uploadstr=  'https://www.starstech.tech:3201/';
	hoststr=  'https://www.starstech.tech:3201/';
}

export const NODEUPLOAD:string=uploadstr;
export const HOST:string=hoststr;
// export const HOST_P:string='http://starstech.iego.cn:3200/';
// export const NODEUPLOAD_P:string='http://starstech:3200/';
