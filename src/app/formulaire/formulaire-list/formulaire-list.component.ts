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
  servsExamples:any=[]
  todelete:boolean=false
  deleteFormName:any=''
  deleteFormID:any=null
  servFormIsOpen:boolean=false
  servToCreate:any=''
  users:any=[]
  usersNewServ:any=[]
  userForm:boolean=false
  newUserId:Number=0


  ngOnInit(): void {
    this.getForms()
  }
  @Output() emitter: EventEmitter<string> = new EventEmitter<string>();

  opendeleteForm(id:any,name:any){
    this.deleteFormID=id;
    this.deleteFormName=name
    this.todelete=!this.todelete

  }


  openServForm(){
    this.servFormIsOpen=!this.servFormIsOpen
  }
  deleteUser(index:any){
 this.users.push(this.usersNewServ[index])
 this.usersNewServ.splice(index,1)
  }

  closeServForm(){
   this.usersNewServ.forEach((user:any)=> {
    this.users.push(user)
   })
   this.usersNewServ=[]
   this.servToCreate=''
   this.openServForm()
  }

  creatServ(){
    let newServ={
      Formulaire_Id:null,
      Serv_Name:this.servToCreate,
      Serv_User:null,
      Serv_order:0,
      Serv_Refer:null,
      serv_reponse:null


    }
if((this.servToCreate!='')&&(this.servsExamples.findIndex((e:any)=> e.Serv_Name==this.servToCreate)==-1)&&(this.usersNewServ.length!=0)){
  this.FormulaireService.creatNewService(newServ).subscribe((serv:any)=>{
  this.usersNewServ.forEach((user:any)=>{
    let newRelation={
      User_Id:user.U_Id,
      Serv_Id:serv.Serv_Id
    }
    this.FormulaireService.creatRelationUserServ(newRelation).subscribe((res:any)=>{

    })
  })
  this.servsExamples.push(serv)
  this.closeServForm()
})}
  }
  addUserForm(){
   this.userForm=!this.userForm
  }
  addUser(){
if(this.newUserId!=0){    let index=this.users.findIndex((e:any)=> e.U_Id==Number(this.newUserId))
    console.log(this.users,Number(this.newUserId))
    this.usersNewServ.push(this.users[index])
    this.users.splice(index,1)
    this.newUserId=0
    this.addUserForm()
    console.log(this.usersNewServ)}
  }

  deleteFormulaire(){
this.FormulaireService.deleteFoemulaire(this.deleteFormID).subscribe((res:any)=>{
  let index=this.formulaires.findIndex((e:any)=> e.Formulaire_Id==this.deleteFormID)
  this.formulaires.splice(index,1)
  console.log(res)
  this.deleteFormID=null;
  this.deleteFormName=''
  this.todelete=!this.todelete
})
  }

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
        let newTable={
          Formulaire_Id:formulaire.Formulaire_Id,
          Table_Name:formulaire.Formulaire_Name.replace(/\s/g, '')+'0',
          Table_level:0

        }
        this.FormulaireService.creatNewTable(newTable).subscribe((tab:any)=>{
          this.services.forEach((serv:any)=>{
            serv.Formulaire_Id=formulaire.Formulaire_Id
           this.FormulaireService.creatNewService(serv).subscribe((res:any)=>{})
          })
          this.router.navigate(['/formulaire/new/', formulaire.Formulaire_Id,0]);
        })

    })}
  }

  deleteServ(index:any){
    this.servsExamples.push(this.services[index])
this.services.splice(index, 1)
  }
  openFormPage(formulaire:any){
    this.router.navigate(['/formulaire/new/', formulaire,1])
  }
  addNewServ(){
  let serv={
    Formulaire_Id:null,
    Serv_Name:this.newServName,
    Serv_User:null,
    Serv_order:0,
    serv_reponse:null,
    Serv_Refer:null
  }
  this.services.push(serv)
  let index=this.servsExamples.findIndex((e:any)=> e.Serv_Name==this.newServName)
  this.servsExamples.splice(index,1)
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
    this.router.navigate(['/formulaire/reponse/',Formulaire_Id,res.Reponse_Id,0])

   })
  }
  openReponseFormPage(indexF:any,indexR:any){
    this.router.navigate(['/formulaire/reponse/',this.formulaires[indexF].Formulaire_Id,this.formulaires[indexF].reponses[indexR].Reponse_Id,1])
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
      this.authService.getAllUsers().subscribe((users:any)=>{
       this.users=users
       this.FormulaireService.getServsExamples().subscribe((res:any)=>{
        console.log(res)
        this.servsExamples=res;
      
      data.forEach((formulaire:any)=>{
  console.log("000")
        this.FormulaireService.getReponsesByFormulaire(formulaire.Formulaire_Id).subscribe((reponses:any)=>{

          formulaire['reponses']=[]
          formulaire['isOpen']=false

            console.log(res)
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

})
   })
    //console.log(this.formulaires)
  }
}
