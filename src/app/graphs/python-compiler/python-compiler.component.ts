import { Component,Input, OnInit,Output,EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';
import { GraphsService } from 'src/app/services/Graphs/graphs.service';
@Component({
  selector: 'app-python-compiler',
  templateUrl: './python-compiler.component.html',
  styleUrls: ['./python-compiler.component.css']
})
export class PythonCompilerComponent implements OnInit {

  constructor(private FormulaireService:FormulaireService,
    private route:ActivatedRoute,
    private GraphsService:GraphsService) { }
  @Output() closePopUp=new EventEmitter<any>();
  @Output() GraphTab=new EventEmitter<any>();
  @Input() editable:boolean=false
  @Input() codeGraph:any={}
  @Input() reponse_id:Number=0
  code:any=''
  Output:any=''
  Error:any=''
  imgURL:any=''
  FileName:any=''
  itWorks:boolean=false
  codeIsNew:boolean=true
  isPrincipal:boolean=true
  codesToChooseFrom:any[]=[]
  newCodeRef:any=''
  refrencedCode:any={}
  dataManagement:any[]=[{
    name:'Code',
    isOpen:true
  },{
    name:'Causes',
    isOpen:false
  },{
    name:'Consequences',
    isOpen:false
  },{
    name:'management',
    isOpen:false
  }
  
]
newDatasetFormIsOpen:boolean=false
selectionResponse:any=0


dataSets:any[]=[]
  ngOnInit(): void {
    console.log(this.reponse_id);
    this.getData()
    if(this.editable){
      console.log("8",this.codeGraph);
      if(this.codeGraph.img_url!=''){
        this.imgURL=this.FormulaireService.PhotoUrl+this.codeGraph.img_url+".png"
      }
      else{
        this.imgURL="../assets/404Img.jpg"
      }
    
    }


  }
  openGraphTab(event:any){
    this.GraphTab.emit(event)
  }
  close(){
    this.closePopUp.emit(this.codeGraph)
  }

verifiesIsOpen(tag:any){
let index=this.dataManagement.findIndex((e:any)=>e.name==tag)
if(index!=-1)
{
  return this.dataManagement[index].isOpen
}
return false
}

openManagementDataTab(index:any){
  for (let i = 0; i < this.dataManagement.length; i++) {
    if(i==index){
      this.dataManagement[i].isOpen=true
    }
    else{
      this.dataManagement[i].isOpen=false
    }
    
  }

}

  getResponseWithGraphs(event:any){
if(event!=0){
  this.GraphsService.getCodes(event).subscribe((codes:any)=>{
    this.codesToChooseFrom=codes;
  })

}
else{
  this.codesToChooseFrom=[]
}
  }

emptyChooseCode(){
  this.codesToChooseFrom=[]
  this.newCodeRef=''
}

  getNewDataSet(){
    this.newDatasetFormIsOpen=!this.newDatasetFormIsOpen
  }

changeIfPrincipal(){
  const val={
    Code_Id:this.codeGraph.Code_Id,
    newCodeIsPrincipal:true
  }
  if(this.codeIsNew){
    val.newCodeIsPrincipal=this.isPrincipal
  }
  else{
    val.newCodeIsPrincipal=!this.isPrincipal
  }
  this.GraphsService.updatePrincipleGraph(val).subscribe((res:any)=>{
    console.log(res);
    this.codeGraph.newCodeIsPrincipal=val.newCodeIsPrincipal
  
  })
}






createReferenceCode(){
  const codeRef={
    "Code_Id":this.codeGraph.Code_Id,
    "Related_Code":Number(this.newCodeRef)
  }
  this.GraphsService.updateRelatedGraph(codeRef).subscribe((res:any)=>{
  console.log(res);
    this.emptyChooseCode()
    if(res['Related_Code']){
    this.getReferencedCode(res['Related_Code']['Code_Id'])
    this.codeGraph.Related_Code=res['Related_Code']['Code_Id']}
    else{
      this.codeGraph.Related_Code=null
    }
  
  })
}

deleteReference(){
  const codeRef={
    "Code_Id":this.codeGraph.Code_Id
  }
  this.GraphsService.updateRelatedGraph(codeRef).subscribe((res:any)=>{
  console.log(res);
    this.emptyChooseCode()
    this.codeGraph.Related_Code=null
    if(!this.codeIsNew)
    this.imgURL="../assets/404Img.jpg"
  
  })
}



getReferencedCode(CodeId:any){
this.GraphsService.getCodeById(CodeId).subscribe((code:any)=>{
this.refrencedCode=code
console.log(code);

if(!this.codeIsNew)
{
  if(code&&code.img_url!=""){
  this.imgURL=this.FormulaireService.PhotoUrl+code.img_url+'.png'
}
else{
  this.imgURL="../assets/404Img.jpg";
}
}
})  
}




  getNewDatasetId(event:any){
    if(this.editable){
if((event!=0)&&(event!=this.codeGraph.reponse_id)){
  if(this.codeGraph.Code_Id){
    this.GraphsService.addNewDataset(this.codeGraph.Code_Id,event).subscribe((res:any)=>{
      this.FormulaireService.getReponseById(event).subscribe((reponce:any)=>{
        this.dataSets.push(reponce)
        this.getNewDataSet()
      })
    })
  }
}
else{
  this.getNewDataSet()
}
}
else{
  if((event!=0)&&(event!=this.codeGraph.reponse_id))
  this.FormulaireService.getReponseById(event).subscribe((reponce:any)=>{
    this.dataSets.push(reponce)
    this.getNewDataSet()
  })
}
  }

  deleteCode(){
    this.GraphsService.deleteCode(this.codeGraph.Code_Id).subscribe((res:any)=>{
      console.log(res);
      this.close()
      
    })
  }
handleKeydown(event:any) {
  this.itWorks=false
    if (event.key == 'Tab') {
        event.preventDefault();
        var start = event.target.selectionStart;
        var end = event.target.selectionEnd;
        event.target.value = event.target.value.substring(0, start) + '\t' + event.target.value.substring(end);
        event.target.selectionStart = event.target.selectionEnd = start + 1;
    }
}


setCodeIsNew(result:boolean){
  this.codeIsNew=result
  this.getIfPrincipal()
  if(result){
    if(this.codeGraph.img_url!=""){
      this.imgURL=this.FormulaireService.PhotoUrl+this.codeGraph.img_url+'.png'
    }
    else{
      this.imgURL="../assets/404Img.jpg";
    }
  }
  else{
    console.log(!this.codeGraph.Related_Code,this.codeGraph.Related_Code);
    
    if(!this.codeGraph.Related_Code){
      this.imgURL="../assets/404Img.jpg"
    }
    else{
      this.getReferencedCode(this.codeGraph.Related_Code)
    }
  }
}



getImgUrl(){
  return this.imgURL
}
SaveCode(){
if(this.itWorks){
  if((this.FileName!='')&&(this.code!="")&&!this.editable){
    
    const data={
      Code:this.code,
      File_Name:this.FileName,
      Reponse_Id:this.reponse_id

    }
    this.GraphsService.saveCode(data).subscribe((result:any)=>{
              
      this.Output=result['output']
      this.Error=result['error']
      this.close()
    })
  }
  else if (this.editable){
    const data={
      Code:this.codeGraph.Code,
      Reponse_Id:this.codeGraph.Reponse_Id
    }
    this.GraphsService.correctCode(this.codeGraph.Code_Id,data).subscribe((resualt:any)=>{
if(resualt!="error saving img"){
  if(resualt.img_url!=""){
    this.imgURL=this.FormulaireService.PhotoUrl+resualt.img_url+'.png'
  }
  else{
    this.imgURL="../assets/404Img.jpg"
  }
}
    })
  }}
}

  Compile(){
    if(this.editable){
      this.code=this.codeGraph.Code
    }
    const codeVal={
      code:this.code
    }
    console.log(codeVal);
      this.GraphsService.compileCode(codeVal,this.reponse_id).subscribe((result:any)=>{
        console.log(result);
        
        this.Output=result['output']
        this.Error=result['error']
        this.itWorks=this.Error==''
      })
    

  }
   
getIfPrincipal(){
  if(this.codeIsNew){
    this.isPrincipal=this.codeGraph.newCodeIsPrincipal
  }
  else{
    this.isPrincipal=!this.codeGraph.newCodeIsPrincipal
  }
}


getData(){
  
  this.FormulaireService.getReponseById(Number(this.reponse_id)).subscribe((reponse:any)=>{
    reponse['fixed']=true
    this.getIfPrincipal()
    console.log('7',this.codeGraph);
    this.codeGraph.Datasets.forEach((dataset:any) => {
      this.FormulaireService.getReponseById(dataset).subscribe((reponse)=>{
        this.dataSets.push(reponse)
      })
    });
    this.dataSets.push(reponse)
    
      this.setCodeIsNew(this.codeGraph.newCodeIsPrincipal)
    
  })
}

   
}
