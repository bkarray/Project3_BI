import {  Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';
import { AuthService } from 'src/app/services/auth/authservice';
import { CartService } from 'src/app/services/cart/cart.service';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {FlatTreeControl} from '@angular/cdk/tree';

import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';


@Component({
  selector: 'app-formulaire-table',
  templateUrl: './formulaire-table.component.html',
  styleUrls: ['./formulaire-table.component.css']
})
export class FormulaireTableComponent implements OnInit {
  [x: string]: any;

  constructor(private CartService: CartService,
    private authService: AuthService,
    private service:SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private FormulaireService:FormulaireService ) { }
   formulair:any={}
   fields:any=[]
   data:any=[]
   reponse:any={}
   servs:any=[]
   isWorking:boolean=false
   isInclude:boolean=false
   userId:any=null
  ngOnInit(): void {
    this.getData()
 

  }





  
  





getInferData(table:any,data:any):any{

  if (table) { 
    data.forEach((lig:any)=>{
      let val={
        table:table.Table_Name.toLowerCase(),
        sup_id:lig.id
      }
      this.FormulaireService.getInfoSup(val).subscribe((infoInf:any)=>{
        lig['infoInfer']=infoInf
        let newTab=this.reponse.tables.find((e:any)=> e.Table_level==table.Table_level+1)
        
        this.getInferData(newTab,lig['infoInfer'])
      })
      })
  }

}

getServs(){
  this.route.params.subscribe((res:any)=>{
    let reponseToSearch={
      reponse:this.reponse.Reponse_Id
    } 
    
    this.FormulaireService.getServicesByReponse(res.idF,reponseToSearch).subscribe((servs:any)=>{
      servs.forEach((serv:any)=>{
        if(this.userId==serv.Serv_User) this.isInclude=true
        if((this.userId==serv.Serv_User)&&(this.reponse.reponse_level==serv.Serv_Id)) this.isWorking=true
        this.authService.getUserById(serv.Serv_User).subscribe((user:any)=>{

          serv['userName']=user[0].U_FirstName+" "+user[0].U_LastName
        })
      })
      console.log(servs)
      this.servs=servs
    })
  })
}


getData(){
  this.authService.loadUser();
   this.userId = this.authService.authenticatedUser.U_Id;
this.route.params.subscribe((res:any)=>{
  console.log(res)
this.FormulaireService.getReponseById(res.idR).subscribe((reponse:any)=>{
  if(this.isInclude){
    let servTofind=reponse.reponse_level
    if(servTofind==null) servTofind=0
    this.FormulaireService.getServices(reponse.reponse_level).subscribe((serv:any)=>{
      let reponseToSearch={
        reponse:null
      }
      this.FormulaireService.getServicesByReponse(res.idF,reponseToSearch).subscribe((servs:any)=>{
        
        let servFound:any
        if(serv!={}){servFound=servs.find((e:any)=> e.Serv_Name==serv.Serv_Name)}
        else {servFound=servs.find((e:any)=> e.Serv_User==this.userId)}
  
        this.FormulaireService.getFields(servFound.Serv_Id).subscribe((fields:any)=>{
          this.FormulaireService.getTables(res.idF).subscribe((tables:any)=>{
            reponse['tables']=tables
            reponse['tables'].forEach((tab:any)=>{
            tab['fields']=fields.filter((e:any)=> e.Table_Id==tab.Table_Id)
            })
  
           this.reponse=reponse
           this.reponse.tables.forEach((tab:any)=>{
            tab.fields.forEach((field:any)=>{
              this.fields.push(field)
            })
           })
            let table0={
              table:reponse.tables[0].Table_Name.toLowerCase(),
              Reponse_Id:reponse.Reponse_Id
            }
            this.FormulaireService.getAllInformation(table0).subscribe((data:any)=>{
     
              //console.log(this.data)
              this.getInferData(reponse.tables[1],data)
              this.data=data
              this.getServs()
               console.log(this.data)  
            })
            
          
            
          })
              })
      })
  
    })
  }
  else{
      let reponseToSearch={
        reponse:null
      }
      this.FormulaireService.getServicesByReponse(res.idF,reponseToSearch).subscribe((servs:any)=>{
        
   
        
        
          this.FormulaireService.getTables(res.idF).subscribe((tables:any)=>{
            reponse['tables']=tables
            reponse['tables'].forEach((tab:any)=>{
              tab['fields']=[]
              this.FormulaireService.getAllFields(tab.Table_Id).subscribe((fields:any)=>{
                tab['this.fields']=fields
              })
            })
  
           this.reponse=reponse
           this.reponse.tables.forEach((tab:any)=>{
            tab.fields.forEach((field:any)=>{
              this.fields.push(field)
            })
           })
            let table0={
              table:reponse.tables[0].Table_Name.toLowerCase(),
              Reponse_Id:reponse.Reponse_Id
            }
            this.FormulaireService.getAllInformation(table0).subscribe((data:any)=>{
     
              //console.log(this.data)
              this.getInferData(reponse.tables[1],data)
              this.data=data
              this.getServs()
               console.log(this.data)  
            })
            
          
            
          })
             
      })
  
    
  }
  

})
})

}

}
