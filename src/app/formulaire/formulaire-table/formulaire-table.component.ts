import {  Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';
import { AuthService } from 'src/app/services/auth/authservice';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TreeDragDropService, TreeNode } from 'primeng/api';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { ResizedEvent } from 'angular-resize-event';
import {ChangeDetectorRef } from '@angular/core';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-formulaire-table',
  templateUrl: './formulaire-table.component.html',
  styleUrls: ['./formulaire-table.component.css'],
})
export class FormulaireTableComponent implements OnInit {
  
 

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
   archiverData:any=[]
    

   deleteUploadBarIsOpen:boolean=false
   deleteUpload:any=''
   filesDel:any=[]


   uploadBarIsOpen:boolean=false;
   fileToUpload:any=''
   files:any=[]

   filterType:any=0
   typesOfFilter:any=['A à Z','Z à A']

   filters:any=[]

   selectedResponse:any=0
   pageSize:any=5
   count:any=0;
   pages:any={
    sup:5,
    inf:0
  }

  pythonCompilerPopUpIsOpen:boolean=false

   pageSizeOptions:any=[5, 10, 25]


   fileManagerIsOpen:any=false



   fileNameExported:any=''
   fileNameBarIsOpen:boolean=false


   graphsListIsOpen:boolean=false

  functions:any={
    FileManagerIsOpen:false,
    DeleteAllIsOpen:false,
    DeleteUploadIsOpen:false,
    ExportDataIsOpen:false,
    PythonIsOpen:false,
    GraphsIsOpen:false
  }



   ngOnInit(): void {
    if(!this.pageOpened){
      this.getData()
    this.pageOpened=true}
    else{
      this.data=this.info
    }
   
  console.log(this.data,this.formulair)
  }

  moreView(){
    this.router.navigate(['/formulaire/dashboard/',this.reponse.Response_Id])
  }

  openPythonCompiler(){
this.route.params.subscribe((params:any)=>{
  this.selectedResponse=params.idR
  this.pythonCompilerPopUpIsOpen=!this.pythonCompilerPopUpIsOpen
})

  }

  openGraphList(event:any){
this.graphsListIsOpen=!this.graphsListIsOpen


  }

  getFunctions(Serv_Id:any){
    this.FormulaireService.getFunctions(Serv_Id).subscribe((functions:any)=>{
      if(functions.length!=0){
        functions.forEach((fuctionOn:any)=>{
          switch (fuctionOn.Function_Name) {
            case "File Manager":
            case "file manager":
              this.functions.FileManagerIsOpen=fuctionOn.Is_Visible
              break;
            case "Delete All":
            case "delete all":
              this.functions.DeleteAllIsOpen=fuctionOn.Is_Visible
              break;
            case "Delete Upload":
            case "delete upload":
              this.functions.DeleteUploadIsOpen=fuctionOn.Is_Visible
              break;
            case "Export Data":
            case "export data":
              this.functions.ExportDataIsOpen=fuctionOn.Is_Visible
              break;
            case "Graphs":
            case "graphs":
              this.functions.GraphsIsOpen=fuctionOn.Is_Visible
              break;
            case "Python":
            case "python":
              this.functions.PythonIsOpen=fuctionOn.Is_Visible
              break;
            default:
              break;
          }
        })
      }
    })
  }

  openExportBar(){
    this.fileNameExported=''
    this.fileNameBarIsOpen=!this.fileNameBarIsOpen
  }

  exportData(){
    this.route.params.subscribe((parms:any)=>{
      this.FormulaireService.exportData(parms.idR).subscribe((res:any)=>{
        console.log(res);
        if(this.fileNameExported=='')
                this.fileNameExported='exported_file'
        saveAs(res,this.fileNameExported+'.xlsx');
        this.openExportBar()
      })
    })
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


  verifieIfFirstLevel(id:any){
    const tab=this.reponse.tables.find((e:any)=>e.Table_level==0)
    const index=tab.fields.findIndex((e:any)=>e.Field_Id==id)
    return index!=-1
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







  deleteAllRows(){
    this.route.params.subscribe((res:any)=>{
      this.FormulaireService.deleteAllRows(res.idR).subscribe((res:any)=>{
        console.log(res);
        location.reload();
        
      })
    })
  }




  deleteUploadRows(){
    this.route.params.subscribe((res:any)=>{
      let val={
        reponse_id:res.idR,
        excelfile_id:Number(this.deleteUpload)
      }
      this.FormulaireService.deleteUploadRows(val).subscribe((res1:any)=>{
        console.log(res1);
        location.reload()
        
      })
    })
  }
  openDeleteBar(){
    this.deleteUploadBarIsOpen=!this.deleteUploadBarIsOpen
    this.deleteUpload=''
    this.filesDel=[]
    if(this.deleteUploadBarIsOpen){
      this.route.params.subscribe((res:any)=>{
        this.FormulaireService.filesUploaded(res.idR).subscribe((files:any)=>{
          this.filesDel=files
            })
      })

    }
  }

  openFileManager(event:any){

    this.route.params.subscribe((res:any)=>{
      this.formulair['Formulaire_Id']=Number(res.idF)
    })
    console.log(this.formulair);
    
    this.fileManagerIsOpen=!this.fileManagerIsOpen
  }

  openSelector(index:any){
    this.filterType=''
    this.fields[index].filterTypeSelector=!this.fields[index].filterTypeSelector
  }


  filterData(name:any,index:any){
    let data=this.data
    console.log(data[0][name],name,this.fields[index]);
    
    this.data=[]
    switch (this.filterType) {
      case 'A à Z':
        data=data.sort((a:any,b:any)=>{
          if(!a[name]&&!b[name]) return 0;
          if(a[name]&&!b[name]) return -1;
          if(!a[name]&&b[name]) return 1;
          return a[name].localeCompare(b[name], 'en', { numeric: true })})
        break;
        case 'Z à A':
          data=data.sort((a:any,b:any)=>{
            if(!a[name]&&!b[name]) return 0;
            if(a[name]&&!b[name]) return -1;
            if(!a[name]&&b[name]) return 1;
            return b[name].localeCompare(a[name], 'en', { numeric: true })})
          break;
      default:
        break;
    }
    console.log(data);
    
    this.openSelector(index)
    setTimeout(()=>{
      this.data=data
    },1)
  }

  onResized(event: ResizedEvent): void {
    //console.log(event);
    
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  activate(node:any){
    
    console.log(node);
  if(node.children.length!=0){  
    if(node.children){
    node.expanded=!node.expanded;
    }}

  }

  openlist(){
    this.listIsOpen=!this.listIsOpen
  }
   newTableIn(index:any){
    let res=0
    for(let i=0;i<=index;i++){
      if(this.fields[i].Name.substring(0, 3)=='ID_') res=this.fields[i].Name[3]
    }
    return Number(res)
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
   
   deleteRowFromTable(data:any,id:any,level:any,levelToFind:any){
    if(levelToFind==0){
      let index=data.findIndex((e:any)=>e.id==id)
      data.splice(index,1)
    }
   else{ if(levelToFind-1==level){
    data.forEach((lig:any)=>{
      let index=lig.children.findIndex((e:any)=>e.id==id)
      if(index!=-1){
        lig.children.splice(index,1)
      }
    })
    }
    else if(level<=levelToFind){
      data.forEach((lig:any)=>{
        this.deleteRowFromTable(lig.children,id,level+1,levelToFind)
      })
    }}
   }

   deleteRow(node:any){
    let tabel=this.reponse.tables.find((e:any)=>e.Table_level==node.level)
    let dataToDelete={
      Table_Id:tabel.Table_Id,
      rowId:node.node.id
    }
    this.FormulaireService.deleteRowInTable(dataToDelete).subscribe((res:any)=>{
      this.getInfo(0,5)
    })
    
   }

   openMoreDisplay(node:any){
    console.log(node);
    this.router.navigate(["/formulaire/line/",this.reponse.Formulaire_Id,this.reponse.Reponse_Id,node.id])
    
   }


   downgradeField(data:any,newLevel:any,prevLevel:any,field:any,value:any,level:any){
    
    if(level==prevLevel){
      
      data.forEach((lig:any)=>{
        let val=lig[field.Name]
        
        if(lig.children.length==0){
          let res:any={}
          res[field.Name]=val
          res['level']=level
          res['id']=lig.id
          res['used']=false
          this.lostData.push(res)
        }
        this.downgradeField(lig.children,newLevel,prevLevel,field,val,level+1)
      })
    }
    else if(level==newLevel){

      data.forEach((lig:any)=>{

      lig[field.Name]=value

        
        this.downgradeField(lig.children,newLevel,prevLevel,field,value,level+1)
      })

    }
    else if(data&&data.length!=0) {
      {
        data.forEach((lig:any)=>{
          this.downgradeField(lig.children,newLevel,prevLevel,field,value,level+1)
        })
      }
    }
   }



   openListLig(){
    this.listLig=!this.listLig
    console.log(this.data);
    if(!this.listLig){
      let data=this.data;
      this.data=[]
        data.forEach((lig:any)=>{
          let ligOrd=this.orderLigs.find((e:any)=>e.id==lig.id)
          lig['__order__']=ligOrd.order
        })
        data.sort((a:any,b:any)=>a.__order__-b.__order__)
      setTimeout(()=>{
        this.data=data
      },1)
    }
   // $("#myDiv").load(location.href + " #myDiv");
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

  

    organizationOrderFields(field:any,index:any,indexPrev:any){
    let tablesIntervals: { level: number; min: number; max: number; }[]=[]
    this.reponse.tables.forEach((table:any)=>{
      let res={level:-1,min:-1,max:-1}
      res.level=table.Table_level
      let res2=this.tableInterval(table.Table_Id)
      res.max=res2.max
      res.min=res2.min
      tablesIntervals.push(res)
    })
    let interval=tablesIntervals.find((e:any)=>(e.max>=indexPrev)&&(e.min<=indexPrev))
    if(interval&&!((interval.max>=index)&&(interval.min<=index))) {
      if(index>indexPrev){
        let newLevel=tablesIntervals.find((e:any)=>(e.max>=index)&&(e.min<=index))
        this.downgradeField(this.data,newLevel?.level,interval.level,field,null,0)
        
      }
      if(index<indexPrev){
        let newLevel=tablesIntervals.find((e:any)=>(e.max>=index)&&(e.min<=index))
        this.upgradeField(this.data,interval.level,newLevel?.level,field,0)
      }
      
      
      

    }

   
   }
   
   


   drop(event: CdkDragDrop<any>) {

let intervale=this.tableInterval(this.fields[event.previousIndex].Table_Id)

if((this.fields[event.previousIndex].Name.substring(0, 3)!='ID_')&&(event.currentIndex>intervale.min)){ 
  this.organizationOrderFields(this.fields[event.previousIndex],event.currentIndex,event.previousIndex)   
  if (event.previousContainer === event.container) {
         moveItemInArray(
           event.container.data,
           event.previousIndex,
           event.currentIndex
         );
       } else if(event.previousContainer !== event.container) {
         transferArrayItem(
           event.previousContainer.data,
           event.container.data,
           event.previousIndex,
           event.currentIndex
         );
       }
       
      }
     console.log("***");
     
      this.fields.forEach((field:any)=>{
       
        
        if(field.Name.substring(0, 3)!='ID_'){
        let test=this.verifiesInTable(field)
        console.log(test)
        field.isChanged=!test.result;}
      })
       
this.correctLastLine()
     }
upDateOrderLigs(){
  this.data.forEach((lig:any,i:any)=>{
    let ligOrder=this.orderLigs.find((e:any)=>e.id==lig.id)
    ligOrder.order=i
  })
}

     dropLig(event: CdkDragDrop<any>){
      console.log("mvt",event.previousContainer.data,event.previousIndex,event.currentIndex);
      
      if (event.previousContainer === event.container) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      } else if(event.previousContainer !== event.container) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
      this.upDateOrderLigs()
      this.correctLastLine()
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



  returnList(){
    this.router.navigate(['/formulaire/list/'])
  }

  nextServ(){
   let nextServ: any=null
  console.log(this.reponse.allIn)
   if((this.etapNum+1>this.servs.length)||(this.reponse.allIn)) {
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
      window.location.reload;
      this.ngOnInit()
      
    })

   })
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


  fieldVal(node:any,name:string){
    node['visible']=!node['visible']
    
    if(node['node'][name]) return node['node'][name]
    //else if(name.substring(0, 4)=='ID_'+node.level) return node['node']['id']
    else return ''
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
  inRow(name:any,level:any):boolean{
    let table=this.reponse.tables.find((e:any)=> e.Table_level==level)
    //console.log(table,name,table.fields.findIndex((e:any)=> e.Name==name))
    let interval=this.tableInterval(table.Table_Id)
    let fieldIndex=this.fields.findIndex((e:any)=>e.Name==name)
    return ((fieldIndex<=interval.max)&&(interval.min<=fieldIndex))
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
      if(field.Type=="list"){
        this.data=[]
        setTimeout(() => {
  this.getInfo(this.pages.inf,this.pages.sup)
}, 1);
}
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


// integrateNewRow(data:any,parent:any,sup_id:any,levelTo:any,level:any){
//   console.log("add",(parent&&parent.id==sup_id)||(levelTo==0),levelTo,level)
// if(level==levelTo){
// if((parent&&(parent.id==sup_id))||(levelTo==0)){
//   let table=this.reponse.tables.find((e:any)=> e.Table_level==level)
//   let table_adresse={
//     table:table.Table_Name.replaceAll(' ','_').replaceAll(';','_').toLowerCase(),
//     Reponse_Id:this.reponse.Reponse_Id
//   }
//   this.FormulaireService.getAllInformation(table_adresse).subscribe((ligns:any)=>{

//     let lig=ligns.find((e:any)=>data.findIndex((e1:any)=>e1.id==e.id)==-1)
    
//         lig['last']=true
//         lig['children']=[]
//         lig['openForm']=false
//         lig['childrenForm']=false
//         lig['level']=level
//         data[data.length-1].last=false
//         console.log("lig",lig,data);
//      return lig
//   })
// }
// }
// else{
//   if(data){
    
//     data.forEach((lig:any)=>{
//    return  this.integrateNewRow(lig.children,lig,sup_id,levelTo,level+1);
//   })
// }
// }
// }

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
      this.newRow['sup_id']=node.parent.id
      val['row'].push({
        Name:'sup_id',
        Value:node.parent.id
      }) 
    }


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
    node.node.openForm=!node.node.openForm


    this.newRow={}
    this.formIsOpen=false
    console.log(node);
    this.orderLigs=[]
    this.getInfo(0,5)
    })
  
  }
  cancelAddNewRow(node:any){
    node.node.openForm=!node.node.openForm
    this.newRow={}
    this.formIsOpen=false
    console.log(node);
    this.orderLigs=[]
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
      let newUpdate={
        user:this.authService.authenticatedUser.U_Id,
        reponse_id:this.reponse.Reponse_Id,
        ligen_id:0,
        chagementType:'add',
        table_level:null,
        fieldchanged:null,
        is_seen:false
      }
      console.log("newup",newUpdate)
     this.FormulaireService.addNewUpdate(newUpdate).subscribe((res:any)=>{console.log(res)})
    this.getInfo(0,5)
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
  }
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
      let newUpdate={
        user:this.authService.authenticatedUser.U_Id,
        reponse_id:this.reponse.Reponse_Id,
        ligen_id:0,
        chagementType:'add',
        table_level:null,
        fieldchanged:null,
        is_seen:false
      }
      console.log("newup",newUpdate)
     this.FormulaireService.addNewUpdate(newUpdate).subscribe((res:any)=>{console.log(res)})
     node.node.childrenForm=!node.node.childrenForm
    this.orderLigs=[]
    this.getInfo(0,5)
    this.newRow={}
    this.formIsOpen=false
    console.log(val)
    })
  
  }
  cancelAddNewRelation(node:any){
    node.node.childrenForm=!node.node.childrenForm
    this.orderLigs=[]
    this.newRow={}
    this.formIsOpen=false
  }
  




  spaceTable(level:number):any{
   if(level<this.reponse.tables.length) {  
    if(level==0) return 0
    else {
      let res=0
      for(let i=0;i<level;i++){
        let tab=this.reponse.tables.find((e:any)=> e.Table_level==i)
      res+=tab.fields.length}
      return res
      
    }}
    else return -1

  }

  isOrganizedRight(){
    let res=true
    this.fields.forEach((field:any)=>{
      if(field.isChanged) res=false
    })
    return res
  }

  returnReference(choices:any[]){
    let i=0;
    while(i<choices.length){
      if(choices[i].fieldFromTable){
        return choices[i]
      }
      i++;
    }
    return null;
    }

getReferencesByFieldList(listField:any,choice:any,index:any,indexTable:any,order:any,tableID:any){
this.FormulaireService.getFieldsInRelation(choice.Choice_Id,listField.Field_Id).then((fieldsResult:any)=>{

fieldsResult.forEach((field:any)=>{
field.Status='consulté'
field.Field_order=order
field.Table_Id=tableID
field['related']=true
field['filterTypeSelector']=false
if(field.Type=="list"){
  this.FormulaireService.getChoices(field.Field_Id).then((choices:any)=>{
    field['choisesList']=choices
  })
}
console.log("insertion2");
this.fields.splice(index, 0, field)
this.reponse.tables[indexTable].fields.push(field)
if(field.Type=='list'){
    this.getReferencesByFieldList(field,choice,index+1,indexTable,order,tableID)
  }
})
})
}



  
  





async getInferData(table:any,data:any,level:any):Promise<any>{

  if (data.length!=0) { 
    data.forEach(async (lig:any,index:number)=>{
       if(table){let val={
        table:table.Table_Name.toLowerCase(),
        sup_id:lig.id
      }
      await this.FormulaireService.getInfoSup(val).subscribe((infoInf:any)=>{
        lig['last']=false
        if(index==data.length-1) lig['last']=true
        lig['children']=infoInf
        lig['openForm']=false
        lig['childrenForm']=false
        lig['level']=level;
        let newTab=this.reponse.tables.find((e:any)=> e.Table_level==table.Table_level+1)
        
        this.getInferData(newTab,lig['children'],level+1)
      })}
      else{
        lig['childrenForm']=false
        lig['last']=false
        lig['openForm']=false
        lig['level']=level;
        if(index==data.length-1) lig['last']=true
        lig['children']=[]
      }
      })
  }

}

addFilter(event:any,Name:any,Table_Id:any){
let tab=this.reponse['tables'].find((e:any)=>e.Table_Id==Table_Id)
console.log(event.target.value,tab.Table_level,Name);
if(event.target.value!='')
{

  const index=this.filters.findIndex((e:any)=>e.Name==Name&&e.levelToFind==tab.Table_level)
  if(index==-1){

    const filter={
      Name:Name,
      Val:event.target.value,
      levelToFind:tab.Table_level
    
    }
    this.filters.push(filter)
  }
  else{

    this.filters[index]["Val"]=event.target.value
  }



}
else{
  const index=this.filters.findIndex((e:any)=>e.Name==Name&&e.levelToFind==tab.Table_level)
  console.log(index);
  
  if(index!=-1){
    console.log(this.filters[index]);
    
    this.filters.splice(index,1)
  }
}
this.route.params.subscribe((parms:any)=>{  
 this.FormulaireService.getCount(parms.idR,this.filters).subscribe((count:any)=>{
  this.count=count
})})
console.log(this.filters);



this.data=[]
setTimeout(() => {
  this.getInfo(this.pages.inf,this.pages.sup)
  this.correctLastLine()
}, 1);


}


async getInfo(inf:any,sup:any){
  this.data=[]
  let table0={
    table:this.reponse.tables[0].Table_Name.replaceAll(' ','_').replaceAll(';','_').toLowerCase(),
    Reponse_Id:this.reponse.Reponse_Id,
    filters:this.filters,
    inf:inf,
    sup:sup
  }
  this.FormulaireService.getAllInformation(table0).subscribe((data:any)=>{
     
    console.log("datahello",this.data)
    
    
   this.getInferData(this.reponse.tables[1],data,0);
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



     
     this.webSocket(this.data,this.reponse.Reponse_Id,this.FormulaireService,this.getInfo,this.authService.authenticatedUser.U_Id)
  })
  
}


correctLastLine(){
  for(let i=0;i<this.data.length;i++){
    if(i!=this.data.length-1){
      this.data[i]['last']=false
    }
    else{
      this.data[i]['last']=true
    }
  }
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
    this.getFunctions(servFound.Serv_Id)
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
                
                this.FormulaireService.getCount(reponse.Reponse_Id,this.filters).subscribe((count:any)=>{
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
           this.insertFieldsRelated()
           console.log(this.fields,this.servs)
           await this.getInfo(0,5)
           
            
          
            
          })
              })
      })
  
}

getChoices(index:any){
  this.FormulaireService.getChoices(this.fields[index].Field_Id).then((choices:any)=>{
    this.fields[index]['choisesList']=choices

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
    this.getFunctions(servToShow.Serv_Id)
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
        this.FormulaireService.getCount(reponse.Reponse_Id,this.filters).subscribe((count:any)=>{
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
   this.insertFieldsRelated()
   console.log(this.fields,this.servs)
   await this.getInfo(0,5)
   
    
  
    
  })
      })

})
}


insertFieldsRelated(){
  this.fields.forEach((field:any,index:any)=>{
    if(field.Type=='list'){
      console.log("insertion1");
      
      this.FormulaireService.getChoicesFromField(field.Field_Id).then((choices:any)=>{
        const choiceToWorkOn=this.returnReference(choices)
        if(choiceToWorkOn!=null){
          let indexTable=this.reponse.tables.findIndex((e:any)=>e.Table_Id==field.Table_Id)
          this.getReferencesByFieldList(field,choiceToWorkOn,index+1,indexTable,field.Field_order,field.Table_Id)
        }
      })
    }
  })
}

 getData(){
  this.authService.loadUser();
   this.userId = this.authService.authenticatedUser.U_Id;
this.route.params.subscribe((res:any)=>{

 
  console.log(res)
this.FormulaireService.getReponseById(res.idR).subscribe((reponse:any)=>{
   
  if(!reponse.allIn) this.configurationStepByStep(reponse,res)
  else this.configurationAllIn(reponse,res)
  

 })
 })
 console.log('w=',this.isWorking)

 }

}


