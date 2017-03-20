import { environment } from '../environments/environment';

var uploadstr=  'http://localhost:3200/';
var hoststr=  'http://localhost:3200/';
if (environment.production) {
    uploadstr=  'http://starstech.iego.cn:3200/';
	hoststr=  'http://starstech.iego.cn:3200/';
}

export const NODEUPLOAD:string=uploadstr;
export const HOST:string=hoststr;
// export const HOST_P:string='http://starstech.iego.cn:3200/';
// export const NODEUPLOAD_P:string='http://starstech:3200/';
