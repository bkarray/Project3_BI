import { Component,Input, OnInit,Output,EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';

@Component({
  selector: 'app-python-compiler',
  templateUrl: './python-compiler.component.html',
  styleUrls: ['./python-compiler.component.css']
})
export class PythonCompilerComponent implements OnInit {

  constructor(private FormulaireService:FormulaireService,
    private route:ActivatedRoute) { }
  @Output() closePopUp=new EventEmitter<any>();
  @Input() editable:boolean=false
  @Input() codeGraph:any={}
  @Input() reponse_id:Number=0
  code:any=''
  Output:any=''
  Error:any=''
  imgURL:any=''
  FileName:any=''
  itWorks:boolean=false
  ngOnInit(): void {
    console.log(this.reponse_id);
    
    if(this.editable){
      if(this.codeGraph.img_url!=''){
        this.imgURL=this.FormulaireService.PhotoUrl+this.codeGraph.img_url+".png"
      }
    }
  }

  close(){
    this.closePopUp.emit(false)
  }

  deleteCode(){
    this.FormulaireService.deleteCode(this.codeGraph.Code_Id).subscribe((res:any)=>{
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
    this.FormulaireService.saveCode(data).subscribe((result:any)=>{
              
      this.Output=result['output']
      this.Error=result['error']
      alert("saved!!")
    })
  }
  else if (this.editable){
    const data={
      Code:this.codeGraph.Code,
      Reponse_Id:this.codeGraph.Reponse_Id
    }
    this.FormulaireService.correctCode(this.codeGraph.Code_Id,data).subscribe((resualt:any)=>{
if(resualt!="error saving img"){
  if(resualt.img!=""){
    this.imgURL=this.FormulaireService.PhotoUrl+resualt.Img+'.png'
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
      this.FormulaireService.compileCode(codeVal,this.reponse_id).subscribe((result:any)=>{
        console.log(result);
        
        this.Output=result['output']
        this.Error=result['error']
        this.itWorks=this.Error==''
      })
    

  }
   


   
}
