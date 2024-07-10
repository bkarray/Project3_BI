import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import * as XLSX from 'xlsx'
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';
@Component({
  selector: 'app-excel-choice',
  templateUrl: './excel-choice.component.html',
  styleUrls: ['./excel-choice.component.css']
})
export class ExcelChoiceComponent implements OnInit {

  constructor(
    private FormulaireService:FormulaireService
  ) { }
  @Input() FieldId:any=null
  @Output() closePopUp=new EventEmitter<any>()
  chooseParmFile:boolean=false
  fileColNames:any[]=[]
  ChoicesItems:any[]=[]
  fileData:any=null
  fileColChosen:any=""

  
  ngOnInit(): void {
    this.getData()
  }

  close(){
    this.closePopUp.emit(false)
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
          
          this.FormulaireService.creatChoice(newChoice).then((choice:any)=>{
            console.log(choice);
            
            this.ChoicesItems.push(choice)
          })
        }
      })
      this.close()
    }
  }

  getData(){
    this.FormulaireService.getChoicesFromField(this.FieldId).then((choices:any)=>{
      this.ChoicesItems=choices.filter((e:any)=>e.fieldFromTable==null)
    
      
    })

  }

}
