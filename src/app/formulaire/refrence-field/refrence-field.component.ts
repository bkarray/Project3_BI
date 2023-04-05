import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';
@Component({
  selector: 'app-refrence-field',
  templateUrl: './refrence-field.component.html',
  styleUrls: ['./refrence-field.component.css']
})
export class RefrenceFieldComponent implements OnInit {

  constructor(
    private FormulaireService:FormulaireService,
  ) { }
  @Input() fieldStartId:any=null
  @Input() fieldRefersId:any=null
  @Input() choiceId:any=null
  @Input() canUpDateField:boolean=false
  @Output() closePopUp=new EventEmitter<any>()



  ChoiceShownId:any=null
  fieldStart:any={}
  fieldRefers:any={}
  formToChoose:any=[]
  tabToChoose:any=[]
  fieldToChoose:any=[]
  formId:any=''
  tabId:any=''
  newRef:any=''
  fieldsToChooseShow:any[]=[]

  RecentFields:any[]=[]

  levelAdvancement:number=0
  ngOnInit(): void {
    this.getData(this.fieldStartId,this.fieldRefersId)
    this.getForms()
  }
  close(){
    this.closePopUp.emit(false)
  }

  getForms(){
    this.FormulaireService.getAllFormulaire().subscribe((forms:any)=>{
      this.formToChoose=forms
      this.formId=""
      this.tabId=""
      this.newRef=""
      this.tabToChoose=[]
      this.fieldToChoose=[]
    })
  }
  getTables(){
    this.FormulaireService.getTables(Number(this.formId)).subscribe((tabs:any)=>{
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
  
  createGenerateRelation(){
    if(this.newRef!=''){
      let newChoice={
        Choice_of_field:Number(this.fieldStartId),
        fieldFromTable:Number(this.newRef),
        choiceItem:null
      }
      this.FormulaireService.creatChoice(newChoice).subscribe((choice:any)=>{
        this.choiceId=choice.Choice_Id
        this.FormulaireService.giveInformationOnChoice(choice).subscribe((correctedChoice:any)=>{
          this.FormulaireService.getOneField(Number(this.newRef)).subscribe((field:any)=>{
            this.fieldRefers=field
            this.canUpDateField=false
            this.FormulaireService.getAllFields(field.Table_Id).then((fields:any)=>{
              fields.forEach((field:any)=>{
                if(this.fieldRefers.Name!=field.Name){
                field['selected']=false
                this.fieldsToChooseShow.push(field)}
              })
              
            })
          })
        })
      })
    }
  }
  
  removeAllReferences(fieldId:any){
    this.FormulaireService.getFieldsInReference(fieldId).then((fields:any)=>{
      fields.forEach((field:any)=>{
        this.FormulaireService.verifiesFieldView(this.choiceId,field.Field_Id).then((result:any)=>{
          
          if(result=="selected"){
            this.FormulaireService.removeFieldToView(this.choiceId,field.Field_Id).subscribe((res:any)=>{
          if(field.Type=="list"){
            this.removeAllReferences(field.Field_Id)
          }
        })
      }
    })
  })
})
  }

  addOrRemoveField(event:any,index:any){
    console.log(event.target.checked);
    
    this.fieldsToChooseShow[index].selected=event.target.checked
if(event.target.checked){
  this.FormulaireService.addFieldToView(this.choiceId,this.fieldsToChooseShow[index].Field_Id).subscribe((res:any)=>{
    console.log(res);
    
  })

}
else{
  this.FormulaireService.removeFieldToView(this.choiceId,this.fieldsToChooseShow[index].Field_Id).subscribe((res:any)=>{
    if(this.fieldsToChooseShow[index].Type=="list"){
      this.removeAllReferences(this.fieldsToChooseShow[index].Field_Id)
    }
    
  })
}
}



getDataFieldsToShow(data:any[]){
  if(data.length!=0){
    data.forEach((fieldG:any)=>{
      if(fieldG.Type!='list'){
        fieldG['children']=[]
      }
      else{
        fieldG['children']=[]
        this.FormulaireService.getFieldsInReference(fieldG.Field_Id).then((fields:any)=>{

          fields.forEach((field:any)=>{
            this.FormulaireService.verifiesFieldView(this.choiceId,field.Field_Id).then((result:any)=>{

              field['selected']=result=="selected"
              fieldG['children'].push(field)
            })
          })
          this.getDataFieldsToShow(fieldG['children'])
        })
      }
    })
  }
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
  




  
  nextReferenceToSee(field:any){
  this.FormulaireService.getChoicesFromField(field.Field_Id).then((choices:any)=>{
    const choiceToWorkOn=this.returnReference(choices)

if(choiceToWorkOn){   
   this.FormulaireService.getFieldReference(choiceToWorkOn.Choice_Id).then((fieldEnd:any)=>{
    this.levelAdvancement++;
    this.ChoiceShownId=choiceToWorkOn.Choice_Id
    this.fieldsToChooseShow=[]
    this.RecentFields.push(this.fieldStart)
    this.getData(field.Field_Id,fieldEnd.Field_Id)
    })}
  })
}

returnByOneLevel(){

if(this.levelAdvancement>0)  {  
  const backField=this.RecentFields[this.RecentFields.length-1].Field_Id
  this.FormulaireService.getChoicesFromField(backField).then((choices:any)=>{
    const choiceToWorkOn=this.returnReference(choices)

if(choiceToWorkOn){   
   this.FormulaireService.getFieldReference(choiceToWorkOn.Choice_Id).then((fieldEnd:any)=>{
    this.levelAdvancement--;
    this.ChoiceShownId=choiceToWorkOn.Choice_Id
    this.fieldsToChooseShow=[]
    this.RecentFields.splice(-1)
    this.getData(backField,fieldEnd.Field_Id)
    })}
  })
}
}

  getData(idStart:any,idEnd:any){
    console.log(idStart,idEnd);
    
      this.FormulaireService.getOneField(idStart).subscribe((fieldStart:any)=>{
        this.fieldStart=fieldStart
        console.log("hello",this.fieldStart);
        
        if(!this.canUpDateField){
          this.FormulaireService.getOneField(idEnd).subscribe((fieldRef:any)=>{
            this.fieldRefers=fieldRef
            this.FormulaireService.getAllFields(fieldRef.Table_Id).then((fields:any)=>{
              fields.forEach((field:any)=>{
                this.FormulaireService.verifiesFieldView(this.choiceId,field.Field_Id).then((result:any)=>{

                  field['selected']=result=="selected"
                })
                if(this.fieldRefers.Name!=field.Name)
                this.fieldsToChooseShow.push(field)
              })
              this.getDataFieldsToShow(this.fieldsToChooseShow)
              console.log(this.fieldsToChooseShow);
              
            })
          })
        }
      })
   
  }
}
