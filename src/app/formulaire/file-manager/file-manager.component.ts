import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';

import { ActivatedRoute, Params, Router } from '@angular/router';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {
  constructor(private FormulaireService:FormulaireService,
    
    private route: ActivatedRoute,) { }
  @Output() closePopUp=new EventEmitter<any>()
  @Input() Formulaire_Id:any=0

  uploadBarIsOpen:boolean=false
  fileToUpload:any=""
  files:any=[]
  fields:any=[]
  fileChoices:any=[]
  fileReader:any=null
  sheetNames:any=[]
  chosenSheet:any=''
  fileData:any=[]
  Table:any={}
  fileName:any=''
  stopAll:boolean=false
  file:any={}
  uploaded:any=false
  fileAdded:any={}
  sheets:any={}

  ngOnInit(): void {

    this.getData();
    console.log(this.Formulaire_Id);
    
  }

  close(){
    this.closePopUp.emit(false);
  }

  ReadExcel(event:any){
    this.fileAdded=event.target.files[0];

    // let fileReader = new FileReader();
    // fileReader.readAsBinaryString(file);
    // // this.fileReader=fileReader
    // this.fileName=file.name
    // fileReader.onload=(e:any)=>{
    //   this.stopAll=true
    //   var workBook=XLSX.read(fileReader.result,{type:'binary'});
    //   var sheetNames=workBook.SheetNames;
    //   console.log(file);
    //   this.sheetNames=sheetNames
      

      
    // }
    // fileReader.onloadend=(e:any)=>{
    //   this.stopAll=false
    // }
  }

  // uploadData(){
  //   if(this.fileToUpload!=''){
  //     this.route.params.subscribe((res:any)=>{
  //       let response={
  //         reponse_id:res.idR
  //       }
  //       this.FormulaireService.uploadData(Number(this.fileToUpload),response).subscribe((res:any)=>{
  //         console.log(res);
  //         location.reload()
          
  //       })
  //     })

  //   }

  // }

  openUploadBar(){
    this.uploadBarIsOpen=!this.uploadBarIsOpen
    this.fileToUpload=""
    this.files=[]
    if(this.uploadBarIsOpen){
      this.route.params.subscribe((res:any)=>{
        this.FormulaireService.getFilesFrom(res.idF).subscribe((files:any)=>{
          this.files=files
            })
      })

    }
  }


  fileChange(){
    const file=this.files.find((e:any)=>e.ExcelFile_Id==Number(this.fileToUpload))
    this.file=file
    this.stopAll=true
    this.FormulaireService.ColumnNames(file.ExcelFile_Id).subscribe((sheets:any)=>{
      console.log(sheets);
      
      this.sheetNames=Object.keys(sheets)
      this.sheets=sheets;
      this.stopAll=false
      this.uploaded=true

    })
  }


  upload(){
    if(this.fileAdded){
      let ExcelFile={
      File_Name:this.fileAdded.name,
      Formulaire_Id:this.Formulaire_Id
    }
    this.FormulaireService.createFileExcelRef(ExcelFile).subscribe((res:any)=>{
      console.log(res);
      
      if(res!="error to a Excel file!"){

    const fd:FormData = new FormData();
  fd.append('uploadedFile', this.fileAdded,this.fileAdded.name);

  this.FormulaireService.uploadFile(fd).subscribe((res1:any)=>{
    this.stopAll=true
    this.FormulaireService.ColumnNames(res.ExcelFile_Id).subscribe((sheets:any)=>{
      console.log(sheets);
      
      this.sheetNames=Object.keys(sheets)
      this.sheets=sheets;
      this.stopAll=false
      this.file=res
      this.files.push(res)
      this.uploaded=true

    })
    
  })

      }
    })}
  }



  getExcelData(){
    this.fileChoices=[]
    this.fileData=[]
    this.fileChoices=this.sheets[this.chosenSheet]
    this.fields.forEach((field:any,i:any)=>{
      let choice=this.fileChoices.find((e:any)=>e.replaceAll(' ','_').replaceAll(';','_').replaceAll(')','_').replaceAll('(','_').replaceAll('-','_').toLowerCase()==field.Name)
      if(choice){
        this.fields[i]['correspondent']=choice
      }
      else{
        this.fields[i]['correspondent']=''
      }
      
    })

    console.log(this.fileData);
    
    

  }


  uploadData(){
    this.stopAll=true
    this.route.params.subscribe((res:any)=>{
      let data:any={}
      let fieldsCor:any={}
      this.fields.forEach((field:any)=>{
        if(field['correspondent']!=''){
          const dataF={
            'Type':field.Type,
            'Val':field['correspondent']
          }
        fieldsCor[field.Name]=dataF}
      })
      data['sheet']=fieldsCor
      data['reponse_id']=res.idR
      data['sheetName']=this.chosenSheet
      console.log(data);
      
      this.FormulaireService.uploadData(this.file.ExcelFile_Id,data).subscribe((res:any)=>{
        console.log(res);
        location.reload();
        
      })
      
    })
  }


  getData(){
    this.FormulaireService.getTables(this.Formulaire_Id).subscribe((tables:any)=>{
      let tab=tables.find((e:any)=>e.Table_level==0)
      this.Table=tab
      console.log(tab);
      this.FormulaireService.getAllFields(tab.Table_Id).then((fields:any)=>{
        fields.forEach((field:any)=>{
          field['correspondent']=''
          this.fields.push(field)
        })

        console.log(this.fields);
        
        
      })
      
    })
  }

}
