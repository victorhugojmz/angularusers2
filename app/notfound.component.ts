import { Component } from '@angular/core';
@Component({
    template: 
    ` <h1 class="error">404</h1>
      <h2 class="error">page not found.</h2>
      <h3 class="error">¯&#92;_(ツ)_/¯</h3>
        `, 
    styles: [
        `
        body 
        {
             height: 100%; 
             width: 100%; 
        }
        .error { 
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        `]
})
export class NotFoundComponent {

    constructor() { }
}