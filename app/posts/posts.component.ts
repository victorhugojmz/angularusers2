import { Component, OnInit } from '@angular/core';

import { PostsService } from './posts.service';
import { UsersService } from '../users/users.service';

import {SpinnerComponent } from '../shared/spinner.component';
import {PaginationComponent} from '../shared/pagination.component';

@Component({
    template: 
    `
    <h1>Publicaciones</h1>
            
            <spinner [loading]="postsLoading" ></spinner>
   
    <div class="row">
        
        <div class="col-md-6 col-sm-6 col-xs-12">
            
            <select class="form-control"  #u  (change)="reloadPosts({ userId: u.value })">
 
                <option value="">Select a user...</option>
                <option *ngFor="let user of users" value="{{user.id}}">
                    {{user.name}}
                </option>
            
            </select>         
            <ul class="list-group">
                <li class="list-group-item" *ngFor="let post of pagedPosts" (click)="select(post)">
                    {{post.title}}    
                </li>
            </ul>
        
        </div>
        
        <div class="col-md-6 col-sm-6 col-xs-12">
            
            <div *ngIf="currentPost" class="panel panel-default">    
                 
                    <div class="panel-heading">
                    
                            <h3 class="panel-title"> {{ ledescipcion.title }} </h3>   
                    
                    </div> 
                 
                     <div class="panel-body"> 

                            <p>{{ ledescipcion.body }}</p>
                     
                     </div>
                
                     <spinner [loading]="commentsloading"></spinner>
                
                    <div   *ngFor="let comment of comments" class="media">
                        
                                <div class="media-left">
                                     
                                     <a href="#">
                                        <img class="media-object" src="http://lorempixel.com/80/80/people?random={{ comment.id }}" alt="">
                                     </a>
                                
                                </div>
                                
                                <div class="media-body">
                                        
                                    <h4 class="media-heading"> {{comment.email}}</h4>
                                    <p> {{comment.body}}</p>        
              
                                </div>
                    </div>        
            </div>  
        </div>   
    </div>
    <pagination [page-size]="pageSize" [items]="posts" (pagechanged)="onPageChanged($event)"></pagination>    

    `, 
    providers : [PostsService , UsersService], 
    directives: [SpinnerComponent, PaginationComponent]
})
export class PostsComponent implements OnInit {
    pageSize = 10;
    posts = [ ];
    pagedPosts = [ ];
    comments: any[];
    ledescipcion: any[];
    postsLoading: boolean;
    commentsloading: boolean;
    users = [ ];
    currentPost: boolean;
    constructor(
        private _postsService : PostsService, 
        private _usersService: UsersService ) {
        this.postsLoading = true;
        this.currentPost = false;
        this.commentsloading = true;
     }
    ngOnInit() {
        this.loadUsers(); 
        this.loadPosts();
    }
    private loadPosts(filter?): any 
    {
        this.postsLoading = true;
        this._postsService.getPosts(filter)
            .subscribe( 
                posts => {
                    this.posts = posts;
                    this.pagedPosts = _.take(this.posts , this.pageSize);
                },
            null, 
            () => {this.postsLoading=false; });
    }
    private loadUsers( )
    {
        this._usersService.getUsers()
            .subscribe(usersres => this.users =  usersres); 
    }
    reloadPosts(filter)
    {
        this.ledescipcion = null;
        this.loadPosts(filter);
    }
    select(post) 
    {
        this.ledescipcion = post;
        this.currentPost = !this.currentPost;
        this._postsService.getComments(post.id)
            .subscribe( 
                comments => 
                {
                    this.comments = comments
                },
                null, 
                () => this.commentsloading = false
            );
    }
    onPageChanged(page)
    {
        var startIndex = (page - 1) * this.pageSize;  
        this.pagedPosts = _.take(_.rest(this.posts, startIndex), this.pageSize);
    }

}