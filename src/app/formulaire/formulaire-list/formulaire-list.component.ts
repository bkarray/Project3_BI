import {  Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';
import { AuthService } from 'src/app/services/auth/authservice';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-formulaire-list',
  templateUrl: './formulaire-list.component.html',
  styleUrls: ['./formulaire-list.component.css']
})
export class FormulaireListComponent implements OnInit {

  constructor(
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
  newReponseType:any=''
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
  servList:boolean=false
  creationFormulaire:boolean=false
  servToShow:any=''
  usersOfServToShow:any=[]
  userFormShow:boolean=false
  servShowIsOpen:boolean=false
  usersToAddShow:any=[]
  deleteReponceID:any=null
  deleteReponseName:any=''
  todeleteRep:any=false
  isAdmin:boolean=false
  deleteReponceIndex:any=-1

  ExcelFormIsOpen:boolean=false;

  groups:any[]=[]
  groupSelected:any[]=[]

  groupFormIsOpenSide:boolean=false
  newGroupNameSide:any=""

  groupFormIsOpen:boolean=false
  newGroupName:any=""
  newFormGroups:any[]=[]

allFormIsShown:boolean=false;
  restFormIsOpen:boolean=false

  ngOnInit(): void {
    this.getData()
    this.selectGroup(-1);
  }
  @Output() emitter: EventEmitter<string> = new EventEmitter<string>();
  openExcelForm(event:any){
    this.ExcelFormIsOpen=!this.ExcelFormIsOpen;
  }
  


  openExistingPopUp(){
    this.restFormIsOpen=!this.restFormIsOpen
  }
  closeExistingPopUp(event:any){
    console.log(event);
    this.groupSelected=event
    this.FormulaireService.getFormsByGroups({groups:this.groupSelected}).subscribe((forms:any)=>{
      this.formulaires=[]
      this.getForms(forms)
      this.openExistingPopUp()
    })
    
  }
  opendeleteForm(id:any,name:any){
    this.deleteFormID=id;
    this.deleteFormName=name
    this.todelete=!this.todelete

  }
  openDeleteRep(id:any,name:any,formIndex:any,deleteReponceIndex:any){
    this.deleteFormID=formIndex;
    this.deleteReponceID=Number(id);
    this.deleteReponceIndex=Number(deleteReponceIndex)
    this.deleteReponseName=name;
    this.todeleteRep=!this.todeleteRep;
  }
  openSideGroupForm(){
    this.newGroupNameSide=""
    this.groupFormIsOpenSide=!this.groupFormIsOpenSide
  }

  deleteGroup(index:any){
    
      const  id=this.groups[index].Group_Id

      this.FormulaireService.deleteGroup(id).subscribe((res:any)=>{
          console.log(res);
        
          const indexDel=this.groupSelected.findIndex((e:any)=>e==this.groups[index].Group_Id)
          if(indexDel!=-1){
            this.groupSelected.splice(indexDel,1)
            this.FormulaireService.getFormsByGroups({groups:this.groupSelected}).subscribe((forms:any)=>{
              this.formulaires=[]
              this.getForms(forms)
            })
          }
          if(this.groups.length==1){
            this.selectGroup(-1);
          }
          this.groups.splice(index,1)
        
      })
    
  }

  addGroupSide(){
    if(this.newGroupNameSide!=""){
      const group={
        Group_Name:this.newGroupNameSide
      }
      this.FormulaireService.creatGroup(group).subscribe((newGroup:any)=>{
        console.log(newGroup);
        
        if(newGroup!='error'){
          newGroup['selected']=false;
          newGroup["selectedToForm"]=false;
          this.groups.push(newGroup)
        }
        this.openSideGroupForm()
      })
    }
  }

  deleteServ(index:any){

this.FormulaireService.putServInArchive(this.servsExamples[index].Serv_Id).subscribe((res:any)=>{
  this.servsExamples.splice(index,1)
})
  }
  openServShow(index:any){
    this.servToShow=this.servsExamples[index].Serv_Name
    this.FormulaireService.getUsersofServ(this.servsExamples[index].Serv_Id).subscribe((users:any)=>{
      this.usersOfServToShow=users
      this.servShowIsOpen=!this.servShowIsOpen
      this.servList=!this.servList
    })

  }
  deleteUserShow(index:any){
     let serv=this.servsExamples.find((e:any)=> e.Serv_Name==this.servToShow)
    let deleteRelation={
      User_Id:this.usersOfServToShow[index].U_Id,
      Serv_Id:serv.Serv_Id
    }
    console.log(deleteRelation)
    this.FormulaireService.deleteServUserRelation(deleteRelation).subscribe((res:any)=>{
      this.usersOfServToShow.splice(index,1)
    })
  }
  openUserFormShow(){
    this.usersToAddShow=this.users.filter((e:any)=> this.usersOfServToShow.findIndex((user:any)=>e.U_Id==user.U_Id)==-1)
    this.newUserId=0
    this.userFormShow=!this.userFormShow
  }
  closeUserFormShow(){
    this.usersToAddShow=[]
    this.newUserId=0
    this.userFormShow=!this.userFormShow
  }
  closeServShow(){
    this.servShowIsOpen=!this.servShowIsOpen
      this.servList=!this.servList
      this.servToShow=''
      this.usersOfServToShow=[]
  }
  addUserShow(){
    let serv=this.servsExamples.find((e:any)=> e.Serv_Name==this.servToShow)
    let newRelation={
      User_Id:Number(this.newUserId),
      Serv_Id:serv.Serv_Id
    }
    this.FormulaireService.creatRelationUserServ(newRelation).subscribe((res:any)=>{
      let user=this.users.find((e:any)=> e.U_Id==Number(this.newUserId))
      this.usersOfServToShow.push(user)
      this.closeUserFormShow()
    })
  }


  openServForm(){
    this.usersNewServ.forEach((user:any)=>{
      this.users.push(user)
    })
    this.usersNewServ=[]
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
   
   if(this.creationFormulaire&&!this.ExcelFormIsOpen) this.creatFormIsOpen=!this.creatFormIsOpen
   else if(!this.creationFormulaire&&this.ExcelFormIsOpen)  this.ExcelFormIsOpen=!this.ExcelFormIsOpen
   else this.servList=!this.servList
  }
  addOrRemoveServ(index:any){
    if(this.servsExamples[index].isAdded) {  let serv={
      Formulaire_Id:null,
      Serv_Name:this.servsExamples[index].Serv_Name,
      Serv_User:null,
      Serv_order:0,
      serv_reponse:null,
      Serv_Refer:null
    }
    this.services.push(serv)}
    else {
      let  indexS=this.services.findIndex((e:any)=>e.Serv_Name==this.servsExamples[index].Serv_Name)

      this.services.splice(indexS,1)
    }
  }

  openServList(){
    this.servList=!this.servList
  }
  addServForm(){
    this.openServList()
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
      this.users.push(user)
    })
  })
  serv['isAdded']=false
  this.servsExamples.push(serv)
  this.servToCreate=''


  this.usersNewServ=[]
  if(!this.creationFormulaire&&!this.ExcelFormIsOpen) this.addServForm()
  else if (this.creationFormulaire&&!this.ExcelFormIsOpen) {this.servFormIsOpen=!this.servFormIsOpen
  this.creatFormIsOpen=!this.creatFormIsOpen}
  else if (!this.creationFormulaire&&this.ExcelFormIsOpen){
    this.servFormIsOpen=!this.servFormIsOpen
  this.ExcelFormIsOpen=!this.ExcelFormIsOpen
  }
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
    this.userForm=!this.userForm
    console.log(this.usersNewServ)}
  }

  deleteFormulaire(){
this.FormulaireService.deleteFormulaire(this.deleteFormID).subscribe((res:any)=>{
  let index=this.formulaires.findIndex((e:any)=> e.Formulaire_Id==this.deleteFormID)
  this.formulaires.splice(index,1)
  console.log(res)
  this.deleteFormID=null;
  this.deleteFormName=''
  this.todelete=!this.todelete
})
  }
  putReponseInArchive(id:any,indexF:any,indexR:any){
this.FormulaireService.putReponseInArchive(id).subscribe((res:any)=>{
  this.formulaires[indexF].reponses.splice(indexR,1)
  this.openDeleteRep(null,'',1,-1)
})
  }
  closeForm(){
    this.newFormulaireName=''
    this.newFormulaireStatus=''
    this.services.forEach((serv:any)=>{
      this.servsExamples.push(serv)
    })
    this.servsExamples.forEach((serv:any)=>{
      serv.isAdded=false
    })

    this.services=[]
    this.creationFormulaire=!this.creationFormulaire
    this.creatFormIsOpen=!this.creatFormIsOpen
  }

  open(index:any){
    this.formulaires[index].isOpen=!this.formulaires[index].isOpen;
  }

  openReponseForm(index:any){
    this.formulaires[index].addReponseForm=!this.formulaires[index].addReponseForm

  }
  addNewFormulaire(){
    let newFormulaireName={
      Formulaire_Name:this.newFormulaireName,
      Formulaire_Status:this.newFormulaireStatus
    }
    if (this.newFormulaireStatus=='') newFormulaireName.Formulaire_Status='no description';
console.log(newFormulaireName,this.services,(this.newFormGroups.length!=0))
if(this.services.length!=0){    
      this.FormulaireService.addNewFormulaire(newFormulaireName).subscribe((formulaire:any)=>{
        this.newFormGroups.forEach((group:any)=>{
          const relation={
            Formulaire_Id:formulaire.Formulaire_Id,
            Group_Id:group.Group_Id
          }
          this.FormulaireService.createRelationFormGroup(relation).then((result:any)=>{
            console.log(result);
            
          })
        })
        let newTable={
          Formulaire_Id:formulaire.Formulaire_Id,
          Table_Name:formulaire.Formulaire_Name.replace(/\s/g, '').replaceAll(' ','').replaceAll('(','').replaceAll(')','').replaceAll('-','').replaceAll('"','')+'0',
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


  openFormPage(formulaire:any){
    if(this.isAdmin){
      this.router.navigate(['/formulaire/new/', formulaire,1])
    }
  }

  addNewReponse(Formulaire_Id:any){

   let newReponse={
    Formulaire_Id:Formulaire_Id,
    reponse_Name:this.newReponseName,
    reponse_level:null,
    reponse_status:'new',
    allIn:false
    
   }
   if(this.newReponseType=="allInOne") newReponse.allIn=true;
   this.FormulaireService.creatNewReponce(newReponse).subscribe((res:any)=>{
    let index=this.formulaires.findIndex((e:any)=> e.Formulaire_Id==Formulaire_Id)
    this.formulaires[index].addReponseForm=!this.formulaires[index].addReponseForm
    this.FormulaireService.addFirstRow(res.Reponse_Id).subscribe((added:any)=>{

      this.router.navigate(['/formulaire/reponse/',Formulaire_Id,res.Reponse_Id,0])
    })

   })
  }
  cancelAddNewReponse(index:any){
    this.newReponseName=""
    this.newReponseType=''
    this.formulaires[index].addReponseForm=!this.formulaires[index].addReponseForm
  }
  openReponseFormPage(indexF:any,indexR:any){
    if(this.isAdmin){
    this.router.navigate(['/formulaire/reponse/',this.formulaires[indexF].Formulaire_Id,this.formulaires[indexF].reponses[indexR].Reponse_Id,1])}
  }
  openForm() {
    this.groups.forEach((group:any)=>{
      group['selectedToForm']=false
    })
    this.creationFormulaire=!this.creationFormulaire
this.creatFormIsOpen=!this.creatFormIsOpen

  }
  openServiceForm(){
this.serviceFormIsOpen=!this.serviceFormIsOpen
  }
  openTable(Formulaire_Id:any,Reponse_Id:any){
    this.router.navigate(['/formulaire/table/',Formulaire_Id,Reponse_Id])
  }
  goToCreatServForm(){
    this.creatFormIsOpen=!this.creatFormIsOpen
    this.servFormIsOpen=!this.servFormIsOpen
  }
  goToCreatServExcelForm(event:any){
    this.ExcelFormIsOpen=!this.ExcelFormIsOpen
    this.servFormIsOpen=!this.servFormIsOpen
  }
  selectGroup(index:any){
   
    
if(index!=-1){
  if(this.allFormIsShown){
    this.allFormIsShown=false;
    this.formulaires=[]
  }
  this.groups[index].selected=!this.groups[index].selected
if(this.groups[index].selected){
this.groupSelected.push(this.groups[index].Group_Id)
}
else{

  const indexG=this.groupSelected.findIndex((e:any)=>e==this.groups[index].Group_Id)
  this.groupSelected.splice(indexG,1)
  console.log("cut",indexG,this.groups[index].Group_Id);
  
  
}
console.log(this.groupSelected);

this.FormulaireService.getFormsByGroups({groups:this.groupSelected}).subscribe((forms:any)=>{
  this.formulaires=[]
  this.getForms(forms)
})
}
else{
  this.allFormIsShown=!this.allFormIsShown;
  if(this.allFormIsShown){
    this.groups.forEach((group:any)=>{
      group.selected=false;
      
    })
    this.groupSelected=[]
    this.FormulaireService.getAllFormulaire().subscribe((forms:any)=>{
      this.formulaires=[]
      this.getForms(forms)
    })
  }
}
  }
getData(){

  this.authService.loadUser();
  this.isAdmin=this.authService.isAdmin()
  this.authService.getAllUsers().subscribe((users:any)=>{
    this.users=users
    console.log("u=",this.users)
    this.FormulaireService.getServsExamples().subscribe((res:any)=>{
     console.log(res)
     this.FormulaireService.getGroups().subscribe((groups:any)=>{
      groups.forEach((group:any)=>{
        group['selected']=false;
        group["selectedToForm"]=false
        this.groups.push(group)
      })
     })
     res.forEach((serv:any)=>{
       serv['isAdded']=false
     })
     this.servsExamples=res;})})
}

addOrRemoveGroup(index:any){
  if(this.groups[index].selectedToForm){
    this.newFormGroups.push(this.groups[index])
  }
  else{
    const indexG=this.newFormGroups.findIndex((e:any)=>e.Group_Id==this.groups[index].Group_Id)
    this.newFormGroups.splice(indexG,1)
  }
  console.log(this.newFormGroups);
  
}
openAddNewGroupForm(){
this.newGroupName=""
this.groupFormIsOpen=!this.groupFormIsOpen
}

creatGroup(){
  if(this.newGroupName!=""){
    const group={
      Group_Name:this.newGroupName
    }
    this.FormulaireService.creatGroup(group).subscribe((newGroup:any)=>{
      console.log(newGroup);
      
      if(newGroup!='error'){
        newGroup['selected']=false;
        newGroup["selectedToForm"]=false;
        this.groups.push(newGroup)
      }
      this.openAddNewGroupForm()
    })
  }
}

  getForms(data:any){
      
      
      data.forEach((formulaire:any)=>{
  console.log("000")
  let idUser=0;
  if(!this.isAdmin){
    idUser=this.authService.authenticatedUser.U_Id
  }
        this.FormulaireService.getReponsesByFormulaire(formulaire.Formulaire_Id,idUser).subscribe((reponses:any)=>{

          formulaire['reponses']=[]
          formulaire['isOpen']=false
          formulaire['addReponseForm']=false
            reponses.forEach((reponse:any)=>{
            
              if(reponse.reponse_level!=null)this.FormulaireService.getServices(reponse.reponse_level).subscribe((servise:any)=>{
                
               if(servise.Serv_User!=null) {this.authService.getUserById(servise.Serv_User).subscribe((user:any)=>{
  
                  servise['userName']=user[0].U_FirstName+" "+user[0].U_LastName
                  reponse['currentServ']=servise
  
                  if(formulaire.reponses.findIndex((e:any)=> e.Reponse_Id==reponse.Reponse_Id)==-1) formulaire.reponses.push(reponse)
                })
              }
              else{
                servise['userName']='indéterminée'
                reponse['currentServ']=servise

                if(formulaire.reponses.findIndex((e:any)=> e.Reponse_Id==reponse.Reponse_Id)==-1) formulaire.reponses.push(reponse)
              }

              })
              else reponse['currentUser']=null;
            })
            formulaire['reponses']=reponses
            console.log("reps",reponses);
            
            if((reponses.length!=0)||this.isAdmin){
            this.formulaires.push(formulaire)}
          

          //console.log(this.formulaires)
        
      })
    })
 


    //console.log(this.formulaires)







  }
}
