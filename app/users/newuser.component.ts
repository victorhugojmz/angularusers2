import { Component, OnInit } from '@angular/core';
import { FormBuilder, ControlGroup , Validators} from '@angular/common';
import {BasicValidator} from '../shared/basic-validator.validator';
import {Router , RouteParams} from '@angular/router-deprecated';
import  { UsersService } from './users.service';
import  { User, Address} from './user';
@Component({
    template: 
    `
<div class="container-fluid">
<h1>{{user.name}}</h1>
<div class="col-md-6 col-xs-12 col-sm-12"> 
    <form [ngFormModel]="form" (ngSubmit)="savechanges()">
                <fieldset>
            <legend> {{ title }}</legend>

                    <div class="form-group">
                        <label>Nombre</label>
                        <input [(ngModel)]= "user.name" #name="ngForm" ngControl="name" class="form-control" type="text" placeholder="Escribe tu nombre">
                    </div>   
                            <div *ngIf="name.touched && !name.valid" class="alert alert-danger">
                                 El nombre es requerido
                            </div>
                    
                    <div class="form-group">
                        <label>Correo Electronico</label>
                        <input [(ngModel)]= "user.email" #email = "ngForm" ngControl="email" type="text" class="form-control" placeholder="Escribe tu correo electronico">
                    </div>
                            <div *ngIf="email.touched && !email.valid" class="alert alert-danger">
                                Ingresa un correo electronico válido.
                            </div>
 
                    <div class="form-group">
                        <label>Telefono</label>
                        <input [(ngModel)]= "user.phone" ngControl="phone" type="text" class="form-control" placeholder="Escribe tu telefono">
                    </div>
                            
         
        </fieldset>

        <fieldset  ngControlGroup="address">

            <legend>Dirección</legend>
                        
                    <div class="form-group">
                            <label>Calle</label>
                            <input [(ngModel)]= "user.address.street" ngControl="street" class="form-control" type="text" placeholder="Nombre de la calle donde vives">
                    </div>

                    <div class="form-group">
                            <label>Suite</label>
                            <input [(ngModel)]= "user.address.suite" ngControl="suite" class="form-control" type="text" placeholder="Número de suite">
                    </div>

                    <div class="form-group">
                            <label>Ciudad</label>
                            <input [(ngModel)]= "user.address.city" ngControl="city" class="form-control" type="text" placeholder="Nombre de la ciudad que habitas">
                    </div>

                    <div class="form-group">
                            <label>Código Postal</label>
                            <input [(ngModel)]= "user.address.zipcode" #zipcode="ngForm" ngControl="zipcode"  class="form-control" type="text" placeholder="Escribe los digitos de tu codigo postal">
                    </div>
                            <div *ngIf="zipcode.touched && !zipcode.valid" class="alert alert-danger">
                                Sólo esta permitido ingresar números
                            </div>
        </fieldset>

        <button 
            [disabled]="!form.valid"
            type="submit" 
            class="btn btn-primary">
            Save
        </button>
    
    </form>   
</div>
</div>
    `, 
    providers: [ UsersService ]
})
export class NewUserComponent implements OnInit {
    form; 
    title: string;
    name: string;
    user = new User();
    constructor(
        fb: FormBuilder , 
       private _usersService : UsersService,
       private _router: Router, 
       private _routeParams: RouteParams ) 
    {   
        this.form = fb.group({
            name: ['', Validators.required],
            email: ['', BasicValidator.emailvalidation], 
            phone: [],
            address: fb.group({
                street: ['' , Validators.required],
                suite: ['', Validators.required],
                city: ['', Validators.required],
                zipcode: ['',  BasicValidator.onlynumbers]
            })
        });
    }
    savechanges( )
    {
        var result; 
        if(this.user.id)
            {
                result = this._usersService.updateUser(this.user);
            }
        else {
            result  = this._usersService.addUser(this.user)
        }
        result.subscribe( x => 
            {   
                this._router.navigate(['Users']);
            });

    }
    ngOnInit() {
        console.log("Called id"); 
        var id =  this._routeParams.get("id");
        this.title = id ? "Edit User" : "Add a new User";
        if(!id)
            return;
        this._usersService.getUser(id)
            .subscribe
            ( 
                user => this.user = user,   
            response => { 
                if(response.status == 404) 
                {
                    this._router.navigate(['NotFound']);
                }
            });
    }
}