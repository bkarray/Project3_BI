import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { GraphsService } from 'src/app/services/Graphs/graphs.service';

@Component({
  selector: 'app-causes',
  templateUrl: './causes.component.html',
  styleUrls: ['./causes.component.css']
})
export class CausesComponent implements OnInit {

  constructor(
    private GraphsService:GraphsService
  ) { }
  @Input() codeGraph:any={}
  @Output() openGraphTab=new EventEmitter<any>()
  causes:any[]=[]
  codesToChoose:any[]=[]
  selectResponseIsOpen:boolean=false
  codeToAddId:any=0
  canDelete:boolean=false
  ngOnInit(): void {
    this.getData()
  }

  openSelectResponse(){
    this.selectResponseIsOpen=!this.selectResponseIsOpen
    this.codesToChoose=[]
  }


  chooseGraphToAdd(graph:any){
    this.openGraphTab.emit(graph)
  }
openDelete(){
  this.canDelete=!this.canDelete
}
deleteCause(causeIndex:any){
  const causeId=this.causes[causeIndex].Code_Id
  this.GraphsService.deleteCauseFromCode(this.codeGraph.Code_Id,causeId).subscribe((response:any)=>{
    this.causes.splice(causeIndex,1)
    this.codeGraph.Causes.splice(causeIndex,1)
  })
}

  getNewResponseId(event:any){
    if(event!=0){
      this.GraphsService.getCodes(event).subscribe((codes:any)=>{
        this.codesToChoose=codes;
      })
    }
    else{
      this.codesToChoose=[]
    }
  }
  createCause(){
    if(this.codeToAddId!=0){
      this.GraphsService.addCauseToCode(this.codeGraph.Code_Id,this.codeToAddId).subscribe((response:any)=>{
        this.codeGraph.Causes.push(this.codeToAddId)
        const code=this.codesToChoose.find((code:any)=>code.Code_Id==this.codeToAddId)
        this.causes.push(code)
        this.selectResponseIsOpen=false
        this.codeToAddId=0
        this.codesToChoose=[]

      }
      )
    }
  }

  getData(){
  
  this.GraphsService.getCausesOrConsequences(this.codeGraph.Causes).subscribe((graphs:any)=>{
  console.log(graphs);
  this.causes=graphs
  
  })
}
}