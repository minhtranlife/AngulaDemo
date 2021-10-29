import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserModel } from '../../_models/user.model';
import { environment } from '../../../../../environments/environment';
import { AuthModel } from '../../_models/auth.model';

const API_USERS_URL = `${environment.apiUrl}/Users`;

@Injectable({
    providedIn: 'root',
})
export class AuthHTTPService {
    constructor(private http: HttpClient) { }

    // public methods
    login(username: string, password: string): Observable<any> {
        return this.http.post<AuthModel>(`${API_USERS_URL}/SigIn`, { username, password });
    }

    // CREATE =>  POST: add a new user to the server
    createUser(user: UserModel): Observable<UserModel> {
        return this.http.post<UserModel>(API_USERS_URL, user);
    }

    // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
    forgotPassword(email: string): Observable<boolean> {
        return this.http.post<boolean>(`${API_USERS_URL}/forgot-password`, {
            email,
        });
    }

    getUserByToken(token, username): Observable<UserModel> {
        const httpHeaders = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
        let params = new HttpParams().set('username', username);
        
        return this.http.get<UserModel>(`${API_USERS_URL}/GetUserByToken`, {
            headers: httpHeaders, params: params
        });
    }
}
