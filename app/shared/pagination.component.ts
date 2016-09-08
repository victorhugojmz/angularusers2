import { Component, Input , Output, EventEmitter} from '@angular/core';
import {OnChanges } from '@angular/core';
@Component({
    selector: 'pagination',
    template: 
    `
    <nav class="nav" *ngIf="items.length  > pageSize">
              <ul class="pagination">
                <li [class.disabled] = "currentPage == 1" >
                  <a class="page"  aria-label="Previous" (click)="prev()">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>

                <li [class.active]="currentPage == page" *ngFor="let page of pages" (click)="changePage(page)">
                  <a class="page">{{page}}</a>
                </li>

                <li [class.disabled]= "currentPage == pages.length">
                  <a class="page" aria-label="Next" (click)="next()">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
    </nav>
    ` , 
    styles: [` 
    .page 
    {
        cursor: pointer;
     }
     .nav{
         margin: 0 auto;
     }    
    `]
})
export class PaginationComponent implements OnChanges {
    @Input() items= [];
        @Input('page-size') pageSize = 10;
        @Output('pagechanged')  pageChanged = new EventEmitter();
    pages =  [ ];
    currentPage;
    ngOnChanges(){
        this.currentPage = 1;
          var contador = this.items.length / this.pageSize;
          this.pages = [ ];
          for(var i = 1 ; i < contador; i++)
          {
              this.pages.push(i);
          }    
    }
    changePage(page){
        this.currentPage = page;
        this.pageChanged.emit(page);
    }
    next(){
        if(this.currentPage == this.pages.length)
            return;
        this.currentPage ++;
        this.pageChanged.emit(this.currentPage);
    }
    prev(){
        if(this.currentPage == 1)
            return;
        this.currentPage--;
        this.pageChanged.emit(this.currentPage);
    }
}