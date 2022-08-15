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
  ngOnInit(): void {
    this.getReponse()
  }
  startReponse(){
    this.creatServs()
    this.router.navigate(['/formulaire/table/',this.formulaire.Formulaire_Id,this.reponse.Reponse_Id])
  }
  creatReponse(){
    this.creatServs()
    this.router.navigate(['/formulaire/list/'])
  }
  
  creatServs(){
    let test=true
    this.services.forEach((serv:any)=>{
      let test_table=this.services.filter((e:any)=> e.Serv_User==serv.Serv_User)
      if(test_table.length!=1) test=false
    })
    if(test&&(this.reponseStatus!='')){
      let i=0,firstServ: any=null
      this.services.forEach((serv:any)=>{
        serv.Serv_User=Number(serv.Serv_User)
       
        this.FormulaireService.creatNewService(serv).subscribe((res:any)=>{
          console.log(res)
          if(res.Serv_order==1) firstServ=res.Serv_Id
          if(i==this.services.length-1){
           
            this.reponse.reponse_level=firstServ
            this.reponse.reponse_status=this.reponseStatus
            console.log(this.reponse)
            this.FormulaireService.updateReponse(this.reponse).subscribe((res:any)=>{})
          }
          i++
        })

      })
      


    }
  }
  getReponse(){
    this.authService.loadUser();
    let userId = this.authService.authenticatedUser.U_Id;
 
    console.log('user=',this.authService.isAdmin());
    this.route.params.subscribe((res:any)=>{
      this.FormulaireService.getFormulaireById(res.idF).subscribe((formulaire:any)=>{
        this.FormulaireService.getReponseById(res.idR).subscribe((reponse:any)=>{
        this.formulaire=formulaire
        this.reponse=reponse

        let reponseToSearch={
          reponse:null
        }
        this.FormulaireService.getServicesByReponse(res.idF,reponseToSearch).subscribe((servs:any)=>{
          servs.forEach((serv:any)=> {
            let newServ={
              Formulaire_Id:serv.Formulaire_Id,
              Serv_Name:serv.Serv_Name,
              Serv_User:serv.Serv_User,
              Serv_order:serv.Serv_order,
              serv_reponse:res.idR
            }
            this.services.push(newServ)
          });
          this.service=servs
          this.authService.getAllUsers().subscribe((users:any)=>{
            this.services.sort((a:any, b:any) => a.Serv_order - b.Serv_order)
            this.users=users
          })

        })
        })
      })
    })

  }

}
