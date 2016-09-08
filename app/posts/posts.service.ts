import { Http} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
@Injectable()
export class PostsService 
{
    private _url = 'https://jsonplaceholder.typicode.com/posts';
    constructor(private _http: Http ){
    }
    getPosts(filter?): any 
    {
        var url = this._url;
        if(filter && filter.userId)
            url += "?userId=" + filter.userId;

        return this._http.get(url)
               .map(reponseposts => reponseposts.json());
    }
    getComments(postId): any 
    {    
      return this._http.get(this._url + "/" + postId + "/comments")
             .map(responsecomments =>  responsecomments.json());    
    } 

}