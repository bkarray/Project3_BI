import {  Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';
import { AuthService } from 'src/app/services/auth/authservice';
import { CartService } from 'src/app/services/cart/cart.service';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-formulaire-list',
  templateUrl: './formulaire-list.component.html',
  styleUrls: ['./formulaire-list.component.css']
})
export class FormulaireListComponent implements OnInit {

  constructor(private CartService: CartService,
    private authService: AuthService,
    private service:SharedService,
    private router: Router,
    private FormulaireService:FormulaireService ) { }
  formulaires:any=[]
  newFormulaireName:any=''
  newFormulaireStatus:any=''
  creatFormIsOpen:boolean=false
  services:any=[]
  serviceFormIsOpen:boolean=false
  newServName:any=''
  newReponseName:any=''
  reponseFormIsOpen:boolean=false

  ngOnInit(): void {
    this.getForms()
  }
  @Output() emitter: EventEmitter<string> = new EventEmitter<string>();

  open(index:any){
    this.formulaires[index].isOpen=!this.formulaires[index].isOpen;
  }

  openReponseForm(){
  this.reponseFormIsOpen=!this.reponseFormIsOpen
  }
  addNewFormulaire(){
    let newFormulaireName={
      Formulaire_Name:this.newFormulaireName,
      Formulaire_Status:this.newFormulaireStatus
    }
if(this.services.length!=0){    
      this.FormulaireService.addNewFormulaire(newFormulaireName).subscribe((formulaire:any)=>{
      let i=1
      this.services.forEach((serv:any)=>{
        serv.Formulaire_Id=formulaire.Formulaire_Id
        serv.Serv_order=i;
       this.FormulaireService.creatNewService(serv).subscribe((res:any)=>{})
       i++;
      })
      this.router.navigate(['/formulaire/new/', formulaire.Formulaire_Id]);
    })}
  }
  deleteServ(index:any){
this.services.splice(index, 1)
  }
  addNewServ(){
  let serv={
    Formulaire_Id:null,
    Serv_Name:this.newServName,
    Serv_User:null,
    Serv_order:0,
    serv_reponse:null
  }
  this.services.push(serv)
  this.newServName=''
  this.serviceFormIsOpen=!this.serviceFormIsOpen
  }
  addNewReponse(Formulaire_Id:any){
   let newReponse={
    Formulaire_Id:Formulaire_Id,
    reponse_Name:this.newReponseName,
    reponse_level:null,
    reponse_status:'new'
    
   }
   this.FormulaireService.creatNewReponce(newReponse).subscribe((res:any)=>{
    this.reponseFormIsOpen=!this.reponseFormIsOpen
    this.router.navigate(['/formulaire/reponse/',Formulaire_Id,res.Reponse_Id])

   })
  }
  openForm() {
this.creatFormIsOpen=!this.creatFormIsOpen

  }
  openServiceForm(){
this.serviceFormIsOpen=!this.serviceFormIsOpen
  }
  openTable(Formulaire_Id:any,Reponse_Id:any){
    this.router.navigate(['/formulaire/table/',Formulaire_Id,Reponse_Id])
  }

  getForms(){
    this.FormulaireService.getAllFormulaire().subscribe((data:any)=>{
      data.forEach((formulaire:any)=>{
        console.log(formulaire.Formulaire_Id)
        this.FormulaireService.getReponsesByFormulaire(formulaire.Formulaire_Id).subscribe((reponses:any)=>{
          console.log(reponses)
          formulaire['reponses']=[]
          formulaire['isOpen']=false
  
          reponses.forEach((reponse:any)=>{
            
            if(reponse.reponse_level!=null)this.FormulaireService.getServices(reponse.reponse_level).subscribe((servise:any)=>{
              
              this.authService.getUserById(servise.Serv_User).subscribe((user:any)=>{

                servise['userName']=user[0].U_FirstName+" "+user[0].U_LastName
                reponse['currentServ']=servise

                if(formulaire.reponses.findIndex((e:any)=> e.Reponse_Id==reponse.Reponse_Id)==-1) formulaire.reponses.push(reponse)
              })
            })
            else reponse['currentUser']=null;
          })
          formulaire['reponses']=reponses

          this.formulaires.push(formulaire)
          //console.log(this.formulaires)
        })
      })
    })
    //console.log(this.formulaires)
  }
}
