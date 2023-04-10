import {  Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';
import { AuthService } from 'src/app/services/auth/authservice';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Params, Router } from '@angular/router';



@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {


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
    toShow:any=[]
    idLine:any=0;
    levelsAddLine:any=[];
    formIsOpen:boolean=false;

  ngOnInit(): void {
    this.getData()
    console.log("show",this.toShow);
    
  }

addNewRowForm(index:any){
  if(!this.formIsOpen){    
    this.newRow={}
    let table=this.reponse.tables.find((e:any)=> e.Table_level==index)
    table.fields.forEach((field:any)=>{
      if(field.Name.substring(0, 3)!='ID_')this.newRow[field.Name]=this.initVal(field.Type)
    })

    this.levelsAddLine[index].formIsOpen=!this.levelsAddLine[index].formIsOpen
    this.formIsOpen=true
    console.log(this.newRow,this.levelsAddLine[index])}
}



  addNextLevel(index:any,lig:any,data:any){
    for(let i=index+1;i<this.toShow.length;i++){
      if(i==index+1){
        this.toShow[index+1]=lig.children;
      }
      else{
        this.toShow[i]=[]
      }
     data.forEach((e:any)=>{
      e.isClicked=false
     })
      lig.isClicked=true;
    }
   
  }
  moreDisplay(lig:any){
    
      let address=""
      for(let i=0;i<this.toShow.length;i++){
        if(i==0){
          address=this.toShow[0].id+":"
        }
        else if(i<this.toShow.length-1){
        let line=this.toShow[i].find((e:any)=>e.isClicked)
          address=address+line.id+":"
        }
        else{
          address=address+lig.id;
        }
      }
      console.log(address);
      this.router.navigate(["/formulaire/oneLine/",this.reponse.Formulaire_Id,this.reponse.Reponse_Id,address])
      
    
  }
  changeInFrontData(data:any,change:any,level:any){
   let table= this.reponse.tables.find((e:any)=>e.Table_Id==change.Table_Id)
    if(level==table.Table_level){
      data.forEach((lig:any)=>{
        if(change.id==lig.id){
          lig[change.Name]=change.Value
        }
      })
    }
    else{
      data.forEach((lig:any) => {
        this.changeInFrontData(lig.children,change,level+1);
      });
    }
  }
  changeInField(node:any,tableId:any,Name:any,val:any,Id:any){
    console.log(node)
    let field=this.fields.find((e:any)=> e.Name==Name)

    if (val==null) val=0
    let newChange={
      Table_Id:tableId,
      Name:Name,
      Value:val,
      id:Id
    }
    if(Name=='date') newChange.Value=newChange.Value.toString()
    this.changeInFrontData(this.data,newChange,0)
    this.FormulaireService.upDateFieldVal(newChange).subscribe((res:any)=>{
     

      let newUpdate={
        user:this.authService.authenticatedUser.U_Id,
        reponse_id:this.reponse.Reponse_Id,
        ligen_id:Id,
        chagementType:'edit',
        table_level:tableId,
        fieldchanged:field.Field_Id,
        newValue:val,
        is_seen:false
      }
      console.log("newup",newUpdate)
     this.FormulaireService.addNewUpdate(newUpdate).subscribe((res:any)=>{console.log(res)})
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
  nextLig(test:any){
    
    
    let index=this.data.findIndex((e:any)=>e.id==this.toShow[0].id)
    
    let nextIndex=0
    if(test==1){
     nextIndex=index+1
     if(nextIndex>=this.data.length){
      nextIndex=0
     }
    }
    else{
      nextIndex=index-1;
      if(nextIndex<0){
        nextIndex=this.data.length-1
       }
    }
    console.log('nnn',this.data,index,nextIndex);
    for (let i = 0; i < this.toShow.length; i++) {
      
      if(i==0){
        this.toShow[i]=this.data[nextIndex]
      }else if(i==1){
        this.toShow[i]=this.data[nextIndex].children
      }
      else{
        this.toShow[i]=[]
      }
    }

  }

  toAdd(index:any){
    if(index==1){
      return true
    }
    else{
      let lig=this.toShow[index-1]?.find((e:any)=>e.isClicked)
      if(lig) return true
      else return false
    }
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
          if(level==0){
            if(this.idLine==lig.id) {
              this.toShow[0]=lig
              this.toShow[1]=infoInf}
          }
          
          this.getInferData(newTab,lig['children'],level+1)
        })}
        else{
          lig['level']=level;
          lig['children']=[]
          lig['isClicked']=false
        }
        })
    }
  
  }
  cancelAdd(index:any){
    this.levelsAddLine[index].formIsOpen=!this.levelsAddLine[index].formIsOpen
    this.newRow={}
    this.formIsOpen=false

  }
  addNewRow(index:any){
    let table=this.reponse.tables.find((e:any)=> e.Table_level==index)
    let val:any={}
    val['Table_Id']=table.Table_Id
    val['row']=[]
    table.fields.forEach((field:any)=>{
      if(field.Name.substring(0, 3)!='ID_') {
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
    let test=false
    if(index==1){
      this.newRow['sup_id']=this.toShow[0].id
      val['row'].push({
        Name:'sup_id',
        Value:this.toShow[0].id
      }) 
    }
    else{
      let lig=this.toShow[index-1].find((e:any)=>e.isClicked)
      val['row'].push({
        Name:'sup_id',
        Value:lig.id
      }) 
      test=true
    }
if(test||(index==1)){

    this.FormulaireService.addNewRow(val).subscribe((res:any)=>{
      let newUpdate={
        user:this.authService.authenticatedUser.U_Id,
        reponse_id:this.reponse.Reponse_Id,
        ligen_id:0,
        chagementType:'add',
        table_level:null,
        newValue:'',
        fieldchanged:null,
        is_seen:false
      }
      

     this.FormulaireService.addNewUpdate(newUpdate).subscribe((res:any)=>{console.log(res)})

     this.levelsAddLine[index].formIsOpen=!this.levelsAddLine[index].formIsOpen
    //  this.newRow['children']=[]
    //  this.newRow['level']=index;
    //  this.newRow['isClicked']=false

    this.newRow={}
    this.formIsOpen=false
    this.getInfo()
    })}
  }
  


  async getInfo(){
    this.data=[]
    let table0={
      table:this.reponse.tables[0].Table_Name.replaceAll(' ','_').replaceAll(';','_').toLowerCase(),
      Reponse_Id:this.reponse.Reponse_Id
    }
    this.FormulaireService.getAllInformation(table0).subscribe(async (data:any)=>{
       
      //console.log(this.data)
      this.toShow.push({})
      this.reponse.tables.forEach((tab:any,i:any)=>{
        if(i!=0){
          this.toShow.push([])
        }
        this.levelsAddLine.push({level:tab.Table_level,formIsOpen:false})
      })
      this.levelsAddLine.sort((a:any,b:any)=>a.level-b.level)
      console.log(this.levelsAddLine)
      
     this.getInferData(this.reponse.tables[1],data,0)
 
    
      
      
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
         
    
          this.FormulaireService.getFields(servFound.Serv_Refer).then((fields:any)=>{
            this.FormulaireService.getTables(res.idF).then(async (tables:any)=>{
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
                  this.FormulaireService.getChoices(field.Field_Id).then((choices:any)=>{
                    field['choisesList']=choices
                  })
                  }
                this.fields.push(field)
              })
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
  
  this.FormulaireService.getFields(servToShow.Serv_Refer).then((fields:any)=>{
    this.FormulaireService.getTables(res.idF).then(async (tables:any)=>{
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
          this.FormulaireService.getChoices(field.Field_Id).then((choices:any)=>{
            field['choisesList']=choices
          })
          }
        this.fields.push(field)
      })
     })
     
     await this.getInfo()
     
      
    
      
    })
        })
  
  })
  }


  fieldValLig(lig:any,name:any){
    if(lig!==undefined){
      if((name.substring(0, 3)!='ID_')&&(lig[name])) {return lig[name]}
    else if(name.substring(0, 3)=='ID_') return lig?.id
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
     this.idLine=res.lineId
    if(!reponse.allIn) this.configurationStepByStep(reponse,res)
    else this.configurationAllIn(reponse,res)
    console.log(this.data);
    
  
   })
   })
   console.log('w=',this.isWorking)
  
   }
}
