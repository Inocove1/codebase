import { Component  , OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mybool:boolean;
  constructor(public auth: AuthService,private router: Router) {
    console.log(this.router.url);
   }
   
  showDiv(){
    if(this.router.url === '/'){
      return true;
     
    }else{
      return false;
    }
  }
  
}
