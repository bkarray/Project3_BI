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
  ngOnInit(): void {
    console.log(this.FieldId);
    this.getData()
    
  }
  loadDataExcel(){
    if(this.fileColChosen!=''){
      this.fileData.forEach((row:any)=>{
        if(row[this.fileColChosen]&&(this.ChoicesItems.findIndex((e:any)=>e['choiceItem']==row[this.fileColChosen])==-1)){
          let newChoice={
            Choice_of_field:this.FieldId,
            fieldFromTable:null,
            choiceItem:row[this.fileColChosen]
          }
          console.log(newChoice);
          
          this.FormulaireService.creatChoice(newChoice).subscribe((choice:any)=>{
            console.log(choice);
            
            this.ChoicesItems.push(choice)
          })
        }
      })
      this.openFormChoiceItem()
      this.fileColChosen=''
      this.fileData=[]
      this.fileColNames=[]
      this.chooseParmFile=false
    }
  }

  ReadExcel(event:any){
    let file=event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);


    fileReader.onload=(e:any)=>{
      var workBook=XLSX.read(fileReader.result,{type:'binary'});
      var sheetNames=workBook.SheetNames;
      let data=XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]])
      data.forEach((lig:any)=>{
        let cols=Object.keys(lig)
        cols.forEach((col:any)=>{
          let index=this.fileColNames.findIndex((e:any)=>e==col)
          if(index==-1){
            this.fileColNames.push(col)
          }
        })
      })
      this.fileData=data
      this.chooseParmFile=true
      
    }
  }
  getTables(){
    this.FormulaireService.getTables(Number(this.formId)).subscribe((tabs:any)=>{
      this.tabToChoose=tabs
      this.tabId=''
      this.fieldToChoose=[]
      this.newRef=''
    })
  }
  createRef(){
    if(this.newRef!=''){
      let newChoice={
        Choice_of_field:this.FieldId,
        fieldFromTable:Number(this.newRef),
        choiceItem:null
      }
      this.FormulaireService.creatChoice(newChoice).subscribe((choice:any)=>{
        this.FormulaireService.giveInformationOnChoice(choice).subscribe((correctedChoice:any)=>{
          this.FieldsReferences.push(correctedChoice)
        })
      })
    }
    this.openReferenceForm()
  }

  getFields(){
    this.FormulaireService.getAllFields(Number(this.tabId)).subscribe((fields:any)=>{
      this.fieldToChoose=fields
      this.newRef=''
    })
  }

  

  openReferenceForm(){
    this.addReferenceForm=!this.addReferenceForm
    this.formId=''
    this.tabId=''
    this.newRef=''
  }


  openFormChoiceItem(){
    this.addChoiceItemForm=!this.addChoiceItemForm
    this.newChoiceItem=''
  }

  addChoiceItem(){
    if(this.newChoiceItem!=''){
      let newChoice={
        Choice_of_field:this.FieldId,
        fieldFromTable:null,
        choiceItem:this.newChoiceItem
      }
      console.log(newChoice);
      
      this.FormulaireService.creatChoice(newChoice).subscribe((choice:any)=>{
        console.log(choice);
        
        this.ChoicesItems.push(choice)
      })

    }

    this.openFormChoiceItem()
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
  correctChoice(Choice_Id:any,newVal:any){
    let updateChoice={
      Choice_Id:Choice_Id,
      Val:newVal
    }
    this.FormulaireService.correctChoice(updateChoice).subscribe((res:any)=>{
      console.log(res);
    })
  }

  deleteChoice(id:any,test:boolean){
    this.FormulaireService.deleteChoice(id).subscribe((res:any)=>{
      console.log(res);
      if(test){
        let index=this.FieldsReferences.findIndex((e:any)=>e.Choice_Id==id)
        this.FieldsReferences.splice(index, 1)
      }
      else{
        let index=this.ChoicesItems.findIndex((e:any)=>e.Choice_Id==id)
        this.ChoicesItems.splice(index, 1)
      }
      
    })
  }


  getData(){
    this.FormulaireService.getChoicesFromField(this.FieldId).subscribe((choices:any)=>{
      this.ChoicesItems=choices.filter((e:any)=>e.fieldFromTable==null)
      this.FieldsReferences=choices.filter((e:any)=>e.choiceItem==null)
      let names:any[]=[]
      this.FieldsReferences.forEach((choice:any)=>{
        this.FormulaireService.giveInformationOnChoice(choice).subscribe((res:any)=>{
          names.push(res)
        })
      })
      this.FieldsReferences=names
      this.FormulaireService.getAllFormulaire().subscribe((forms:any)=>{
        this.formToChoose=forms
      })
      console.log(choices,this.ChoicesItems,this.FieldsReferences);
      
    })
  }

}
