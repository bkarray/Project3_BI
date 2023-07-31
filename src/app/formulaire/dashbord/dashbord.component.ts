import { Component, OnInit,Injectable,ViewChild  } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {SelectionModel} from '@angular/cdk/collections';
import {MatCheckboxChange} from "@angular/material/checkbox";
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';
import { AuthService } from 'src/app/services/auth/authservice';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';
import {ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit{
  
  
  constructor(    
    private cdref: ChangeDetectorRef,
    private authService: AuthService,
    private service:SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private FormulaireService:FormulaireService) {
  }


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
  pageOpened:boolean=false
  socket:any
  info:any=[]
  lostData:any=[]
  listLig:boolean=false
  orderLigs:any=[]
  listIsOpen:any=true
  thereIsWork: boolean=false;
   



  selectedResponse:any=0
  pageSize:any=5
  count:any=0;
  pages:any={
   sup:5,
   inf:0
 }



  pageSizeOptions:any=[5, 10, 25]



 
  menuTopLeftPosition =  {x: '0', y: '0'} 
  @ViewChild(MatMenuTrigger, {static: false}) matMenuTrigger: MatMenuTrigger | undefined; 


  fieldsOnAdd:any[]=[]
  levelToAdd:number=0
  isSubRow:boolean=false
 addRowPopUpIsOpen:boolean=false
 parentToAdd:any=0
nodeAdd:any=null;

  ngOnInit(): void {
    this.getData()
  }


  onPaginateChange(event:any){
    console.log(1+event.pageIndex*event.pageSize,(event.pageIndex+1)*event.pageSize);
    this.data=[]
    this.pages.inf=event.pageIndex*event.pageSize
    this.pages.sup=(event.pageIndex+1)*event.pageSize
    setTimeout(() => {
      this.getInfo(event.pageIndex*event.pageSize,(event.pageIndex+1)*event.pageSize)
    }, 1);
  }


  searchVAl(lig:any,fieldName:any,val:any,levelToFind:any,level:any){
    if(level>levelToFind) return false
    
    else if(level==levelToFind){
    if(lig[fieldName]&&(lig[fieldName]==val)){
      return true
    }
    else{
      return false
    }
    }
    else{
      let res=false
      lig.children.forEach((el:any)=>{
        res=res||this.searchVAl(el,fieldName,val,levelToFind,level+1)
      })
      return res;
    }
      }
    
  verifieIfFirstLevel(id:any){
    const tab=this.reponse.tables.find((e:any)=>e.Table_level==0)
    const index=tab.fields.findIndex((e:any)=>e.Field_Id==id)
    return index!=-1
  }




  activate(node:any){
    
    console.log(node);
  if(node.children.length!=0){  
    if(node.children){
    node.expanded=!node.expanded;
    }}

  }

  tableInterval(Table_Id:any){
    
    
    let table=this.reponse.tables.find((e:any)=>e.Table_Id==Table_Id)
    let count_min=0,count_max=0,count=0
    for(let i=0;i<=table.Table_level;i++){
      let tab=this.reponse.tables.find((e:any)=>e.Table_level==i)
    count+=tab.fields.length
    }
    count_min=count-table.fields.length
    count_max=count-1
    
    let res={
      min:count_min,
      max:count_max
    }
    
    return res
   }

  verifiesInTable(field:any){
    let interval=this.tableInterval(field.Table_Id)
    let index=this.fields.findIndex((e:any)=>e.Field_Id==field.Field_Id)
  
    
    let res={
      result:(index<=interval.max)&&(interval.min<=index),
      table:this.newTableIn(index)
    }
    
    return(res)
   }
  changeInField(node:any,tableId:any,Name:any,val:any,Id:any){
    console.log(node)
    let field=this.fields.find((e:any)=> e.Name==Name)
    if(field.isChanged){
      let test=this.verifiesInTable(field)
      this.visualUpdate(this.data,field,val,test.table,Id,0)
      let v={value:0}
      this.idParent(this.data,test.table,0,Id,v);
      console.log('v',v);
      
      Id=v.value
    }
    if (val==null) val=0
    let newChange={
      Table_Id:tableId,
      Name:Name,
      Value:val,
      id:Id
    }
    if(field.Type=='date') newChange.Value=newChange.Value.toString()
    this.FormulaireService.upDateFieldVal(newChange).subscribe((res:any)=>{
     
      
      if(field.isChanged){

      }
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

  getChoices(index:any){
    this.FormulaireService.getChoices(this.fields[index].Field_Id).then((choices:any)=>{
      this.fields[index]['choisesList']=choices
  
    })
  }

  inRow(name:any,level:any):boolean{
    let table=this.reponse.tables.find((e:any)=> e.Table_level==level)
    //console.log(table,name,table.fields.findIndex((e:any)=> e.Name==name))
    let interval=this.tableInterval(table.Table_Id)
    let fieldIndex=this.fields.findIndex((e:any)=>e.Name==name)
    return ((fieldIndex<=interval.max)&&(interval.min<=fieldIndex))
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
  


  newTableIn(index:any){
    let res=0
    for(let i=0;i<=index;i++){
      if(this.fields[i].Name.substring(0, 3)=='ID_') res=this.fields[i].Name[3]
    }
    return Number(res)
   }
  async configurationStepByStep(reponse:any,res:any){
    let servTofind=reponse.reponse_level
      if(servTofind==null) servTofind=0
        let reponseToSearch={
          reponse:Number(res.idR)
        }
        console.log("2",reponseToSearch)
        this.FormulaireService.getServicesByReponse(res.idF,reponseToSearch).subscribe((servs:any)=>{
          this.organizationServs(servs)
          
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
         
    
          this.FormulaireService.getFields(servFound.Serv_Refer).then((fields:any)=>{
            this.FormulaireService.getTables(res.idF).then(async (tables:any)=>{
              reponse['tables']=tables
              fields.forEach((field:any)=>{
                field['isChanged']=false
              })
              reponse['tables'].forEach((tab:any)=>{
                if(tab.Table_level==0){
                  
                  this.FormulaireService.getCount(reponse.Reponse_Id,[]).subscribe((count:any)=>{
                    this.count=count
                  })
                }
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
                if(field.Status=='modifié') this.thereIsWork=true
                field['filterTypeSelector']=false
                field['related']=false
                this.fields.push(field)
              })
             
  
             })
             console.log(this.fields,this.servs)
             await this.getInfo(0,5)
             
              
            
              
            })
                })
        })
    
  }
  
  upgradeField(data:any,newLevel:any,prevLevel:any,field:any,level:any){
    if(data) data=data.filter((e:any)=> {
      if( e.id ) return true;
      else return false;
    })
    if(level==prevLevel){

      data.forEach((lig:any)=>{
        console.log(lig)
     this.valueInTree(data,newLevel,field,level,lig)
      
        this.upgradeField(lig.children,newLevel,prevLevel,field,level+1)
      })
      

    }
    else if(data?.length!=0) {
      if(data){
        data.forEach((lig:any)=>{
          this.upgradeField(lig.children,newLevel,prevLevel,field,level+1)
        })
      }
    }
  }
  valueInTree(data:any,prevLevel:any,field:any,level:any,lig:any){
    
   if(level==prevLevel){
  if(data.length!=0){
    lig[field.Name]=data[0][field.Name]
  }
  else{
    let lostIndex=this.lostData.findIndex((e:any)=> (e.id==lig.id)&&(e.level==lig.level))
   if(lostIndex!=-1){ lig[field.Name]=this.lostData[lostIndex][field.Name]
    this.lostData.splice(lostIndex,1)}
  }
    
   }
   else if(data.length!=0) {
    data.forEach((lig:any)=>{
    this.valueInTree(lig.children,prevLevel,field,level+1,lig)
    })
   }
  }


  


  
webSocket(info:any,id:any,FormulaireServ:FormulaireService,getInfo:Function,id_user:any){
  var url ='ws://localhost:8000/ws/new/'
  this.socket=new WebSocket(url)


  function keepUpdate(FormulaireServ:FormulaireService,data:any,level:number,change:any){
    console.log(change,level)
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
    else { console.log("(data&&data.children)")
      if(data){
        data.forEach((lig:any)=>{
          console.log('****',lig)
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
    
    console.log(data)
  }
  
  this.socket.onclose=function(e:any){
    alert('socket disconnected')
  }
}


visualUpdate(data:any,field:any,val:any,levelTo:any,id:any,level:any){
  console.log("ia",data,levelTo,level);
  
  if((level==levelTo)&&(data.findIndex((e:any)=>e.id==id)!=-1)){
    data.forEach((lig:any)=>{
      lig[field.Name]=val;
    })
  }
  else{
    data.forEach((lig:any)=>{
      this.visualUpdate(lig.children,field,val,levelTo,id,level+1)
    })
  }
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
      console.log(servs[0])
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
        if(tab.Table_level==0){
          this.FormulaireService.getCount(reponse.Reponse_Id,[]).subscribe((count:any)=>{
            this.count=count
          })
        }
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
          field['related']=false
        this.fields.push(field)
  
      })
     })
     console.log(this.fields,this.servs)
     await this.getInfo(0,5)
     
      
    
      
    })
        })
  
  })
  }


  idParent(data:any,levelTo:any,level:any,id:any,val:any){
    console.log(data,levelTo,level,id);
    
    if(level==levelTo-1){
     data.forEach((lig:any)=>{
      if(lig.children.findIndex((e:any)=>e.id==id)!=-1){
        console.log(lig.id);
        val.value=lig.id;
      }
     })
      
    }
    else{
      data.forEach((lig:any)=>{
        this.idParent(lig.children,levelTo,level+1,id,val)
      })
    }
  }

  
  fieldValLig(lig:any,name:any){
    if(lig[name]) {return lig[name]}
    else if(name.substring(0, 4)=='ID_'+lig.level) return lig['id']
    else {
      let field=this.fields.find((e:any)=>e.Name==name)
      if(field.isChanged){
        let data=this.data
        while(data){
          if(data[0][name]) {return data[0][name]}
          else data=data[0].children
        }
      }
      return ''
    }
    
  }


  addNewRowPopUp(node:any,isSubRow:boolean){

    
    if(isSubRow){
    this.levelToAdd=node.level+1
    this.fieldsOnAdd=this.fieldsToAdd(node.level+1)
  }
    else {
    this.levelToAdd=node.level
    this.fieldsOnAdd=this.fieldsToAdd(node.level)
  }
    this.parentToAdd=node['node']['id']
    this.isSubRow=isSubRow
    this.nodeAdd=node
    this.addRowPopUpIsOpen=true

  }

  canAddSubRow(rowNode:any){    
    return ((rowNode.level+1<this.reponse.tables.length)&&((this.etapNum==1)||(this.reponse.allIn))&&(((!this.reponse.allIn)&&this.isWorking)||((this.reponse.allIn)&&(this.reponseIsOnWork&&this.isWorking))))
  }


  deleteRow(node:any){
    let tabel=this.reponse.tables.find((e:any)=>e.Table_level==node.level)
    let dataToDelete={
      Table_Id:tabel.Table_Id,
      rowId:node.node.id
    }
    this.FormulaireService.deleteRowInTable(dataToDelete).subscribe((res:any)=>{
      if(node.parent){
        node.parent.children=node.parent.children.filter((e:any)=>e.id!=node.node.id)
        node.visible=false
        
      }
      else{
        this.data=this.data.filter((e:any)=>e.id!=node.node.id)
      }
      this.cdref.detectChanges()
    })
    
   }

  closeAddRowPopUp(event:any){
    this.addRowPopUpIsOpen=false
console.log('event',event);

    if(event){   
      if(this.isSubRow){
        this.nodeAdd['node']['children'].push(event)
      }
      else{
      if(this.nodeAdd['parent']){
        this.nodeAdd['parent']['children'].push(event)
      }
      else{
        this.data.push(event)
      }
      }

  }
  }



  onDrop(event: CdkDragDrop<any[]>): void {
    // Get the dragged node and its new index (drop target index)
    const draggedNode = event.item.data;
    const newIndex = event.currentIndex;

    // Update the position of the dragged node in the treeTableData array
    this.data = this.moveItemInArray(this.data, draggedNode, newIndex);

    // Call detectChanges to trigger change detection and update the view
    this.cdref.detectChanges();
  }

  private moveItemInArray(array: any[], item: any, newIndex: number): any[] {
    const currentIndex = array.indexOf(item);
    if (currentIndex === -1 || newIndex === currentIndex) {
      return array;
    }
    const newArray = array.slice();
    newArray.splice(currentIndex, 1);
    newArray.splice(newIndex, 0, item);
    return newArray;
  }
  onClick(event:any,node:any){
    event.preventDefault()
    console.log(event);
    this.menuTopLeftPosition.x = event.clientX + 'px'; 
    this.menuTopLeftPosition.y = event.clientY + 'px'; 

    if (this.matMenuTrigger) {
      this.matMenuTrigger.menuData = { 'item': node};
    }
    this.matMenuTrigger?.openMenu();
    // we open the menu 
    // we pass to the menu the information about our object 
   

    
  }


  fieldsToAdd(level:any){
    let table=this.reponse.tables.find((e:any)=> e.Table_level==level)
    console.log('table',table);
    
    if (table){
      return table.fields.filter((e:any)=> e.Status!='invisible')
    } 
    else return []
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


  async getInfo(inf:any,sup:any){
    this.data=[]
    this.FormulaireService.getDataByIdReponse(this.reponse.Reponse_Id,sup,inf).subscribe((data:any)=>{
       
      console.log("datahello",this.data)
      
      
     
     if(this.orderLigs.length==0){
      data.forEach((lig:any,i:any)=>{
      lig['__order__']=i
      let ligOrd={
        id:lig.id,
        order:i
      }
      this.orderLigs.push(ligOrd)
      })
     }
  
    console.log('order',data.length);
    
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
  
  
  
       console.log('data',this.data);
       
       this.webSocket(this.data,this.reponse.Reponse_Id,this.FormulaireService,this.getInfo,this.authService.authenticatedUser.U_Id)
    })
    
  }
  
verifiesFieldLevel(node:any,field:any){
const table=this.reponse.tables.find((e:any)=>e.Table_Id==field.Table_Id)
if(field.Name.substring(0, 3)=='ID_') {

  return node.level==field.Name.substring(3)}



if(!table) return false
const level=table.Table_level
return node.level==level;
}

togglePlacement(field:any,node:any){
  if(field.Name.substring(0, 3)=='ID_'){
    if(node.level==field.Name.substring(3)) return true
  }
  return false
}
  getData(){
    this.authService.loadUser();
    this.userId = this.authService.authenticatedUser.U_Id;
 this.route.params.subscribe((res:any)=>{
 
  
   console.log(res)

 this.FormulaireService.getReponseById(res.idR).subscribe((reponse:any)=>{
  const params={
    idR:res.idR,
    idF:reponse.Formulaire_Id
  }
   
   if(!reponse.allIn) this.configurationStepByStep(reponse,params)
   else this.configurationAllIn(reponse,params)
   
 
  })
  })
  
 
  
  }
  
}
