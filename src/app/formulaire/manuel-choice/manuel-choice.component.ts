import { Component, OnInit ,Input ,EventEmitter,Output} from '@angular/core';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';

@Component({
  selector: 'app-manuel-choice',
  templateUrl: './manuel-choice.component.html',
  styleUrls: ['./manuel-choice.component.css']
})
export class ManuelChoiceComponent implements OnInit {

  constructor(
    private FormulaireService:FormulaireService
  ) { }

  @Input() FieldId:any=null;
  @Output() closePopUp=new EventEmitter<any>();
  ChoicesItems:any=[];
  FieldsReferences:any=[];
  addChoiceItemForm:boolean=false;
  newChoiceItem:any=""
  groups:any=[]
  ngOnInit(): void {
    this.getData()
  }
close(){
  this.closePopUp.emit(false)
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
      
      this.FormulaireService.creatChoice(newChoice).then((choice:any)=>{
        console.log(choice);
        
        this.ChoicesItems.push(choice)
      })

    }

    this.openFormChoiceItem()
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

  correctChoice(Choice_Id:any,newVal:any){
    let updateChoice={
      Choice_Id:Choice_Id,
      Val:newVal
    }
    this.FormulaireService.correctChoice(updateChoice).subscribe((res:any)=>{
      console.log(res);
    })
  }

  getData(){
    this.FormulaireService.getChoicesFromField(this.FieldId).then((choices:any)=>{
      this.ChoicesItems=choices.filter((e:any)=>e.fieldFromTable==null)
      this.FieldsReferences=choices.filter((e:any)=>e.choiceItem==null)
      let names:any[]=[]
      this.FieldsReferences.forEach((choice:any)=>{
        this.FormulaireService.giveInformationOnChoice(choice).subscribe((res:any)=>{
          names.push(res)
        })
      })
      this.FieldsReferences=names
      this.FormulaireService.getGroups().subscribe((groups:any)=>{
        this.groups=groups
      })
      console.log(choices,this.ChoicesItems,this.FieldsReferences);
      
    })

  }
}
