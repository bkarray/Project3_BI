import {  Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';
import { AuthService } from 'src/app/services/auth/authservice';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ResizedEvent } from 'angular-resize-event';

@Component({
  selector: 'app-one-line',
  templateUrl: './one-line.component.html',
  styleUrls: ['./one-line.component.css']
})
export class OneLineComponent implements OnInit {
  

  constructor(
    private authService: AuthService,
    private service:SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private FormulaireService:FormulaireService) { }
    socket: any;
    data:any=[]
    reponse:any={}
    startNew:boolean=false
    newRow:any={}
    fields:any=[]
    userId:any=0
    isWorking:boolean=false
    etapNum:any=0;
    reponseIsOnWork:boolean=false
    servs:any=[]
    address:any;
    toShow:any={}
    width: number | undefined;
  height: number | undefined;

  ngOnInit(): void {


    this.getData()
    
  }


  onResized(event: ResizedEvent): void {
  }


 






  webSocket(info:any,id:any,FormulaireServ:FormulaireService,getInfo:Function,id_user:any){
    var url ='ws://localhost:8000/ws/new/'
    this.socket=new WebSocket(url)



    function keepUpdate(FormulaireServ:FormulaireService,data:any,level:number,change:any){
    
      if(change&&(level==change.table_level)){
        
        let index=data?.findIndex((e:any)=> e.id==change.ligen_id);
        if((index!=-1)&&(id==change.reponse_id)&&!change.is_seen&&(change.chagementType=='edit')&&(change.user!=id_user)){
          if(change.type=='boolean'){
            if(change.newValue=='False') change.newValue=false
            else if (change.newValue=='True') change.newValue=true
          }
         data[index][change.fieldchanged]=change.newValue
         if(change&&change.id) FormulaireServ.deleteUpdate(change.id).subscribe((res:any)=>{})
        }
      }
      else { 
        if(data){
          data.forEach((lig:any)=>{
            
            keepUpdate(FormulaireServ,lig.children,level+1,change)
          })
        }}
      }



    this.socket.onopen=function(e:any){
    
      console.log('socket connected')
    }
    this.socket.onmessage=function(e:any){
      let data=JSON.parse(e.data)
      if(data&&data.payload&&(data.payload.chagementType=='edit')) keepUpdate(FormulaireServ,info,0,data.payload)
      else if(data&&data.payload&&(data.payload.chagementType=='add')){
        if(data.payload&&data.payload.id) FormulaireServ.deleteUpdate(data.payload.id).subscribe((res:any)=>{})
        }
      
    }
    this.socket.onclose=function(e:any){
      alert('socket disconnected')
    }
  }


  changeInField(name:any){
    
    
    
    let field=this.fields.find((e:any)=> e.Name==name)
    let tab=this.reponse.tables.find((e:any)=>e.Table_Id==field.Table_Id)
    let val=this.toShow[name]
    let id='ID_'+tab.Table_level
    console.log(tab);
    if (val==null) val=0
    let newChange={
      Table_Id:tab.Table_Id,
      Name:name,
      Value:val,
      id:this.toShow[id]
    }
    if(name=='date') newChange.Value=newChange.Value.toString()
    this.FormulaireService.upDateFieldVal(newChange).subscribe((res:any)=>{
     

      let newUpdate={
        user:this.authService.authenticatedUser.U_Id,
        reponse_id:this.reponse.Reponse_Id,
        ligen_id:this.toShow[id],
        chagementType:'edit',
        table_level:tab.Table_Id,
        fieldchanged:field.Field_Id,
        newValue:val,
        is_seen:false
      }
      console.log("newup",newUpdate)
     this.FormulaireService.addNewUpdate(newUpdate).subscribe((res:any)=>{console.log(res)})
    })
  }



  getInferData(table:any,data:any,level:any){

    if (data.length!=0) { 
      data.forEach((lig:any,index:number)=>{
         if(table){
          let val={
          table:table.Table_Name.toLowerCase(),
          sup_id:lig.id}
         this.FormulaireService.getInfoSup(val).subscribe((infoInf:any)=>{
          lig['children']=infoInf
          lig['level']=level;
          lig['isClicked']=false
          let newTab=this.reponse.tables.find((e:any)=> e.Table_level==table.Table_level+1)
          if(lig.id==Number(this.address[level])){
            this.reponse.tables[level].fields.forEach((field:any)=>{
              if(field.Name.substring(0, 3)=='ID_') this.toShow[field.Name]=lig['id']
              else this.toShow[field.Name]=lig[field.Name]
            })
          }
          this.getInferData(newTab,lig['children'],level+1)
        })}
        else{
          lig['level']=level;
          lig['children']=[]
          lig['isClicked']=false
          if(lig.id==Number(this.address[level])){
            this.reponse.tables[level].fields.forEach((field:any)=>{
              if(field.Name.substring(0, 3)=='ID_') this.toShow[field.Name]=lig['id']
            else this.toShow[field.Name]=lig[field.Name]
            })
          }
        }
        })
    }
  
  }
  async getInfo(){
    this.data=[]
    let table0={
      table:this.reponse.tables[0].Table_Name.replaceAll(' ','_').replaceAll(';','_').toLowerCase(),
      Reponse_Id:this.reponse.Reponse_Id
    }
    this.FormulaireService.getAllInformation(table0).subscribe(async (data:any)=>{
       
      //console.log(this.data)

      
     this.getInferData(this.reponse.tables[1],data,0)
     console.log("aaa",this.toShow,this.data);
     
    
      
      
      this.data=data
      console.log(this.data);
      if(data.length==0){
        this.startNew=true
        this.newRow={}
        let table=this.reponse.tables.find((e:any)=> e.Table_level==0)

        table.fields.forEach((field:any)=>{
          if(field.Name.substring(0, 4)!='ID_0')this.newRow[field.Name]=this.initVal(field.Type)
        })
      }
  
  
  
   
       this.webSocket(this.data,this.reponse.Reponse_Id,this.FormulaireService,this.getInfo,this.authService.authenticatedUser.U_Id)
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


  async configurationStepByStep(reponse:any,res:any){
    let servTofind=reponse.reponse_level
      if(servTofind==null) servTofind=0
        let reponseToSearch={
          reponse:Number(res.idR)
        }

        this.FormulaireService.getServicesByReponse(res.idF,reponseToSearch).subscribe((servs:any)=>{
          this.organizationServs(servs)
          
          let servFound:any
         if(servTofind!=0) {servFound=servs.find((e:any)=> e.Serv_Id==servTofind)

        if(servFound.Serv_User==this.userId) this.isWorking=true;
        this.etapNum=servFound.Serv_order
      this.reponseIsOnWork=true
    }
         else{
          servFound=servs[0]
         }
         
    
          this.FormulaireService.getFields(servFound.Serv_Refer).subscribe((fields:any)=>{
            this.FormulaireService.getTables(res.idF).subscribe(async (tables:any)=>{
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
              this.FormulaireService.getLastUpdate(reponse.Reponse_Id).subscribe((res:any)=>{
                console.log(res)
              })
             this.reponse=reponse
             
             this.reponse.tables.forEach((tab:any)=>{
              tab.fields.forEach((field:any)=>{
                if(field.Type=='list') {
                  this.FormulaireService.getChoices(field.Field_Id).subscribe((choices:any)=>{
                    field['choisesList']=choices
                  })
                  }
                this.fields.push(field)
              })
              console.log("rep",this.reponse);
             })
             
             await this.getInfo()
             
              
            
              
            })
                })
        })
    
  }
  
  organizationServs(servs:any){
    servs.forEach((serv:any)=>{
      if(serv.Serv_User!=null)  {this.authService.getUserById(serv.Serv_User).subscribe((user:any)=>{
  
          serv['userName']=user[0].U_FirstName+" "+user[0].U_LastName
        })}
        else {
          serv['userName']="indéterminée"
        }
      })
      this.servs=servs
  }
  
  async configurationAllIn(reponse:any,res:any){
    let reponseToSearch={
      reponse:Number(res.idR)
    }
    if(reponse.reponse_level!=null) this.reponseIsOnWork=true
  this.FormulaireService.getServicesByReponse(res.idF,reponseToSearch).subscribe((servs:any)=>{
  this.organizationServs(servs)
  let servToShow:any
  if(this.authService.authenticatedUser){
    servToShow=this.servs.find((e:any)=> e.Serv_User==this.authService.authenticatedUser.U_Id)
    if(servToShow) {
      this.isWorking=true 
    }
    else{
      
      servToShow=servs[0]
      
    }
  
  }
  else{
    servToShow=servs[0]
  }
  
  this.FormulaireService.getFields(servToShow.Serv_Refer).subscribe((fields:any)=>{
    this.FormulaireService.getTables(res.idF).subscribe(async (tables:any)=>{
      reponse['tables']=tables
      reponse['tables'].forEach((tab:any)=>{
        if(!this.reponseIsOnWork||!this.isWorking){
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
      this.FormulaireService.getLastUpdate(reponse.Reponse_Id).subscribe((res:any)=>{
        console.log(res)
      })
     this.reponse=reponse
     this.reponse.tables.forEach((tab:any)=>{
      tab.fields.forEach((field:any)=>{
        if(field.Type=='list') {
          this.FormulaireService.getChoices(field.Field_Id).subscribe((choices:any)=>{
            field['choisesList']=choices
          })
          }
  
        this.fields.push(field)
      })

     })
     console.log("rep",this.reponse);
     await this.getInfo()
     
      
    
      
    })
        })
  
  })
  }


  fieldValLig(name:any){
    if(this.toShow!==undefined){
      if(this.toShow[name]) {return this.toShow[name]}
    else return '';}
  }
  inRow(index:any,name:any){
    
    
    let tabel=this.reponse.tables.find((e:any)=>e.Table_level==index)
    
    if(tabel&&(tabel.fields.findIndex((e:any)=>e.Name==name)!=-1)) return true
    else return false
  }


  getData(){
    this.authService.loadUser();
     this.userId = this.authService.authenticatedUser.U_Id;
  this.route.params.subscribe((res:any)=>{
  
   
    console.log(res)
  this.FormulaireService.getReponseById(res.idR).subscribe((reponse:any)=>{
     this.address=res.address.split(':')
     console.log("show",this.address);
    if(!reponse.allIn) this.configurationStepByStep(reponse,res)
    else this.configurationAllIn(reponse,res)
    console.log(this.data);
    
  
   })
   })
   console.log('w=',this.isWorking)
  
   }
}
