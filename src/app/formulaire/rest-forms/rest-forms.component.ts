import { Component, OnInit ,Input,EventEmitter,Output} from '@angular/core';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';
@Component({
  selector: 'app-rest-forms',
  templateUrl: './rest-forms.component.html',
  styleUrls: ['./rest-forms.component.css']
})
export class RestFormsComponent implements OnInit {

  constructor(
    public FormulaireService:FormulaireService
  ) { }
@Input() groupsSelected:any[]=[]
@Output() closePopUp=new EventEmitter<any>()


formsToBeAdded:any[]=[]
formsHere:any[]=[]
addFormIsOpen:boolean=false
newFormId:any=''



groupsToHelp:any[]=[]
newGroupToHelp:any=''
FormToBeDeleted:any=0
  ngOnInit(): void {
    this.getData()
  }
  openAddForm(){
    const groups={
      groups:this.groupsSelected
    }
    this.FormulaireService.getRestForms(groups).subscribe((forms:any)=>{
      console.log(this.formsHere);
      
      this.formsToBeAdded=forms.filter((e:any)=>!this.formsHere.find((e1:any)=>e1.Formulaire_Id==e.Formulaire_Id))
      if(this.formsToBeAdded.length!=0){
      this.newFormId=''
      this.addFormIsOpen=!this.addFormIsOpen}
      else{
        this.formsToBeAdded=[]
      }
    })
  }


  deleteRelation(index:any){
    const formId=this.formsHere[index].Formulaire_Id
this.FormulaireService.checkFormGroups(formId).subscribe((groups:any)=>{

    this.groupsSelected.forEach((groupId:any)=>{
      this.FormulaireService.deleteGroupFormRelation(groupId,formId).subscribe((res:any)=>{
        console.log(res);
      })
    })
    this.formsHere.splice(index,1)

})
  }


  closeDeletePop(){
    this.FormToBeDeleted=0
    this.groupsToHelp=[]
  }
  ConfirmDelete(){
    if(this.newGroupToHelp!=""){
      const relation={
        Group_Id:Number(this.newGroupToHelp),
        Formulaire_Id:Number(this.FormToBeDeleted)
      }
      this.FormulaireService.createRelationFormGroup(relation).then((res:any)=>{
        console.log(res);
        this.groupsSelected.forEach((groupId:any)=>{
          this.FormulaireService.deleteGroupFormRelation(groupId,this.FormToBeDeleted).subscribe((res:any)=>{
            console.log(res);
          })
        })
        const index=this.formsHere.findIndex((e:any)=>e.Formulaire_Id==this.FormToBeDeleted)
        this.formsHere.splice(index,1)
        this.closeDeletePop()
      })
    }
  }
  addNewForm(){
    console.log(this.newFormId);
    
    if(this.newFormId!=''){
          this.groupsSelected.forEach((groupId:any)=>{

      const relation={
        Group_Id:Number(groupId),
        Formulaire_Id:Number(this.newFormId)
      }
      this.FormulaireService.createRelationFormGroup(relation).then((res:any)=>{
        console.log(res);
        
        this.closeAddForm()
        this.getData()
      })
    })}
  }

  closeAddForm(){
    this.formsToBeAdded=[]
    this.newFormId=''
    this.addFormIsOpen=!this.addFormIsOpen
  }

  close(){
    this.closePopUp.emit(this.groupsSelected);
  }


getData(){
  const groups={
    groups:this.groupsSelected
  }

    this.FormulaireService.getFormsByGroups(groups).subscribe((formsHere:any)=>{
      this.formsHere=[]
      console.log(formsHere)
      this.formsHere=formsHere

  })
}

}
