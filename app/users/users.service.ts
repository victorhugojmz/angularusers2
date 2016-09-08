import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

import {User} from './user';
@Injectable( )
export class UsersService  
{
    private _url = 'https://jsonplaceholder.typicode.com/users';
    constructor(private _http : Http)
    { }
    getUsers(): any
    {
        return this._http.get(this._url)
                   .map(response =>  response.json());
    }
    addUser(user): any 
    {
            return this._http.post(this._url, JSON.stringify(user))
                       .map(res => {
                           res.json()
                           console.log("Heelosssssssssss"); 
                    });   
    }
    getUser(userId): any 
    {
        return this._http.get(this._url + "/" + userId)
                    .map( idresponse => idresponse.json());
    }
     updateUser(user) 
    {
        return this._http.put(this._url + "/" + user.id , JSON.stringify(user))
               .map(res => res.json());
    }
    deleteUser(userId): any
    {
        return this._http.delete(this._url + "/" + userId)
               .map(responsedelete => responsedelete.json());
    }
}