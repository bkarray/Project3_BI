import { Component, OnInit,Input,Output } from '@angular/core';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';
import { AuthService } from 'src/app/services/auth/authservice';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-user-notifactions',
  templateUrl: './user-notifactions.component.html',
  styleUrls: ['./user-notifactions.component.css']
})
export class UserNotifactionsComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private service:SharedService,
    private router: Router,
    private FormulaireService:FormulaireService ) { }
  userId:any=null
  reponses:any=[]
  ngOnInit(): void {
   if(this.authService.authenticatedUser) {this.userId=this.authService.authenticatedUser.U_Id
    this.FormulaireService.verifierUserWork(this.userId).subscribe((reponses:any)=>{
      this.reponses=reponses
    })}
    
  }

  openReponse(reponse:any){
    this.showMePartially=false
    this.ngOnInit()
this.router.navigate(['/formulaire/table/',reponse.Formulaire_Id,reponse.Reponse_Id])
  }

  @Input() showMePartially: boolean | undefined;
}
