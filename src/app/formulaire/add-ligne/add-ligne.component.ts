import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';
import { AuthService } from 'src/app/services/auth/authservice';
@Component({
  selector: 'app-add-ligne',
  templateUrl: './add-ligne.component.html',
  styleUrls: ['./add-ligne.component.css']
})
export class AddLigneComponent implements OnInit {

  constructor(
    private FormulaireService:FormulaireService,
    private authService:AuthService
  ) { }
  @Input() fields:any[]=[];
  @Input() level:number=0;
  @Input() isSubLine:boolean=false;
  @Input() parentId:number=0;
  @Input() Reponse_Id:number=0;
  @Output()  close:EventEmitter<any>=new EventEmitter<any>();
  newRow:any={};
  ngOnInit(): void {
    this.prepareData();
  }



  closePopUp(){
    this.close.emit();
  }

  addNewRow(){


    let val:any={}
    const field=this.fields.filter((e:any)=>e.Name.substring(0, 4)!='ID_'+this.level)[0]
    val['Table_Id']=field.Table_Id
    val['row']=[]
    this.fields.forEach((field:any)=>{
      if(field.Name.substring(0, 4)!='ID_'+this.level) {
        let newVAl={
          Name:field.Name,
          Value:this.newRow[field.Name]
        }
        if(newVAl.Value!='') { val['row'].push(newVAl)}
      }
    })
    val['row'].push({
      Name:'reponse_id',
      Value:this.Reponse_Id
    })
    if(this.level!=0){
      this.newRow['sup_id']=this.parentId
      val['row'].push({
        Name:'sup_id',
        Value:this.parentId
      }) 
    }
    console.log('filed',field);
    
console.log('val',val);


    this.FormulaireService.addNewRow(val).subscribe((res:any)=>{
      let newUpdate={
        user:this.authService.authenticatedUser.U_Id,
        reponse_id:this.Reponse_Id,
        ligen_id:0,
        chagementType:'add',
        table_level:null,
        newValue:'',
        fieldchanged:null,
        is_seen:false
      }
      

     this.FormulaireService.addNewUpdate(newUpdate).subscribe((res:any)=>{console.log(res)})
      this.close.emit(res);
    })
  
    
  }

  initVal(type:any):any{
    switch(type){
      case 'character varying(255)': return '';
      case 'date': return '';
      case 'boolean' :return false;
      case 'integer':return 0;
      case 'real':return 0;
      default :return null

    }
  }


  prepareData(){
    this.fields.forEach((field:any)=>{
      if(field.Name.substring(0, 4)!='ID_'+this.level)this.newRow[field.Name]=this.initVal(field.Type)
    })
    console.log('fields',this.fields);
    
  }

}
