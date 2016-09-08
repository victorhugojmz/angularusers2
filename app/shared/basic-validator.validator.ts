import { Control } from '@angular/common';
export class BasicValidator 
{
    static emailvalidation(control: Control)
    {
             var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
             var valid = regEx.test(control.value);
             return valid ? null : { emailvalidation : true }
    }
    static onlynumbers(control: Control)
    {
             var regEx =  /^[0-9]+$/ ;
             var validnumber = regEx.test(control.value);
             return validnumber ? null : { onlynumbers: true } 
    }
}