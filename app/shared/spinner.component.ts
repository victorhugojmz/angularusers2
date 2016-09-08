import { Component ,  Input  } from '@angular/core';

@Component({
    selector: 'spinner',
    template: 
    ` 
    <i class="fa fa-3x fa-spin fa-spinner" *ngIf="visible"></i>`
})
export class SpinnerComponent  {
    @Input('loading')  visible = true;
    constructor() 
    { 
     }
}