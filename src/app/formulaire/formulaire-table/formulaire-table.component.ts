import {  Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';
import { AuthService } from 'src/app/services/auth/authservice';
import { CartService } from 'src/app/services/cart/cart.service';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NestedTreeControl} from '@angular/cdk/tree';
import { MatTreeNestedDataSource} from '@angular/material/tree';

;


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
   reponseIsOnWork:boolean=false
   etapNum:any=0
   userId:any=null
   newRow:any={}
   formIsOpen:boolean=false
   startNew:boolean=false
  ngOnInit(): void {
    this.getData()

    

  }


  returnList(){
    this.router.navigate(['/formulaire/list/'])
  }

  nextServ(){
   let nextServ: any=null
  
   if(this.etapNum+1>this.servs.length) {
    nextServ=null
   }
   else{
    let serv=this.servs.find((e:any)=>e.Serv_order==this.etapNum+1)
    nextServ=serv.Serv_Id
    
   }
   let newLevel={
    Serv_Id:nextServ
   }
   this.FormulaireService.updateReponseEtap(this.reponse.Reponse_Id,newLevel).subscribe((res:any)=>{
    this.FormulaireService.sendMail(this.reponse.Reponse_Id).subscribe((res2:any)=>{
      console.log(newLevel.Serv_Id)
      if(newLevel.Serv_Id!=null){
        let serv=this.servs.find((e:any)=>e.Serv_Id==newLevel.Serv_Id)
        console.log(serv)
        let newNotif={
        Msg:'vérifier le formulaire '+this.formulair.Formulaire_Name+' sur la réponse '+this.reponse.reponse_Name+' car ils attendent vos modifications',
        User_Id:serv.Serv_User
      }
      this.authService.addNotification(newNotif).subscribe((res3:any)=>{})}
      
      this.formulair={}
      this.reponse={}
  
      this.fields=[]
      this.data=[]
  
      this.servs=[]
      this.isWorking=false
      this.reponseIsOnWork=false
      this.etapNum=0
      this.userId=null
      this.newRow={}
      this.formIsOpen=false
      this.startNew=false
      this.ngOnInit()
      window.location.reload;
    })

   })
  }


  fieldVal(node:any,name:string){
   // console.log(node)
    if(node['node'][name]) return node['node'][name]
    else if(name.substring(0, 4)=='ID_'+node.level) return node['node']['id']
    else return ''
  }
  inRow(name:any,level:any):boolean{
    let table=this.reponse.tables.find((e:any)=> e.Table_level==level)
    //console.log(table,name,table.fields.findIndex((e:any)=> e.Name==name))
    if(table.fields.findIndex((e:any)=> e.Name==name)==-1) return false
    else return true
  }

  changeInField(tableId:any,Name:any,val:any,Id:any){
    //console.log(val)
    if (val==null) val=0
    let newChange={
      Table_Id:tableId,
      Name:Name,
      Value:val,
      id:Id
    }
    if(Name=='date') newChange.Value=newChange.Value.toString()
    this.FormulaireService.upDateFieldVal(newChange).subscribe((res:any)=>{
      
    })
  }

  initVal(type:any):any{
    switch(type){
      case 'character varying(255)': return '';break;
      case 'date': return '';break;
      case 'boolean' :return false;break;
      case 'integer':return 0;break;
      case 'real':return 0;break;
      default :return null

    }
  }
  openAddForm(node:any){
if(!this.formIsOpen){    
    this.newRow={}
    let table=this.reponse.tables.find((e:any)=> e.Table_level==node.level)
    table.fields.forEach((field:any)=>{
      if(field.Name.substring(0, 4)!='ID_'+node.level)this.newRow[field.Name]=this.initVal(field.Type)
    })
    node.node.openForm=!node.node.openForm
    this.formIsOpen=true
    console.log(this.newRow)}
  }
  addNewRow(node:any){
    let table=this.reponse.tables.find((e:any)=> e.Table_level==node.level)
    let val:any={}
    val['Table_Id']=table.Table_Id
    val['row']=[]
    table.fields.forEach((field:any)=>{
      if(field.Name.substring(0, 4)!='ID_'+node.level) {
        let newVAl={
          Name:field.Name,
          Value:this.newRow[field.Name]
        }
        if(newVAl.Value!='') { val['row'].push(newVAl)}
      }
    })
    val['row'].push({
      Name:'reponse_id',
      Value:this.reponse.Reponse_Id
    })
    if(node.level!=0){
      
      val['row'].push({
        Name:'sup_id',
        Value:node.parent.id
      }) 
    }


    this.FormulaireService.addNewRow(val).subscribe((res:any)=>{
    node.node.openForm=!node.node.openForm
this.getInfo()
    this.newRow={}
    this.formIsOpen=false
    console.log(val)
    })
  
  }
  addFirstRow(){
    let table=this.reponse.tables.find((e:any)=> e.Table_level==0)
    let val:any={}
    val['Table_Id']=table.Table_Id
    val['row']=[]
    table.fields.forEach((field:any)=>{
      if(field.Name.substring(0, 4)!='ID_0') {
        let newVAl={
          Name:field.Name,
          Value:this.newRow[field.Name]
        }
        if(newVAl.Value!='')  val['row'].push(newVAl)
      }
    })
    val['row'].push({
      Name:'reponse_id',
      Value:this.reponse.Reponse_Id
    })



    this.FormulaireService.addNewRow(val).subscribe((res:any)=>{
    this.getInfo()
    this.newRow={}
    this.startNew=false
    })
  }


  addNewRelationForm(node:any){
    if(!this.formIsOpen){    
    this.newRow={}
    let table=this.reponse.tables.find((e:any)=> e.Table_level==node.level+1)
    console.log(table)
    table.fields.forEach((field:any)=>{
      let level=node.level+1
      if(field.Name.substring(0, 4)!='ID_'+level)this.newRow[field.Name]=this.initVal(field.Type)
    })
    node.node.childrenForm=!node.node.childrenForm
    this.formIsOpen=true
    console.log(this.newRow)}
  }

  addNewRelation(node:any){
    let table=this.reponse.tables.find((e:any)=> e.Table_level==node.level+1)
    let val:any={}
    val['Table_Id']=table.Table_Id
    val['row']=[]
    table.fields.forEach((field:any)=>{
      let level=node.level+1
      if(field.Name.substring(0, 4)!='ID_'+level) {
        let newVAl={
          Name:field.Name,
          Value:this.newRow[field.Name]
        }
        if(newVAl.Value!='')  val['row'].push(newVAl)
      }
    })
    val['row'].push({
      Name:'reponse_id',
      Value:this.reponse.Reponse_Id
    })
    if(node.level+1!=0){
      
      val['row'].push({
        Name:'sup_id',
        Value:node.node.id
      }) 
    }


    this.FormulaireService.addNewRow(val).subscribe((res:any)=>{
    node.node.openForm=!node.node.openForm
this.getInfo()
    this.newRow={}
    this.formIsOpen=false
    console.log(val)
    })
  
  }
  




  spaceTable(level:number):any{
   if(level<this.reponse.tables.length) {  
    if(level==0) return 0
    else {
      let tab=this.reponse.tables.find((e:any)=> e.Table_level==level-1)
      return tab.fields.length
      
    }}
    else return -1

  }







  
  





getInferData(table:any,data:any):any{

  if (data.length!=0) { 
    data.forEach((lig:any,index:number)=>{
       if(table){let val={
        table:table.Table_Name.toLowerCase(),
        sup_id:lig.id
      }
      this.FormulaireService.getInfoSup(val).subscribe((infoInf:any)=>{
        lig['last']=false
        if(index==data.length-1) lig['last']=true
        lig['children']=infoInf
        lig['openForm']=false
        lig['childrenForm']=false
        let newTab=this.reponse.tables.find((e:any)=> e.Table_level==table.Table_level+1)
        
        this.getInferData(newTab,lig['children'])
      })}
      else{
        lig['childrenForm']=false
        lig['last']=false
        lig['openForm']=false
        if(index==data.length-1) lig['last']=true
        lig['children']=[]
      }
      })
  }

}


getInfo(){
  this.data=[]
  let table0={
    table:this.reponse.tables[0].Table_Name.replaceAll(' ','_').replaceAll(';','_').toLowerCase(),
    Reponse_Id:this.reponse.Reponse_Id
  }
  this.FormulaireService.getAllInformation(table0).subscribe((data:any)=>{
     
    //console.log(this.data)
    
    this.getInferData(this.reponse.tables[1],data)
    this.data=data
    if(data.length==0){
      this.startNew=true
      this.newRow={}
      let table=this.reponse.tables.find((e:any)=> e.Table_level==0)
      console.log(table)
      table.fields.forEach((field:any)=>{
        if(field.Name.substring(0, 4)!='ID_0')this.newRow[field.Name]=this.initVal(field.Type)
      })
    }
    

     console.log(this.data,this.fields)  
  })
}


getData(){
  this.authService.loadUser();
   this.userId = this.authService.authenticatedUser.U_Id;
this.route.params.subscribe((res:any)=>{

 
  console.log(res)
this.FormulaireService.getReponseById(res.idR).subscribe((reponse:any)=>{
    let servTofind=reponse.reponse_level
    if(servTofind==null) servTofind=0
      let reponseToSearch={
        reponse:Number(res.idR)
      }
      console.log("2",reponseToSearch)
      this.FormulaireService.getServicesByReponse(res.idF,reponseToSearch).subscribe((servs:any)=>{
        servs.forEach((serv:any)=>{
        if(serv.Serv_User!=null)  {this.authService.getUserById(serv.Serv_User).subscribe((user:any)=>{
  
            serv['userName']=user[0].U_FirstName+" "+user[0].U_LastName
          })}
          else {
            serv['userName']="indéterminée"
          }
        })
        this.servs=servs
        
        let servFound:any
       if(servTofind!=0) {servFound=servs.find((e:any)=> e.Serv_Id==servTofind)
        console.log(servFound.Serv_User,this.userId)
      if(servFound.Serv_User==this.userId) this.isWorking=true;
      this.etapNum=servFound.Serv_order
    this.reponseIsOnWork=true
  }
       else{
        servFound=servs[0]
       }
       
  
        this.FormulaireService.getFields(servFound.Serv_Refer).subscribe((fields:any)=>{
          this.FormulaireService.getTables(res.idF).subscribe((tables:any)=>{
            reponse['tables']=tables
            reponse['tables'].forEach((tab:any)=>{
              if(!this.isWorking){
                fields.forEach((field:any)=>{
                  field.Status='consulté'
                })
              }
            tab['fields']=fields.filter((e:any)=> (e.Table_Id==tab.Table_Id)&&(e.Status!='invisible'))
            tab['fields'].splice(0,0,{
              Name:'ID_'+tab.Table_level,
              Status:'consulté'
            })
            })
  
           this.reponse=reponse
           this.reponse.tables.forEach((tab:any)=>{
            tab.fields.forEach((field:any)=>{
              if(field.choises!=null) field['choisesList']=field.choises.split(";")
              this.fields.push(field)
            })
           })
           console.log(this.fields,this.servs)
           this.getInfo()
           
            
          
            
          })
              })
      })
  
    
  
  

 })
 })
 console.log('w=',this.isWorking)

 }

}


