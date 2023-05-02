import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/authservice';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';
import { GraphsService } from 'src/app/services/Graphs/graphs.service';
@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.css']
})
export class DataAnalysisComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private FormulaireService:FormulaireService,
    private GraphsService:GraphsService
  ) { }
showCodeIsOpen:boolean=false
addCodeFormIsOpen:boolean=false
responseSelected:any=0
codeGraph:any={}


groupsMatrix:any[]=[]
forms:any=[]
responses:any=[]
graphs:any[]=[]
canAdd:boolean=false
ngOnInit(): void {
  this.getData()
}

openCode(){
  this.codeGraph={}
  
  this.GraphsService.getCodes(this.responseSelected).subscribe((graphs:any)=>{
    this.showCodeIsOpen=!this.showCodeIsOpen
    this.graphs=graphs
  })
}

openAddCode(){
  this.GraphsService.getCodes(this.responseSelected).subscribe((graphs:any)=>{
    this.addCodeFormIsOpen=!this.addCodeFormIsOpen
    this.graphs=graphs
  })
}

addCode(){
  this.addCodeFormIsOpen=!this.addCodeFormIsOpen
}

selectGroup(groupSelected:any,index:any){
  groupSelected.selected=!groupSelected.selected
  

if(groupSelected.selected){
    this.groupsMatrix[index].map((group:any)=>{
    if(group.Group_Id!=groupSelected.Group_Id)
    group.selected=false
  })
  this.FormulaireService.getGroupRelated(groupSelected.Group_Id).subscribe((groups:any)=>{
    groups.map((group:any)=>{
      group['selected']=false
    })
    if(index+1<this.groupsMatrix.length){
    this.groupsMatrix[index+1]=groups
    for(let i=index+2;i<this.groupsMatrix.length;i++){
      this.groupsMatrix[i]=[]
    }
  }
  this.FormulaireService.getFormsByGroupId(groupSelected.Group_Id).subscribe((forms:any)=>{
    forms.map((form:any)=>{
      form['selected']=false
    })
    this.forms=forms
    this.responses=[]
    this.graphs=[]
    this.canAdd=false
    this.responseSelected=0
  })
  })}
  else{
    this.forms=[]
    this.responses=[]
    this.graphs=[]
    this.canAdd=false
    this.responseSelected=0
    for(let i=index+1;i<this.groupsMatrix.length;i++){
      this.groupsMatrix[i]=[]
    }
  }


}

selectFrom(form:any){
form.selected=!form.selected
if(form.selected){
  console.log('heeeeee');
  
  this.FormulaireService.getReponsesByFormulaire(form.Formulaire_Id,0).subscribe((responses:any)=>{
    responses.map((response:any)=>{
      response['selected']=false
    })
    this.responses=responses
    this.graphs=[]
    this.canAdd=false
    this.responseSelected=0
  })
}
else{
  this.responses=[]
  this.graphs=[]
  this.canAdd=false
  this.responseSelected=0
}
}
getcode(index:any){
  this.codeGraph=this.graphs[index]
  this.showCodeIsOpen=!this.showCodeIsOpen
    }

selectResponse(response:any){
response.selected=!response.selected
if(response.selected){
  this.GraphsService.getCodes(response.Reponse_Id).subscribe((graphs:any)=>{
this.graphs=graphs
this.canAdd=true
this.responseSelected=response.Reponse_Id
  })
}
else{
  this.graphs=[]
  this.canAdd=false
  this.responseSelected=0
}
}


  
  getData(){
    this.authService.loadUser();
   this.FormulaireService.depthGroupsTree().subscribe((count:any)=>{
   
        this.FormulaireService.getFirstOrderGroups().then((groups:any)=>{
          
          groups.map((group:any)=>{
            group['selected']=false
          })
          this.groupsMatrix.push(groups)
          for (let index = 1; index < count; index++) {
            this.groupsMatrix.push([])
          }
        })
      

    console.log(this.groupsMatrix);
    
   })
  }

}
