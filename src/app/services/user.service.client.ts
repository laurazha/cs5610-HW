import { User } from '../models/user.model.client';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class UserService {

  constructor(private _http: Http) {
  }
  baseUrl = environment.baseUrl;

  createUser(user: User) {
    return this._http.post(this.baseUrl + '/api/user', user)
      .map((response: Response) => {
        return response.json();
      });
  }

  findUserById(userId: string) {
    return this._http.get(this.baseUrl + '/api/user/' + userId)
      .map((response: Response) => {
        return response.json();
      });
  }

  findUserByCredentials(username: string, password: string) {
    return this._http.get(this.baseUrl + '/api/user?username=' + username + '&password=' + password)
      .map((response: Response) => {
        return response.json();
      });
  }

  updateUserInServer(userId: string, user: User) {
    return this._http.put(this.baseUrl + '/api/user/' + userId, user)
      .map((response: Response) => {
        return response.json();
      });
  }

  deleteUserInServer(userId: String) {
    return this._http.delete(this.baseUrl + '/api/user/' + userId)
      .map((response: Response) => {
        return response.json();
      });
  }
}
