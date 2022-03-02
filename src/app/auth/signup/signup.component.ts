import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authserv:AuthService) { }

  ngOnInit(): void {
  }
  onSignUp(f:NgForm){
    if(f.invalid) return;
this.authserv.createUser(f.value.email,f.value.password);

  }

}
