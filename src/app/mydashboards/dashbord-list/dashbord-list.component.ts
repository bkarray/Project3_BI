import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { AuthService } from 'src/app/services/auth/authservice';
import { GraphsService } from 'src/app/services/Graphs/graphs.service';
import {FormControl} from '@angular/forms';
import { PythonCompilerComponent } from 'src/app/graphs/python-compiler/python-compiler.component';
@Component({
  selector: 'app-dashbord-list',
  templateUrl: './dashbord-list.component.html',
  styleUrls: ['./dashbord-list.component.css']
})
export class DashbordListComponent implements OnInit {
  
  constructor(
    private DashboardService:DashboardService,
    private AuthService:AuthService,
    private GraphsService:GraphsService,
    ) { }
  userId: any=0;
  tagGroups:any=['dashboards']
  dashboards:any[]=[]
  canEdit:boolean=false
  canAddRelation:boolean=false
  canDelete:boolean=false
  newGroupNameSide:any=''
  groupFormIsOpenSide:boolean=false
  groupFormIsOpen:boolean=false
  DashBoardSelected:any=null
  graphs:any[]=[]
  showCodeIsOpen:boolean=false
  selected=new FormControl(0)
  lotsOfTabs:any[]=[]
  codeGraph:any=null
  graphsToAdd:any[]=[]
  GraphID:any[]=[]
  canDeleteRelation:boolean=false
  ngOnInit(): void {
    this.getData()
  }


  selectedResponse(event:any){
    if(event!=0){
      this.GraphsService.getCodes(event).subscribe((codes:any)=>{
        this.graphsToAdd=codes.filter((e:any)=>this.graphs.findIndex((f:any)=>f.Code_Id==e.Code_Id)==-1);
      })
    } 
    else{
      this.graphsToAdd=[]
    }
  }


  openCode(event:any){
    this.codeGraph={}
      if(this.showCodeIsOpen){
        const index=this.lotsOfTabs.findIndex((e:any)=>e.Code_Id==event.Code_Id)
        if(index!=-1)
        this.lotsOfTabs.splice(index,1)
        if(this.lotsOfTabs.length==0){
          this.showCodeIsOpen=false
        }
        const indexG=this.graphs.findIndex((e:any)=>e.Code_Id==event.Code_Id)
        if(indexG!=-1)
        this.graphs[indexG]=event
      }
      else{
  
        this.showCodeIsOpen=true
      }
  }

  grantPeremptionToDeleteRelation(){
    this.canDeleteRelation=!this.canDeleteRelation
  }


  openGraphTab(event:any){
    const test=this.lotsOfTabs.findIndex((e:any)=>e.Code_Id==event.Code_Id)
    if(test==-1){
      this.lotsOfTabs.push(event)
      this.selected.setValue(this.lotsOfTabs.length-1)
    }
    else{
      this.selected.setValue(test)
    }
  }
closeTabes(){
  this.lotsOfTabs=[]
  this.codeGraph=null
  this.showCodeIsOpen=false

}
getImgUrl(graph:any){
  if((graph.img_url)&&(graph.img_url!=""))
  {
    return this.GraphsService.PhotoUrl+graph.img_url+'.png'
  }
  else{
    return '../assets/no-graph.jpg'
  }
}
deleteRelation(index:any){
  this.DashboardService.deleteGraphFromDashboard(this.DashBoardSelected.Dashboard_Id,this.graphs[index].Code_Id).subscribe((res:any)=>{
    console.log(res);
    this.graphs.splice(index,1)
    this.graphsToAdd=[]
  }
  )
}
  indentSpace(level:any){
    const res:any[]=[]
    for(let i=0;i<level;i++){
      res.push(0)
    }
  return res
  }
  editDashboardName(node:any){
    this.DashboardService.updateDashboardName(node.node.Dashboard_Id,node.node.Dashboard_Name).subscribe((res:any)=>{
      console.log(res)
    })
  }

  openEditForm(node:any){
    node.node.editForm=!node.node.editForm
    if(!node.node.editForm){
      this.editDashboardName(node)
    }
  }
  deleteGroupFromTree(tree:any,id:any,level:any){

    if(tree){const index=tree.findIndex((e:any)=>e.Dashboard_Id==id)
  if(index!=-1){
    tree.splice(index,1)
    return tree
  }
  else{
    tree.forEach((dashboard:any)=>{
      dashboard.children=this.deleteGroupFromTree(dashboard.children,id,level+1)
    })
    return tree
  }}
  }
  openNewGroupFormRElation(node:any){
    if(!this.groupFormIsOpen){
      node.node.formIsOpened=!node.node.formIsOpened
      this.newGroupNameSide=""
    this.groupFormIsOpen=true}
  }
  deleteGroup(node:any){
    const  id=node.node.Dashboard_Id

    this.DashboardService.deleteDashboard(id).subscribe((res:any)=>{
        console.log(res);
        const dashboards=this.deleteGroupFromTree(this.dashboards,node.node.Dashboard_Id,0)
        this.dashboards=[]
        setTimeout(()=>{
          console.log('azaa');
          
          this.dashboards=dashboards
          
        },1)
      })
    
  }


 

getGraphsByDashboard(id:any){
this.DashboardService.getGraphsByDashboardId(id).subscribe((graphs:any)=>{
  this.graphs=graphs
  console.log(this.DashBoardSelected,this.graphs);
})
}


addNEwRElationGraph(){
  this.DashboardService.addGraphToDashboard(this.DashBoardSelected.Dashboard_Id,this.GraphID).subscribe((res:any)=>{
    console.log(res);
    const graph=this.graphsToAdd.find((e:any)=>e.Code_Id==Number(this.GraphID))
    this.graphsToAdd.splice(this.graphsToAdd.findIndex((e:any)=>e.Code_Id==Number(this.GraphID)),1)
    this.graphs.push(graph)
  })
}




getcode(index:any){
  this.codeGraph=this.graphs[index]
  this.showCodeIsOpen=true
  this.lotsOfTabs.push(this.codeGraph)
}


deselctAll(dashboards:any,id:any){
  dashboards.forEach((dashboard:any)=>{
    if(dashboard.Dashboard_Id!=id)
    dashboard.selected=false
    if(dashboard?.children?.length>0){
      this.deselctAll(dashboard.children,id)
    }
  })
}
  selectGroup(node:any){
   
    this.deselctAll(this.dashboards,node.node.Dashboard_Id)
      node.node.selected=!node.node.selected
    if(node.node.selected){
    this.DashBoardSelected=node.node
    this.graphs=[]
    this.graphsToAdd=[]
    this.getGraphsByDashboard(node.node.Dashboard_Id)
    }
    else{
    
    this.DashBoardSelected=null
    this.graphs=[]
      
    }

    
    
  }
  addNewGroupWithRelation(node:any){
    if(this.newGroupNameSide!=""){
      const dashboard={
        Owner:this.userId,
        Dashboard_Name:this.newGroupNameSide,
        Sub_dashboard:node.node.Dashboard_Id

      }
      this.DashboardService.addNewDashboard(dashboard).subscribe((NewDashboard:any)=>{
        console.log(NewDashboard);
        
        if(NewDashboard!='error'){
          NewDashboard['selected']=false
          NewDashboard['selectedToForm']=false
          NewDashboard['children']=[]
          NewDashboard['formIsOpened']=false
          NewDashboard['editForm']=false
          if(node.node.children==null)
          node.node['children']=[]
          node.node.children.push(NewDashboard)
          const dashboardsC=this.dashboards
          this.dashboards=[]
          setTimeout(()=>{
            this.dashboards=dashboardsC
          },1)
        }
        this.cancelAddingGroup(node)
      })
    }
  }
  cancelAddingGroup(node:any){
    node.node.formIsOpened=!node.node.formIsOpened
    this.newGroupNameSide=""
  this.groupFormIsOpen=false
  }
  addGroupSide(){
    if(this.newGroupNameSide!=""){
      const Dashboard={
        Dashboard_Name:this.newGroupNameSide,
        Owner:this.userId,
        Sub_dashboard:null
      }
      this.DashboardService.addNewDashboard(Dashboard).subscribe((NewDashboard:any)=>{
        console.log(NewDashboard);
        
        if(NewDashboard!='error'){       
          NewDashboard['selected']=false
          NewDashboard['selectedToForm']=false
          NewDashboard['children']=[]
          NewDashboard['formIsOpened']=false
          NewDashboard['editForm']=false
          if(this.dashboards==null){
            this.dashboards=[]
          }
          this.dashboards.push(NewDashboard)
          const dashboardC=this.dashboards
          this.dashboards=[]
          setTimeout(()=>{
            this.dashboards=dashboardC
          },1)
        }
        this.openSideGroupForm()
      })
    }
  }






  
  openSideGroupForm(){
    this.newGroupNameSide=""
    this.groupFormIsOpenSide=!this.groupFormIsOpenSide
  }
  functionToDoOnGroup(choice:any){
    if(choice=='edit'){
      this.canEdit=!this.canEdit
      }
      else if(choice=='delete'){
        this.canDelete=!this.canDelete
      }
      else if(choice=='add'){
       this.canAddRelation=!this.canAddRelation
      }
  }

  getData(){
    this.AuthService.loadUser()
    this.userId=this.AuthService.authenticatedUser.U_Id
    this.DashboardService.getDashboardByUser(this.userId).subscribe((dashboards:any)=>{
      this.dashboards=dashboards
      console.log(dashboards)
    })
  }
}
