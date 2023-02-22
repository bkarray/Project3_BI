import { Component, OnInit ,Output,EventEmitter,Input} from '@angular/core';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';

@Component({
  selector: 'app-graphs-list',
  templateUrl: './graphs-list.component.html',
  styleUrls: ['./graphs-list.component.css']
})
export class GraphsListComponent implements OnInit {

  constructor(private FormulaireService:FormulaireService) { }
  @Input() reponse_id=0;
  @Output() closePopUp=new EventEmitter<any>()


  showCodeIsOpen:boolean=false
  codeGraph:any={}


  codes:any=[]
  ngOnInit(): void {
    this.getData()
  }

  getData(){
this.FormulaireService.getCodes(this.reponse_id).subscribe((codes:any)=>{
  this.codes=codes
})
  }

  deleteCode(index:any){
    this.FormulaireService.deleteCode(this.codes[index].Code_Id).subscribe((res:any)=>{
      this.codes.splice(index,1)
    })
  }

  openCode(code:any){
    this.codeGraph=code
    this.showCodeIsOpen=!this.showCodeIsOpen
    
  }
  

  close(){
    this.closePopUp.emit(false)
  }

}
