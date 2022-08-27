import {  Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';
import { AuthService } from 'src/app/services/auth/authservice';
import { CartService } from 'src/app/services/cart/cart.service';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-formulaire-reponse',
  templateUrl: './formulaire-reponse.component.html',
  styleUrls: ['./formulaire-reponse.component.css']
})
export class FormulaireReponseComponent implements OnInit {

  constructor(private CartService: CartService,
    private authService: AuthService,
    private service:SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private FormulaireService:FormulaireService ) { }
  formulaire:any={}
  reponse:any={}
  services:any=[]
  users:any=[]
  reponseStatus:any=''
  isAdmin:boolean=false
  isCreated:boolean=false
  ngOnInit(): void {
    this.getReponse()
  }
  startReponse(){
    if (!this.isCreated) this.creatServs(1)
    if(this.isCreated)this.router.navigate(['/formulaire/table/',this.formulaire.Formulaire_Id,this.reponse.Reponse_Id])
  }
  creatReponse(){
    if (!this.isCreated) this.creatServs(0)
    this.router.navigate(['/formulaire/list/'])
  }
  updateServ(index:any){
    let test=true
    let test_table=this.services.filter((e:any)=> e.Serv_User==this.services[index].Serv_User)
    if(test_table.length!=1) test=false
  if(this.isCreated&&test){
    let servToUpDate={
      Serv_Id:this.services[index].Serv_Id,
      Formulaire_Id:this.services[index].Formulaire_Id,
      Serv_Name:this.services[index].Serv_Name,
      Serv_User:this.services[index].Serv_User,
      Serv_order:this.services[index].Serv_order,
      Serv_Refer:this.services[index].Serv_Refer,
      serv_reponse:this.services[index].serv_reponse,
    }
    this.FormulaireService.updateService(servToUpDate).subscribe((res:any)=>{})
  }
  }
  
  creatServs(testing:any){
    let test=true
    this.services.forEach((serv:any)=>{

      if(serv.Serv_User==null) test=false
    })
    if(test&&(this.reponse.reponse_status!='')){
      let i=0,firstServ: any=null
      this.services.forEach((serv:any)=>{
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
          if(i==this.services.length-1){
           
            this.reponse.reponse_level=firstServ
            console.log(this.reponse)
            this.FormulaireService.updateReponse(this.reponse).subscribe((res:any)=>{
              if(testing==1)this.router.navigate(['/formulaire/table/',this.formulaire.Formulaire_Id,this.reponse.Reponse_Id])
              else this.router.navigate(['/formulaire/list/'])
              console.log(res)
            })
          }
          i++
        })

      })
      


    }
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

       if(res.isCreated==0) this.FormulaireService.workingServices(res.idF).subscribe((servs:any)=>{
          this.services=servs
          this.services.sort((a:any, b:any) => a.Serv_order - b.Serv_order)
            
          this.services.forEach((serv:any)=>{
            this.FormulaireService.getUsersofServ(serv.Serv_Id).subscribe((users:any)=>{
              let user =users.find((e:any)=> e.U_Id==serv.Serv_Id)
              if(user) serv['userName']=user.U_FirstName+' '+user.U_LastName
              else  serv['userName']='indeterminer'
              serv['users']=users

            })
            console.log(this.service)

          })
        
        })
        else if(res.isCreated==1){
          this.isCreated=true
          let reponseToFind={
            reponse:res.idR
          }
          this.FormulaireService.getServicesByReponse(res.idF,reponseToFind).subscribe((servs:any)=>{
            
            this.services=servs
            this.services.sort((a:any, b:any) => a.Serv_order - b.Serv_order)
            
            this.services.forEach((serv:any)=>{
              this.FormulaireService.getUsersofServ(serv.Serv_Id).subscribe((users:any)=>{
                let user =users.find((e:any)=> e.U_Id==serv.Serv_Id)
                if(user) serv['userName']=user.U_FirstName+' '+user.U_LastName
                else  serv['userName']='indeterminer'
                serv['users']=users

              })
              console.log(this.service)

            })

            
          })
        }
          

          


       
        })
      })
    
    })
  }

}
