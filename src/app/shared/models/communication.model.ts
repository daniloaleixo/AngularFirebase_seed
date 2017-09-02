import { IAuthUser } from './auth.model';
import { IMission } from './mission.model';

export type TRequest = number;

export interface IRequest {
	requestType: TRequest;
}
export interface IResponse {

}


export interface ILoginRequest extends IRequest {
	email: string;
	password: string;
}

export interface ILoginResponse extends IResponse {
	user: IAuthUser;
}

export interface IGetAllMissionsResponse extends IResponse {
	missions: IMission[];
}
