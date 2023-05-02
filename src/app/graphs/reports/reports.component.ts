import { Component, OnInit,Input } from '@angular/core';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';
import { GraphsService } from 'src/app/services/Graphs/graphs.service';
import { AuthService } from 'src/app/services/auth/authservice';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(
    private FormulaireService:FormulaireService,
    private GraphsService:GraphsService,
    private AuthService:AuthService
  ) { }


  @Input() codeGraph:any={}
  reports:any[]=[]
  decisions:any[]=[]
  actions:any[]=[]
  users:any[]=[]

  reportSelected:any=null
  decisionSelected:any=null
  actionSelected:any=null


  titleSelected:any=''
  descriptionSelected:any=''


  newFormIsOpen:boolean=false
  messageOfAdding:any=''

  newActionParam:any={}


  ngOnInit(): void {
    this.getData()
  }

  editModeIsOpen(){
    return (this.reportSelected!=null)||(this.newFormIsOpen)
  }

  selectReport(index:any){
    this.reports.map((report:any)=>{
      report.selected=false
    })
    this.reports[index].selected=!this.reports[index].selected
    if(this.reports[index].selected){
      this.newFormIsOpen=false
    this.reportSelected=this.reports[index]
    this.titleSelected=this.reportSelected.report_Name
    this.descriptionSelected=this.reportSelected.Content
  this.GraphsService.getDecisions(this.reportSelected.Decisions).subscribe((decisions:any)=>{
    decisions.map((decision:any)=>{
      decision['selected']=false
    })
    console.log(decisions);
    this.messageOfAdding=''
    this.decisions=decisions
    this.actions=[]
    this.decisionSelected=null
    this.actionSelected=null
  })
}
else{
  this.reportSelected=null
  this.decisions=[]
  this.actions=[]
  this.decisionSelected=null
  this.actionSelected=null
}

  }

  selectDecision(index:any){
    this.decisions[index].selected=!this.decisions[index].selected
    this.decisions.map((decision:any,i:any)=>{
      if(i!=index)
      decision.selected=false
    })
    this.messageOfAdding=''
    if(this.decisions[index].selected){
      this.decisionSelected=this.decisions[index]
      this.GraphsService.getActions(this.decisionSelected.Actions).subscribe((actions:any)=>{
        this.titleSelected=this.decisionSelected.Decision_Name
        this.descriptionSelected=this.decisionSelected.Description
        actions.map((action:any)=>{
          action['selected']=false

        })
        this.actions=actions
        this.actionSelected=null
      })
    }
    else{
      this.decisionSelected=null
      this.actionSelected=null
      this.actions=[]
      this.titleSelected=this.reportSelected.report_Name
      this.descriptionSelected=this.reportSelected.Content
    }
  }
  openDecisionForm(){
    this.newFormIsOpen=true
    this.messageOfAdding='new Decision'
    this.decisionSelected=null
    this.actionSelected=null
    this.actions=[]
    this.decisions.map((decision:any)=>{
      decision.selected=false
    })
    this.titleSelected=''
    this.descriptionSelected=''
    

  }

  openActionForm(){
    this.AuthService.getAllUsers().subscribe((users:any)=>{
      this.newFormIsOpen=true
      this.messageOfAdding='new Action'
      this.actionSelected={
        Responsible_Realization:null,
        Responsible_Validation:null,
        Date_Submission_Real:null,
        Date_Submission_Estimated:null,
        Date_Validation_Real:null,
        Date_Validation_Estimated:null,
        Documents_Submission:[],
        Documents_Validation:[]
      }
      this.actions.map((action:any)=>{
        action.selected=false
      })
      this.users=users
      this.titleSelected=''
      this.descriptionSelected=''
    })
  }


deleteCurrent(){
  if((this.actionSelected==null)&&(this.decisionSelected==null)&&(this.reportSelected!=null)){
    this.deleteReport()
  }
  else if ((this.actionSelected==null)&&(this.decisionSelected!=null)&&(this.reportSelected!=null)){
    this.deleteDecision()
  }
  else if ((this.actionSelected!=null)&&(this.decisionSelected!=null)&&(this.reportSelected!=null)){
    this.deleteAction()
  }
  }
  deleteAction(){
    this.GraphsService.deleteAction(this.actionSelected.Action_Id).subscribe((res:any)=>{
      this.actions.map((action:any)=>{
        action.selected=false
      })
      let index=this.actions.findIndex((e:any)=>e.Action_Id==this.actionSelected.Action_Id)
      this.actions.splice(index,1)
      this.decisionSelected.Actions=this.decisionSelected.Actions.filter((e:any)=>e!=this.actionSelected.Action_Id)
      const indexDecision=this.decisions.findIndex((e:any)=>e.Decision_Id==this.decisionSelected.Decision_Id)
      this.decisions[indexDecision].Actions=this.decisions[indexDecision].Actions.filter((e:any)=>e!=this.actionSelected.Action_Id)
        this.newFormIsOpen=false
      this.titleSelected=this.decisionSelected.Decision_Name
      this.descriptionSelected=this.decisionSelected.Description
      this.messageOfAdding=''
      this.actionSelected=null
    }
    )
  }


  deleteReport(){
    this.GraphsService.deleteReport(this.reportSelected.report_Id).subscribe((res:any)=>{
      this.reports.map((report:any)=>{
        report.selected=false
      })
      let index=this.reports.findIndex((e:any)=>e.report_Id==this.reportSelected.report_Id)
      this.reports.splice(index,1)
        this.newFormIsOpen=false
      this.reportSelected=null
      this.titleSelected=null
      this.descriptionSelected=null
      this.messageOfAdding=''
      this.decisions=[]
      this.actions=[]
      this.decisionSelected=null
      this.actionSelected=null
    }
    )
  }

  deleteDecision(){
    this.GraphsService.deleteDecision(this.decisionSelected.Decision_Id).subscribe((res:any)=>{
      this.decisions.map((decision:any)=>{
        decision.selected=false
      })
      let index=this.decisions.findIndex((e:any)=>e.Decision_Id==this.decisionSelected.Decision_Id)
      this.decisions.splice(index,1)
      this.reportSelected.Decisions=this.reportSelected.Decisions.filter((e:any)=>e!=this.decisionSelected.Decision_Id)
      const indexReport=this.reports.findIndex((e:any)=>e.report_Id==this.reportSelected.report_Id)
      this.reports[indexReport].Decisions=this.reports[indexReport].Decisions.filter((e:any)=>e!=this.decisionSelected.Decision_Id)
        this.newFormIsOpen=false
      this.titleSelected=this.reportSelected.report_Name
      this.descriptionSelected=this.reportSelected.Content
      this.messageOfAdding=''
      this.actions=[]
      this.decisionSelected=null
      this.actionSelected=null
    }
    )
  }
  openReportForm(){
    this.newFormIsOpen=true
    this.messageOfAdding='new Report'
    this.reportSelected=null
    this.decisionSelected=null
    this.actionSelected=null
    this.decisions=[]
    this.actions=[]
    this.reports.map((report:any)=>{
      report.selected=false
    })
    this.actions.map((action:any)=>{
      action.selected=false
    })
    this.decisions.map((decision:any)=>{
      decision.selected=false
    })
    this.titleSelected=''
    this.descriptionSelected=''

  }

  updateReportContent(name:any){
    let val={}
    if(!this.newFormIsOpen){
if(name=='Name'){
  val={
    report_Name:this.titleSelected
  }}
  else if(name=='Content'){
    val={
      Content:this.descriptionSelected
    }
  }
  this.GraphsService.updateReport(this.reportSelected.report_Id,val).subscribe((result:any)=>{
    const index=this.reports.findIndex((e:any)=>e.report_Id==this.reportSelected.report_Id)
    this.reports[index].report_Name=this.titleSelected
    this.reports[index].Content=this.descriptionSelected
  })}
}


updateDecisionContent(name:any){
  let val={}
  if(!this.newFormIsOpen){
if(name=='Name'){
val={
  Decision_Name:this.titleSelected
}}
else if(name=='Content'){
  val={
    Description:this.descriptionSelected
  }
}
this.GraphsService.updateDecision(this.decisionSelected.Decision_Id,val).subscribe((result:any)=>{
  const index=this.decisions.findIndex((e:any)=>e.Decision_Id==this.decisionSelected.Decision_Id)
  this.decisions[index].Decision_Name=this.titleSelected
  this.decisions[index].Description=this.descriptionSelected
})}
}


updateContent(key:any){
  if((this.actionSelected==null)&&(this.decisionSelected==null)&&(this.reportSelected!==null)){
    this.updateReportContent(key)
  }
  else if((this.decisionSelected!=null)&&(this.actionSelected==null)){
    this.updateDecisionContent(key)
  }
  else if((this.decisionSelected!=null)&&(this.actionSelected!=null)){
    this.updateActionContent(key)
  }
}
  
  

  getData(){
    console.log(this.codeGraph.Reports);
    
    this.GraphsService.getReports(this.codeGraph.Reports).subscribe((reports:any)=>{
      reports.map((report:any)=>{
        report['selected']=false
      })
      this.reports=reports
    })

  }


  createReport(){
    if((this.titleSelected!='')&&(this.descriptionSelected!='')){
      const newReport={
        report_Name:this.titleSelected,
        Content:this.descriptionSelected,
        Decisions:[]
      }
      
      this.GraphsService.addNewReport(this.codeGraph.Code_Id,newReport).subscribe((report:any)=>{
        console.log(report);
        
        report['selected']=true
        this.newFormIsOpen=false
        this.messageOfAdding=''
        this.reportSelected=report
        this.decisionSelected=null
        this.actionSelected=null
        this.reports.map((report:any)=>{
          report.selected=false
        })
        this.actions.map((action:any)=>{
          action.selected=false
        })
        this.decisions.map((decision:any)=>{
          decision.selected=false
        })
        this.titleSelected=report.report_Name
        this.descriptionSelected=report.Content
        this.reports.push(report)
      })
    }
  }
  createNewDecision(){
    if((this.titleSelected!='')&&(this.descriptionSelected!='')){
      const newDecision={
        Decision_Name:this.titleSelected,
        Description:this.descriptionSelected,
        Actions:[]
      }
      
      this.GraphsService.addNewDecision(this.reportSelected.report_Id,newDecision).subscribe((decision:any)=>{
        console.log(decision);
        
        decision['selected']=true
        this.newFormIsOpen=false
        this.messageOfAdding=''
        this.decisionSelected=decision
        this.actionSelected=null
        this.decisions.map((decision:any)=>{
          decision.selected=false
        })
        const index=this.reports.findIndex((e:any)=>e.report_Id==this.reportSelected.report_Id)
        this.reports[index].Decisions.push(decision['Decision_Id'])
        this.reportSelected.Decisions.push(decision['Decision_Id'])
        this.titleSelected=decision.Decision_Name
        this.descriptionSelected=decision.Description
        this.decisions.push(decision)
      })
    }
  }
  createNewInstance(){
    if((this.reportSelected==null)&&(this.decisionSelected==null)&&(this.actionSelected==null))
    this.createReport()
    else if((this.reportSelected!=null)&&(this.decisionSelected==null)&&(this.actionSelected==null))
    this.createNewDecision()
    else if((this.reportSelected!=null)&&(this.decisionSelected!=null)&&(this.actionSelected!=null))
    this.createAction()
  }


  createAction(){
    if((this.titleSelected!='')&&(this.descriptionSelected!='')){
    this.actionSelected['Action_Name']=this.titleSelected
    this.actionSelected['Description']=this.descriptionSelected
    
      this.GraphsService.addNewAction(this.decisionSelected.Decision_Id,this.actionSelected).subscribe((action:any)=>{
        console.log(action);
        
        action['selected']=true
        this.newFormIsOpen=false
        this.messageOfAdding=''
        this.actionSelected=action
        this.actions.map((action:any)=>{
          action.selected=false
        })
        const index=this.decisions.findIndex((e:any)=>e.Decision_Id==this.decisionSelected.Decision_Id)
        this.decisions[index].Actions.push(action['Action_Id'])
        this.decisionSelected.Actions.push(action['Action_Id'])
        this.titleSelected=action.Action_Name
        this.descriptionSelected=action.Description
        this.actions.push(action)
      })
    }
  }

  selectAction(index:any){

    this.actions.map((action:any,i:any)=>{
      if(index!=i)
      action.selected=false
    })
    this.messageOfAdding=''
    this.actions[index].selected=!this.actionSelected
    if(this.actions[index].selected){
      this.actionSelected=this.actions[index]
      this.AuthService.getAllUsers().subscribe((users:any)=>{
        this.users=users
        this.titleSelected=this.actionSelected.Action_Name
        this.descriptionSelected=this.actionSelected.Description
        
      })
      
    }
    else{
      this.actionSelected=null
        this.users=[]
        this.titleSelected=this.decisionSelected.Decision_Name
        this.descriptionSelected=this.decisionSelected.Description
        
      
    }
  }


  changeValueActionParm(key:any){
    if(!this.newFormIsOpen){
    let update:any={}
    update[key]=this.actionSelected[key]
    if((key=='Responsible_Realization')||(key=='Responsible_Validation')){
      update[key]=Number(update[key])
    }
    this.GraphsService.updateAction(this.actionSelected.Action_Id,update).subscribe((res:any)=>{
      console.log(res);
      
    })}
  }

  updateActionContent(name:any){
    let val={}
    if(!this.newFormIsOpen){
      if(name=='Name'){
      val={
        Action_Name:this.titleSelected
      }}
      else if(name=='Content'){
        val={
          Description:this.descriptionSelected
        }
      }
      this.GraphsService.updateAction(this.actionSelected.Action_Id,val).subscribe((result:any)=>{
        const index=this.actions.findIndex((e:any)=>e.Action_Id==this.actionSelected.Action_Id)
        this.actions[index].Action_Name=this.titleSelected
        this.actions[index].Description=this.descriptionSelected
      })}
  }




}
