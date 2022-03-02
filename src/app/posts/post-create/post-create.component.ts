import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostServiceService } from 'src/app/post-service.service';
import { Post } from 'src/app/post.model';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
 imgPreview='';
  mode=0;
  form:FormGroup;
  buttontext="Add Post"
 isLoading=false;
 post:Post={_id:" ",title:'',content:'',imagePath:null};
 
private postId:string;

  constructor(public postsService: PostServiceService,private route:ActivatedRoute) {}

  ngOnInit(): void {

this.form=new FormGroup({
  'title': new FormControl(null,{validators:[Validators.required,Validators.minLength(3)] }),
'content':new FormControl(null,{validators:[Validators.required]}),
'image':new FormControl(null,{validators:[Validators.required]})

 
});





      this.route.paramMap.subscribe((paramMap:ParamMap)=>{
       
        if(paramMap.has('id')){
          
         
          this.mode=1;
          this.buttontext="Update Post"
          this.postId=paramMap.get('id');
          this.isLoading=true;
          this.post=this.postsService.getPost(this.postId);
          this.form.setValue({'title':this.post.title,'content':this.post.title,'image':this.post.imagePath});
          this.isLoading=false;

        }
        else{
          this.mode=0;
          this.buttontext="Add Post"
          this.postId=null;
        }
      });
  }
  onAddPost() {
    if (this.form.invalid) {
      return;
    }
    let p:Post=this.form.value;
   
    if(this.mode===0){
      this.postsService.addPost(p,this.form.value.image);
      console.log(Image);
    }
    if(this.mode===1)
    {
      this.postsService.updatePost(this.postId,p.title,p.content,this.post.imagePath);
      console.log("test 1")
      console.log(this.post.imagePath)
      
    }
    console.log(this.post.imagePath);
  
    this.form.reset();
  }

  onImagePicked(event:Event){
    
    const file=(event.target as HTMLInputElement).files[0];
    this.form.patchValue({image:file});
    this.form.get('image').updateValueAndValidity();
    const freader=new FileReader();
    freader.onload=()=>{
      this.imgPreview=freader.result as string;
    }
    freader.readAsDataURL(file);

  }

}
