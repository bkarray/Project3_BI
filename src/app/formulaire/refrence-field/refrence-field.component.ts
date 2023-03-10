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
  @Input() fieldStartId:any={}
  @Input() fieldRefersId:any={}
  @Input() canUpDateField:boolean=false
  @Output() closePopUp=new EventEmitter<any>()


  fieldStart:any={}
  fieldRefers:any={}
  groupsToChoose:any=[]
  formToChoose:any=[]
  tabToChoose:any=[]
  fieldToChoose:any=[]
  groupId:any=''
  formId:any=''
  tabId:any=''
  newRef:any=''

  fieldsToChooseShow:any[]=[]
  ngOnInit(): void {
    this.getData()
  }
  close(){
    this.closePopUp.emit(false)
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
        this.FormulaireService.giveInformationOnChoice(choice).subscribe((correctedChoice:any)=>{
          this.FormulaireService.getOneField(Number(this.newRef)).subscribe((field:any)=>{
            this.fieldRefers=field
            this.canUpDateField=false
            this.FormulaireService.getAllFields(field.Table_Id).then((fields:any)=>{
              fields.forEach((field:any)=>{
                field['selected']=false
                this.fieldsToChooseShow.push(field)
              })
              
            })
          })
        })
      })
    }
  }

  getData(){
    this.FormulaireService.getGroups().subscribe((groups:any)=>{
      this.groupsToChoose=groups
      this.FormulaireService.getOneField(this.fieldStartId).subscribe((fieldStart:any)=>{
        this.fieldStart=fieldStart
        console.log("hello",this.fieldStart);
        
        if(!this.canUpDateField){
          this.FormulaireService.getOneField(this.fieldRefersId).subscribe((fieldRef:any)=>{
            this.fieldRefers=fieldRef
            this.FormulaireService.getAllFields(fieldRef.Table_Id).then((fields:any)=>{
              fields.forEach((field:any)=>{
                field['selected']=false
                this.fieldsToChooseShow.push(field)
              })
            })
          })
        }
      })
    })
  }
}
