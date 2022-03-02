import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnDestroy{
  userAuthenticated=false;
  private authList:Subscription;

  constructor(private authservice:AuthService) { }

 
  ngOnInit(): void {

  
    this.authList=this.authservice.getAuthStatusListener().subscribe(res=>{
      this.userAuthenticated=res;
    });
  }

  onLogout(){
    console.log("log")
    this.authservice.logout();
  }
 

    ngOnDestroy(): void {
      this.authList.unsubscribe();
  }

}
