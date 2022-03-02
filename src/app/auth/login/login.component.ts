import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent 
 {


  constructor(private authServ:AuthService,private router:Router) { }

  

  
  onLogin(f:NgForm){
    this.authServ.login(f.value.email,f.value.password);
  
this.router.navigate(['/'])

  }
 

}
