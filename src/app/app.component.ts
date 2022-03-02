import { Component } from '@angular/core';
import { PostServiceService } from './post-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PostsApp';
  constructor(private postserv:PostServiceService) { }
  
 

}
