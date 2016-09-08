import { Component, OnInit } from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {RouterLink} from '@angular/router-deprecated';
import { UsersService } from './users.service';

import { SpinnerComponent} from '../shared/spinner.component';

@Component({
    template: 
    `<h1>Usuarios</h1>
    <spinner [loading]= "loading_user"></spinner>
    <table class="table table-bordered table-striped table-condensed">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>     
        </thead>
        <tbody>
            <tr *ngFor="let user of users">
                <td>{{user.name}}</td>
                <td>{{user.email}}</td>
                <td><a [routerLink]="['EditUser' , {id: user.id}]" ><i class="glyphicon glyphicon-edit"></i></a></td>
                <td><i (click) = "delete(user)" class="glyphicon glyphicon-remove"></i></td>
            </tr>
        </tbody>
    </table>
    <p>
        <a [routerLink]="['New']"  class="btn btn-primary">Add User</a>
    </p>
    `,
    providers: [UsersService, HTTP_PROVIDERS],
    directives: [RouterLink, SpinnerComponent]
})
export class UsersComponent implements OnInit {
    users: any[];
    loading_user: boolean;
    constructor(private _usersService: UsersService) 
    {
        this.loading_user = true;
     }
    ngOnInit(): any  {
        console.log("Called!"); 
        this._usersService.getUsers() 
            .subscribe(
                users =>
                { this.users = users }, 
                null,
                () => {this.loading_user = false; }  
                );    

}
delete(user){
   if(confirm("Estas seguro que deseas eliminar a " + user.name )){
        var indice  = this.users.indexOf(user)
        this.users.splice(indice , 1 );
        this._usersService.deleteUser(user.id)
            .subscribe(null,
            error => {
                alert("La operación no pudo ser complatada");
                this.users.splice(indice, 0 , user );
            });

    }
 }
}