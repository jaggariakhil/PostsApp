import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/tokens';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
  private token:string;
  private isAuthenticated=false;
  private authStatusListener=new Subject<boolean>();

  constructor(private http:HttpClient) { }


  getToken(){
    return this.token;
  }
  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  createUser(email:string,password:string)
  {
    const authData:AuthData={email:email,password:password};
    this.http.post("http://localhost:3000/api/user/signup",authData).subscribe(response=>{
      console.log(response);
    })

}
getIsAuth(){
  return this.isAuthenticated;
}
 
logout(){
  console.log("l1")
  this.isAuthenticated=false;
  this.token=null;
  this.authStatusListener.next(false);
}

login(email:string,password:string){;
  const authData:AuthData={email:email,password:password};
  this.http.post<{token:string}>("http://localhost:3000/api/user/login",authData).subscribe(res=>{
console.log(res);
const token=res.token;
this.token=token;
if(token){this.isAuthenticated=true;

  this.authStatusListener.next(true);}


  });
}
}
