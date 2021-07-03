import { User } from '../domain/user';

export type FalseResponseStatus = 400 | 401 | 403 | 404 | 500 | 501;

export interface BaseRequest {
  query: any;
  params: any;
  url: string;
  method: string;
  body: any;
  user: User;
}

export type FalseResponse =  {
  status: FalseResponseStatus,
  body: {
    success: false;
    message: string;
    [key: string]: boolean | number| string;
  }
};