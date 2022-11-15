import {  Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';
import { AuthService } from 'src/app/services/auth/authservice';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-formulaire-reponse',
  templateUrl: './formulaire-reponse.component.html',
  styleUrls: ['./formulaire-reponse.component.css']
})
export class FormulaireReponseComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private service:SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private FormulaireService:FormulaireService ) { }
  formulaire:any={}
  reponse:any={}
  services:any=[]
  users:any=[]
  etapes:any=[]
  reponseStatus:any=''
  isAdmin:boolean=false
  isCreated:boolean=false
  stopAll:boolean=false
  servsExample:any=[]
  newServName:any=""
  NewServUser:any=""
  openNewServFormIsOpen:any=false
  ngOnInit(): void {
    this.stopAll=false
    this.getReponse()
  }
  startReponse(){
    if (!this.isCreated) this.creatServs(1)
    if(this.isCreated)this.router.navigate(['/formulaire/table/',this.formulaire.Formulaire_Id,this.reponse.Reponse_Id])
  }
  creatReponse(){
    if (!this.isCreated) this.creatServs(0)
    if(this.isCreated) this.router.navigate(['/formulaire/list/'])
  }
  updateServ(index:any){

  if(this.isCreated){
    if(((this.reponse.allIn==false)||(this.reponse.allIn&&(this.uniqueUser(this.services[index].Serv_User))))){
      let servToUpDate={
      Serv_Id:this.services[index].Serv_Id,
      Formulaire_Id:this.services[index].Formulaire_Id,
      Serv_Name:this.services[index].Serv_Name,
      Serv_User:this.services[index].Serv_User,
      Serv_order:this.services[index].Serv_order,
      Serv_Refer:this.services[index].Serv_Refer,
      serv_reponse:this.services[index].serv_reponse,
    }
    this.FormulaireService.updateService(servToUpDate).subscribe((res:any)=>{
      console.log("res=",res)
if(this.reponse.allIn==false){   
     if(servToUpDate.Serv_Id==this.reponse.reponse_level){
        this.FormulaireService.sendMail(this.reponse.Reponse_Id).subscribe((res1:any)=>{
          console.log("res1=",res1)

        })
        let newNotif={
          Msg:'vérifier le formulaire '+this.formulaire.Formulaire_Name+' sur la réponse '+this.reponse.reponse_Name+' car ils attendent vos modifications',
          User_Id:servToUpDate.Serv_User
        }
        this.authService.addNotification(newNotif).subscribe((res2:any)=>{console.log("res2=",res2)})
      }
    }
      else{
        let userToSend={
          user:this.services[index].Serv_User
        }
        this.FormulaireService.sendOneMail(this.reponse.Reponse_Id,userToSend).subscribe((res:any)=>{})
        let newNotif={
          Msg:'vérifier le formulaire '+this.formulaire.Formulaire_Name+' sur la réponse '+this.reponse.reponse_Name+' car ils attendent vos modifications',
          User_Id:this.services[index].Serv_User
        }
        this.authService.addNotification(newNotif).subscribe((res2:any)=>{console.log("res2=",res2)}) 
      }
    })
  }
  else{
    alert("user already exist in the workflow!")
  }}
  }

  uniqueUser(user_Id:any):boolean{
    let count=0;
    for (let i = 0; i < this.services.length; i++) {
      if(this.services[i].Serv_User==user_Id) count+=1;
      if(count>1) return false;
    }
    if(count>1) return false
    else return true
  }


  creation(services:any,testing:any){
    let test=true
    services.forEach((serv:any)=>{

      if((serv.Serv_User==null)||((this.uniqueUser(serv.Serv_User)==false)&&this.reponse.allIn)) test=false
    })
    console.log('test',test)
    if(test&&(this.reponse.reponse_status!='')){
      let i=0,firstServ: any=null
      services.forEach((serv:any)=>{
        let newServ={
          Formulaire_Id:serv.Formulaire_Id,
          Serv_Name:serv.Serv_Name,
          Serv_User:Number(serv.Serv_User),
          Serv_order:serv.Serv_order,
          Serv_Refer:serv.Serv_Id,
          serv_reponse:this.reponse.Reponse_Id
        } 
          this.FormulaireService.creatNewService(newServ).subscribe((res:any)=>{
          console.log(res)
          if(res.Serv_order==1) firstServ=res.Serv_Id
          if(i==services.length-1){
           
            this.reponse.reponse_level=firstServ
            console.log(this.reponse)
            this.FormulaireService.updateReponse(this.reponse).subscribe((res1:any)=>{
              this.FormulaireService.sendMail(this.reponse.Reponse_Id).subscribe((res2:any)=>{
                console.log("mail=",res2)
            })
              if(this.reponse.reponse_level!=null){
                let servFound=services.find((e:any)=>e.Serv_Id==firstServ)
                 if(!this.reponse.allIn){ 
                  let newNotif={
                  Msg:'vérifier le formulaire '+this.formulaire.Formulaire_Name+' sur la réponse '+this.reponse.reponse_Name+' car ils attendent vos modifications',
                  User_Id:Number(servFound.Serv_User)
                }

                this.authService.addNotification(newNotif).subscribe((res3:any)=>{console.log(res3)})
              }
              else{
                services.forEach((level:any)=>{
                  let newNotif={
                    Msg:'vérifier le formulaire '+this.formulaire.Formulaire_Name+' sur la réponse '+this.reponse.reponse_Name+' car ils attendent vos modifications',
                    User_Id:Number(level.Serv_User)
                  }
                  this.authService.addNotification(newNotif).subscribe((res3:any)=>{console.log(res3)})
                })
              }
                }

              console.log(res)
            })
          }
          i++
        })
        
        this.stopAll=true
        if(testing==1)this.router.navigate(['/formulaire/table/',this.formulaire.Formulaire_Id,this.reponse.Reponse_Id])
        else this.router.navigate(['/formulaire/list/'])
      })
      


    }
  }
  
  creatServs(testing:any){
    if(this.reponse.allIn){
      this.creation(this.services,testing)
    }
    else{
      this.creation(this.etapes,testing)
    }
  }
getUsers(){
  console.log(this.newServName);
  
if(this.newServName!=""){
let serv=this.servsExample.find((e:any)=>e.Serv_Name==this.newServName)
console.log(serv);

return serv.users
}
else return []
}

openNewServForm(){
  this.openNewServFormIsOpen=!this.openNewServFormIsOpen
}
closeNewServForm(){
  this.openNewServFormIsOpen=!this.openNewServFormIsOpen
  this.newServName="";
  this.NewServUser="";
}

addNewEtape(){
  if((this.newServName!="")&&(this.NewServUser!="")){
  let serv=this.services.find((e:any)=>e.Serv_Name==this.newServName)
  serv.Serv_order=this.etapes.length+1;
  serv.Serv_User=Number(this.NewServUser)
  this.etapes.push(serv)
  console.log(this.etapes);
  if(this.isCreated){
    let newServ={
      Formulaire_Id:serv.Formulaire_Id,
      Serv_Name:serv.Serv_Name,
      Serv_User:Number(serv.Serv_User),
      Serv_order:serv.Serv_order,
      Serv_Refer:serv.Serv_Id,
      serv_reponse:this.reponse.Reponse_Id
    } 
      this.FormulaireService.creatNewService(newServ).subscribe((res:any)=>{
      console.log(res)

      
    })
  }
  this.closeNewServForm()}
}

  organizeServs(servs:any){
    servs.sort((a:any, b:any) => a.Serv_order - b.Serv_order)
    servs.forEach((serv:any)=>{
      this.FormulaireService.getUsersofServ(serv.Serv_Id).subscribe((users:any)=>{
        let user =users.find((e:any)=> e.U_Id==serv.Serv_Id)
        if(user) serv['userName']=user.U_FirstName+' '+user.U_LastName
        else  serv['userName']='indeterminer'
        serv['users']=users

      })
      console.log(this.service)

    })
    
  }
  
  getReponse(){
    this.authService.loadUser();
    let userId = this.authService.authenticatedUser.U_Id;
  this.isAdmin=this.authService.isAdmin()
    console.log('user=',this.authService.isAdmin());
    this.route.params.subscribe((res:any)=>{
      this.FormulaireService.getFormulaireById(res.idF).subscribe((formulaire:any)=>{
        this.FormulaireService.getReponseById(res.idR).subscribe((reponse:any)=>{
        this.formulaire=formulaire
        this.reponse=reponse
   console.log(reponse);
   
       if(res.isCreated==0) this.FormulaireService.workingServices(res.idF).subscribe((servs:any)=>{
          this.services=servs
            console.log(servs);
          this.servsExample=servs
          this.organizeServs(this.services)
          this.organizeServs(this.servsExample)
        
        })
        else if(res.isCreated==1){
          this.isCreated=true
          let reponseToFind={
            reponse:res.idR
          }
          this.FormulaireService.getServicesByReponse(res.idF,reponseToFind).subscribe((servs:any)=>{
            

            this.FormulaireService.workingServices(res.idF).subscribe((servs1:any)=>{
              this.services=servs
              this.etapes=servs
              console.log(servs1);
              this.servsExample=servs1
              this.organizeServs(this.services)
          this.organizeServs(this.servsExample)
            
            })
            
           
 

            
          })
        }
          

          


       
        })
      })
    
    })
  }

}
