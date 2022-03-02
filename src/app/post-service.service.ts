import { HttpClient } from '@angular/common/http';

import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';



import { map, Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  private posts: Post[] =[];
  private postsUpdated = new Subject<{posts:Post[],postCount:number}>();

  constructor(private http: HttpClient,private router:Router) {}

  getPosts(postsPerPage:number,currentPage:number) {
    const queryParams=`?pagesize=${postsPerPage}&page=${currentPage}`;
    console.log("http://localhost:3000/api/posts"+queryParams)
    this.http
      .get<{ message: string; posts:any,maxPosts:number }>(
        "http://localhost:3000/api/posts"+queryParams
      )
      .subscribe(postData => {
        this.posts = postData.posts;
        this.postsUpdated.next({posts:[...this.posts],
          postCount:postData.maxPosts});
      });
     
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  deletePost(pId:string){
    this.http.delete("http://localhost:3000/api/posts/"+pId).subscribe(()=>
    {
      console.log('deleted');
     
      const updatedPosts=this.posts.filter(p=>p._id!==pId);
      this.posts=updatedPosts;
      this.postsUpdated.next({posts:[...this.posts],
        postCount:10});
     
     
      
    });
  }

  addPost(po:Post,image:File) {
    const postData=new FormData();
    console.log(po.title,po.content,image);
    postData.append("title",po.title);
    postData.append("content",po.content);
    postData.append("image",image,po.title);
 
    this.http
      .post<{ message: string,post:Post }>("http://localhost:3000/api/posts", postData)
      .subscribe(responseData => {
        
        this.router.navigate(["/"]);
      });
  }


  getPost(id:string){
    //const url="http://localhost:3000/api/posts/"+id;
   //return this.http.get<Post>(url);
   
    return {...this.posts.find(p=>p._id===id)};
  }


updatePost(id:string,title:string,content:string,image:File|string){
let postData:Post|FormData;
  if(typeof(image)==='object')
  {
 postData=new FormData();
  postData.append("id",id)
    postData.append("title",title);
    postData.append("content",content);
   

    postData.append("image",image,title);
    
   
  }
  else{
 postData={
  _id:id,
  title:title,
  content:content,
  imagePath:image,
}
console.log(image)
}




const url="http://localhost:3000/api/posts/"+id;
this.http.put(url,postData).
subscribe((response)=>{
  console.log(response);
  this.router.navigate(["/"]);
})


  }
}
