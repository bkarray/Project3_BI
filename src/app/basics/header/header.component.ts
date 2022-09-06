import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/authservice';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(
    private authService: AuthService,
    private FormulaireService:FormulaireService,) { }
isFnx:any=false
authentificated:any=false
numberOfnotifications:Number=0

  ngOnInit(): void {
    this.authService.loadUser()
this.isFnx=this.authService.isFnx();
this.authentificated=this.authService.isAuthenticated();
console.log('nn',this.authService.authenticatedUser)
if(this.authentificated){this.FormulaireService.verifierUserWork(this.authService.authenticatedUser.U_Id).subscribe((res:any)=>{
  this.numberOfnotifications=res.length
  console.log('nots=',res.length)
})}
  }

  showVar: boolean = false;
  showNotif:boolean=false;

    toggleChild(){
        this.showVar = !this.showVar;
        this.showNotif=false
        console.log(this.showVar )
    }
    openNotif(){
      this.showNotif=!this.showNotif
      this.showVar=false
    }

}
