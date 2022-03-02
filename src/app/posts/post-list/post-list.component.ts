import { NONE_TYPE } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { PostServiceService } from 'src/app/post-service.service';
import { Post } from 'src/app/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {
  posts: Post[] = [];
  post:Post;
  totalPosts=0;
  postsPerPage=2;
  currentPage=1;
  pageSizeOptions=[1,2,5,10]
  
  postsSub: Subscription;


  constructor(public postsService: PostServiceService,private authserv:AuthService) {}
  isAuthSub:Subscription;
  isAuth=false;

  ngOnInit() {
    

    this.postsService.getPosts(this.postsPerPage,this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((postd:{posts:Post[],postCount:number}) => {
        
        this.posts = postd.posts;
        this.totalPosts=postd.postCount;
        this.isAuthSub=this.authserv.getAuthStatusListener().subscribe((res)=>{
          this.isAuth=res;
        });
      });

      
  }
  onDelete(id:string)
  {
    this.postsService.deletePost(id);
    
    
  }
  
  onChangedPage(pageData:PageEvent){

    this.currentPage=pageData.pageIndex+1;
    this.postsPerPage=pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage,this.currentPage);
    console.log(this.postsPerPage,this.currentPage);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.isAuthSub.unsubscribe();
  }
}


  
  
  


