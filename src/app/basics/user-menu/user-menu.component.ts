import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concat } from 'rxjs';
import { AuthService } from 'src/app/services/auth/authservice';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css'],
})
export class UserMenuComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  name: string = '';
  isAuthentificated!: boolean;
  isAdmin!:boolean;
  isFnx!:boolean;
  ngOnInit(): void {
    this.authService.loadUser();
    console.log('auth=',this.authService.isAuthenticated())
    this.isAuthentificated=this.authService.isAuthenticated();
    if(this.isAuthentificated)  this.name = this.authService.authenticatedUser.U_FirstName;
    else this.name ='welcome'
   

    this.isAdmin=this.authService.isAdmin()
    this.isFnx=this.authService.isFnx()
  }

  logout() {
if (this.isAuthentificated){    this.authService.logout();
    window.location.reload;
    this.router.navigateByUrl('');
    this.ngOnInit()
    window.location.reload;
    this.isAuthentificated=false
    this.showMePartially = false;}
    else{
      this.router.navigate(['/auth/login'])
    }
  }
  open(){
    this.ngOnInit()
    this.showMePartially=!this.showMePartially
  }

  @Input() showMePartially: boolean | undefined;
}
