import { Component, OnInit ,Input,Output,EventEmitter } from '@angular/core';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';
import * as XLSX from 'xlsx'


@Component({
  selector: 'app-choices-pop-up',
  templateUrl: './choices-pop-up.component.html',
  styleUrls: ['./choices-pop-up.component.css']
})
export class ChoicesPopUpComponent implements OnInit {

  constructor(
    
    private FormulaireService:FormulaireService,
  ) { }
  @Input() ChoicesPopUp:boolean=false
  @Input() FieldId:any
  @Output() closePopUp = new EventEmitter<any>();

  ChoicesItems:any=[]
  FieldsReferences:any=[]
  choicesItemsIsOpen:boolean=false;
  fieldReferencesIsOpen:boolean=false
  addChoiceItemForm:boolean=false
  newChoiceItem:any=''

  addReferenceForm:boolean=false
  formToChoose:any=[]
  tabToChoose:any=[]
  fieldToChoose:any=[]
  
  formId:any=''
  tabId:any=''
  newRef:any=''
  


  fileColNames:any=[]
  fileData:any=[]
  fileColChosen:any=''
  chooseParmFile:boolean=false


  groupId:any=''
  groups:any[]=[]


  referenceTabIsOpen:boolean=false;
  referenceId:any=null;
  canUpDateField:boolean=true;
  choiceToReferId:any=null;
  ngOnInit(): void {
    console.log(this.FieldId);
    this.getData()
    
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




  openReferenceTab(){
this.FormulaireService.getChoicesFromField(this.FieldId).then((choices:any)=>{
  const choiceToWorkOn=this.returnReference(choices)
  if(choiceToWorkOn!=null){
this.FormulaireService.getFieldReference(choiceToWorkOn.Choice_Id).then((field:any)=>{

  this.referenceId=field.Field_Id;
  this.choiceToReferId=choiceToWorkOn.Choice_Id;
  this.canUpDateField=this.referenceId==null;
  this.referenceTabIsOpen=true;
})
}
else{
  this.referenceId=null;
this.choiceToReferId=null;
this.canUpDateField=this.referenceId==null;
this.referenceTabIsOpen=true;
}
})
  }


  closeReferenceTab(){
this.referenceTabIsOpen=false;
  }
  

  getForms(){
    const group={
      groups:[Number(this.groupId)]
    }
    this.FormulaireService.getFormsByGroups(group).subscribe((forms:any)=>{
      this.formToChoose=forms
      this.formId=""
      this.tabId=""
      this.newRef=""
      this.tabToChoose=[]
      this.fieldToChoose=[]
    })
  }

  openParmFile(){
    this.chooseParmFile=!this.chooseParmFile
  }

 
  getTables(){
    this.FormulaireService.getTables(Number(this.formId)).then((tabs:any)=>{
      this.tabToChoose=tabs
      this.tabId=''
      this.fieldToChoose=[]
      this.newRef=''
    })
  }


  getFields(){
    this.FormulaireService.getAllFields(Number(this.tabId)).then((fields:any)=>{
      this.fieldToChoose=fields
      this.newRef=''
    })
  }

  

  openReferenceForm(){
    this.addReferenceForm=!this.addReferenceForm
    this.formId=''
    this.tabId=''
    this.newRef=''
    this.groupId=''
  }




 


  close(){
    this.closePopUp.emit(false) 
  }

  openFieldReferencesList(){
    this.fieldReferencesIsOpen=!this.fieldReferencesIsOpen
  }

  openChoicesItemsList(){
    this.choicesItemsIsOpen=!this.choicesItemsIsOpen
  }




  getData(){
    this.FormulaireService.getChoicesFromField(this.FieldId).then((choices:any)=>{
      this.ChoicesItems=choices.filter((e:any)=>e.fieldFromTable==null)
      this.FieldsReferences=choices.filter((e:any)=>e.choiceItem==null)
      let names:any[]=[]
      this.FieldsReferences.forEach((choice:any)=>{
        this.FormulaireService.giveInformationOnChoice(choice).subscribe((res:any)=>{
          names.push(res)
        })
      })
      this.FieldsReferences=names
      this.FormulaireService.getGroups().subscribe((groups:any)=>{
        this.groups=groups
      })
      console.log(choices,this.ChoicesItems,this.FieldsReferences);
      
    })
  }

}
