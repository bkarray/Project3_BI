import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { GraphsService } from 'src/app/services/Graphs/graphs.service';

@Component({
  selector: 'app-consequences',
  templateUrl: './consequences.component.html',
  styleUrls: ['./consequences.component.css']
})
export class ConsequencesComponent implements OnInit {
  constructor(
    private GraphsService:GraphsService
  ) { }
  @Input() codeGraph:any={}
  @Output() openGraphTab=new EventEmitter<any>()
consequences:any[]=[]
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
  createConsequence(){
    if(this.codeToAddId!=0){
      this.GraphsService.addConsequenceToCode(this.codeGraph.Code_Id,this.codeToAddId).subscribe((response:any)=>{
        this.codeGraph.Consequences.push(this.codeToAddId)
        const code=this.codesToChoose.find((code:any)=>code.Code_Id==this.codeToAddId)
        this.consequences.push(code)
        this.selectResponseIsOpen=false
        this.codeToAddId=0
        this.codesToChoose=[]

      }
      )
    }
  }

chooseGraphToAdd(graph:any){
  this.openGraphTab.emit(graph)
}


  openDelete(){
    this.canDelete=!this.canDelete
  }
  deleteConsequence(consequenceIndex:any){
    const consequenceId=this.consequences[consequenceIndex].Code_Id
    this.GraphsService.deleteConsequenceFromCode(this.codeGraph.Code_Id,consequenceId).subscribe((response:any)=>{
      this.consequences.splice(consequenceIndex,1)
      this.codeGraph.Consequences.splice(consequenceIndex,1)
    })
  }
  getData(){
  
  this.GraphsService.getCausesOrConsequences(this.codeGraph.Consequences).subscribe((graphs:any)=>{
  console.log(graphs);
  this.consequences=graphs
  
  })
}

}
