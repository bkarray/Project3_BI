import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx'









@Component({
  selector: 'app-excel-form',
  templateUrl: './excel-form.component.html',
  styleUrls: ['./excel-form.component.css']
})
export class ExcelFormComponent implements OnInit {

  constructor(    
    private router: Router,
    private FormulaireService:FormulaireService) { }
  @Input() ExcelFormIsOpen:boolean=false;
  @Output() closePopUp=new EventEmitter<any>();
  @Output() goToCreatServForm=new EventEmitter<any>();
  servsExamples:any=[]
  services:any=[]
  newFormName:any=''
  newFormDescription:any=''
  fileColNames:any=[]
  fileReader:any=null
  sheetNames:any=[]
  chosenSheet:any=''
  file:any=null
  uploaded:boolean=false
  
  sheets:any={}
  stopAll:boolean=false
  fieldsToCreate:any=[]
  sheetCorespondent:any={}
  Types:any=[{Name:'String',value:'character varying(255)'},{Name:'date',value:'date'},{Name:'list',value:'list'},{Name:"integer",value:"integer"},{Name:"boolean",value:"boolean"},{Name:"float",value:"real"}]




 

  ngOnInit(): void {
    this.getData()
  }

  close(){

    this.FormulaireService.deleteFile().subscribe((res:any)=>{
      this.closePopUp.emit(false);
    })
    
    
  }
  goToCreatServExcelForm(){
    this.goToCreatServForm.emit(false);
  }
  upload(){
    if(this.file){
      let ExcelFile={
      File_Name:this.file.name,
      Formulaire_Id:null
    }
    this.FormulaireService.createFileExcelRef(ExcelFile).subscribe((res:any)=>{
      console.log(res);
      
      if(res!="error to a Excel file!"){

    const fd:FormData = new FormData();
  fd.append('uploadedFile', this.file,this.file.name);

  this.FormulaireService.uploadFile(fd).subscribe((res1:any)=>{
    this.stopAll=true
    this.FormulaireService.ColumnNames(res.ExcelFile_Id).subscribe((sheets:any)=>{
      console.log(sheets);
      
      this.sheetNames=Object.keys(sheets)
      this.sheets=sheets;
      this.stopAll=false
      this.uploaded=true

    })
    
  })

      }
    })}
  }
  getExcelData(){
    this.fileColNames=[]
    this.fieldsToCreate=[]
this.fileColNames=this.sheets[this.chosenSheet]


    this.fileColNames.forEach((col:any,i:any)=>{
      let newField={
        Table_Id:null,
        Name:col,
        Type:'character varying(255)',
        Status:'consulté',
        Serv_Id:null,
        Serv_description:'no description',
        Field_order:i
  
      }
      let index=this.fieldsToCreate.findIndex((e:any)=>e.Name==newField.Name)
      if(index==-1){
        
      this.fieldsToCreate.push(newField)
      }
    })
    

  }


  ReadExcel(event:any){
    this.file=event.target.files[0];



console.log(this.file);



    
    // let fileReader = new FileReader();
    // fileReader.readAsBinaryString(file);
    // this.fileReader=fileReader
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

  addOrRemoveServ(index:any){
    if(this.servsExamples[index].isAdded) {  let serv={
      Formulaire_Id:null,
      Serv_Name:this.servsExamples[index].Serv_Name,
      Serv_User:null,
      Serv_order:0,
      serv_reponse:null,
      Serv_Refer:null
    }
   
    this.services.push(serv)}
    else {
      let  indexS=this.services.findIndex((e:any)=>e.Serv_Name==this.servsExamples[index].Serv_Name)

      this.services.splice(indexS,1)
    }
  }

  createForm(){
    if((this.newFormName!='')&&(this.services.length!=0)&&(this.chosenSheet!="")){
      let newFormulaireName={
        Formulaire_Name:this.newFormName,
        Formulaire_Status:this.newFormDescription
      }
      if (this.newFormDescription=='') newFormulaireName.Formulaire_Status='no description';
      this.FormulaireService.addNewFormulaire(newFormulaireName).subscribe((formulaire:any)=>{

      let ExcelFile={
        File_Name:this.file.name,
        Formulaire_Id:formulaire.Formulaire_Id
      }
        this.FormulaireService.createFileExcelRef(ExcelFile).subscribe((Excel:any)=>{


          let newTable={
            Formulaire_Id:formulaire.Formulaire_Id,
            Table_Name:formulaire.Formulaire_Name.replace(/\s/g, '').replaceAll(' ','').replaceAll('(','').replaceAll(')','').replaceAll('-','').replaceAll('"','')+'0',
            Table_level:0
  
          }
          
          this.FormulaireService.creatNewTable(newTable).subscribe((tab:any)=>{
            this.services.forEach((serv:any)=>{
              serv.Formulaire_Id=formulaire.Formulaire_Id
             this.FormulaireService.creatNewService(serv).subscribe((res:any)=>{})
            })
            this.stopAll=true
            this.fieldsToCreate.forEach((field:any)=>{
              field.Table_Id=tab.Table_Id;
              let newField={
                Table_Id:tab.Table_Id,
                Name:field.Name.replaceAll(' ','_').replaceAll(';','_').replaceAll(')','_').replaceAll('(','_').replaceAll('-','_').toLowerCase(),
                Type:field.Type,
                Status:'consulté',
                Serv_Id:null,
                Serv_description:field.Serv_description,
                Field_order:field.Field_order
          
              }

              this.FormulaireService.addNewfields(newField).subscribe((res:any)=>{

              })
            })
                  this.router.navigate(['/formulaire/new/', formulaire.Formulaire_Id,1]);

             
  
  
          })          
        })

      })
    }
  }
  getData(){
    this.FormulaireService.getServsExamples().subscribe((servs:any)=>{
      servs.forEach((serv:any)=>{
        serv['isAdded']=false
      })
      this.servsExamples=servs
    })
  }


}