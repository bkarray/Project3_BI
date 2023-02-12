import { Component,Input, OnInit,Output,EventEmitter } from '@angular/core';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';

@Component({
  selector: 'app-python-compiler',
  templateUrl: './python-compiler.component.html',
  styleUrls: ['./python-compiler.component.css']
})
export class PythonCompilerComponent implements OnInit {

  constructor(private FormulaireService:FormulaireService) { }
  @Output() closePopUp=new EventEmitter<any>();
  code:any=''
  Output:any=''
  Error:any=''
  ngOnInit(): void {
  }

  close(){
    this.closePopUp.emit(false)
  }
handleKeydown(event:any) {
    if (event.key == 'Tab') {
        event.preventDefault();
        var start = event.target.selectionStart;
        var end = event.target.selectionEnd;
        event.target.value = event.target.value.substring(0, start) + '\t' + event.target.value.substring(end);
        event.target.selectionStart = event.target.selectionEnd = start + 1;
    }
}

  Compile(){
    const codeVal={
      code:this.code
    }
    console.log(codeVal);
    
    this.FormulaireService.compileCode(codeVal).subscribe((result:any)=>{
      console.log(result);
      
      this.Output=result['output']
      this.Error=result['error']
    })
  }
   


   
}
