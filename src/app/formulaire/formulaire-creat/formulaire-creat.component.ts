import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/authservice';
import { CartService } from 'src/app/services/cart/cart.service';
import { FormulaireService } from 'src/app/services/formulaire/formulaire.service';
//drag and drop
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-formulaire-creat',
  templateUrl: './formulaire-creat.component.html',
  styleUrls: ['./formulaire-creat.component.css']
})
export class FormulaireCreatComponent implements OnInit {

  
  constructor(private CartService: CartService,
    private authService: AuthService,
    private service:SharedService,
    private router: Router,
    private FormulaireService:FormulaireService,
    private route: ActivatedRoute) { }
  numservs: any;
  formulaire:any={}
  fieldFormIsOpen:boolean=false
  newFieldName:any=''
  newFieldType:any='character varying(255)'
  newfieldChoises:any=null
  newFieldStatus:any='no description'
  currentsrvOrd:any=1
  currentsrvName:any=''
  newFieldLevel:any=''
  fields:any=[{
    Name:'ID',
    Type:'auto_number',
    Status:'consulté'
  }]
  servsEtap:any=[]
  isGenerated:boolean=false
  lastTableIndex:number=0;
  shownServNum:any=1
  Types:any=[]

  ngOnInit(): void { 
  this.Types=[{Name:'String',value:'character varying(255)'},{Name:'date',value:'date'},{Name:'list',value:'list'}]
this.getNewFormulaire()
  }

  deleteField(index:any){
if(!this.isGenerated){    
  this.formulaire.tables.forEach((tab:any)=>{
      let indexF=tab.fields.findIndex((e:any)=> e.Name==this.fields[index].Name)
      if(indexF!=-1) tab.fields.splice(indexF,1)
    })
    this.fields.splice(index,1)}
    else{
      let deletedField={
        Name:this.fields[index].Name,
        Table_Id:this.fields[index].Table_Id
      }
      this.FormulaireService.putFieldInArchive(deletedField).subscribe((res:any)=>{
        this.formulaire.tables.forEach((tab:any)=>{
          let indexF=tab.fields.findIndex((e:any)=> e.Name==this.fields[index].Name)
          if(indexF!=-1) tab.fields.splice(indexF,1)
        })
        this.servsEtap.forEach((serv:any)=>{
          
          let indexF=serv.fields.findIndex((e:any)=> e.Name==deletedField.Name)
          console.log(serv,this.fields[index],indexF)
          serv.fields.splice(indexF,1)
        })
        this.fields.splice(index,1)
      })
    }
  }

  editSatus(index:any){
    this.fields[index].editSataus=!this.fields[index].editSataus
    console.log(this.fields[index])
  }
  spaces(index:any){
if(index==0) return []
else return this.formulaire.tables[index-1].fields
  }
  editDesc(index:any){
this.fields[index].editDesc=!this.fields[index].editDesc
  }
  openTypeForm(index:any){
    this.fields[index].editType=!this.fields[index].editType
    this.formulaire.tables.forEach((tab:any)=>{
      let indexF=tab.fields.findIndex((e:any)=> e.Name==this.fields[index].Name)
      if(indexF!=-1) tab.fields[indexF].Type=this.fields[index].Type
    })
  }

  openNameForm(index:any){
   this.fields[index].oldName=this.fields[index].Name

this.fields[index].editName=!this.fields[index].editName
  }
  closeNameForm(index:any){
    this.formulaire.tables.forEach((tab:any)=>{
      let indexF=tab.fields.findIndex((e:any)=> e.Name==this.fields[index].oldName)
      console.log(tab.fields[indexF])
      if(indexF!=-1) tab.fields[indexF].Name=this.fields[index].Name.replaceAll(' ','_').replaceAll(';','_').toLowerCase()
    })
    this.fields[index].Name=this.fields[index].Name.replaceAll(' ','_').replaceAll(';','_').toLowerCase()
    this.fields[index].oldName=''
    this.fields[index].editName=!this.fields[index].editName
  }

  openfieldForm(){
    this.newFieldName=''
    this.newFieldLevel=''
    this.newFieldType='character varying(255)'
    this.newfieldChoises=null
    this.newFieldStatus='no description'
    this.fieldFormIsOpen=!this.fieldFormIsOpen
  }
  addnewfield(){
   if(!this.isGenerated) { 
    let ord=0
    if(this.formulaire.tables[0].fields.length!=0) ord=this.formulaire.tables[0].fields.length-1
    if (this.newFieldType=='list') this.newFieldType='character varying(255)'
    let newField={
      Table_Id:this.formulaire.tables[0].Table_Id,
      Name:this.newFieldName.replaceAll(' ','_').replaceAll(';','_').toLowerCase(),
      Type:this.newFieldType,
      choises:this.newfieldChoises,
      Status:'consulté',
      Serv_Id:null,
      Serv_description:this.newFieldStatus ,
      Field_order:ord

    }

    
  if((this.fields.findIndex((e:any)=> e.Name==newField.Name)==-1)&&((this.newFieldName!='')&&(this.newFieldType!=''))||((this.newFieldType=='list')&&(this.newfieldChoises==''))){ 
    console.log() 
 
    this.formulaire.tables[0].fields.push(newField)
    let newField2= {
      Table_Id:this.formulaire.tables[0].Table_Id,
      Name:this.newFieldName.replaceAll(' ','_').replaceAll(';','_').toLowerCase(),
      Type:this.newFieldType,
      choises:this.newfieldChoises,
      Status:'consulté',
      Serv_Id:null,
      Serv_description:this.newFieldStatus ,
      editDesc:false,
      editSataus:false,
      editName:false,
      editType:false,
      oldName:'',
      Field_order:ord

    }
    this.fields.push(newField2)
    this.openfieldForm()
    this.newFieldName=''
    this.newFieldType='character varying(255)'
    this.newfieldChoises=null
    this.newFieldStatus='no description'
    console.log(this.formulaire)

  }}
  else{
    if(this.newFieldLevel!=''){
      if(this.newFieldLevel!='new'){
        let indexT=this.formulaire.tables.findIndex((e:any)=>e.Table_level==Number(this.newFieldLevel))
        let ord=0
        if(this.formulaire.tables[indexT].fields.length!=0) ord=this.formulaire.tables[indexT].fields.length-1
        let newField={
          Table_Id:this.formulaire.tables[indexT].Table_Id,
          Name:this.newFieldName.replaceAll(' ','_').replaceAll(';','_').toLowerCase(),
          Type:this.newFieldType,
          choises:this.newfieldChoises,
          Status:'consulté',
          Serv_Id:null,
          Serv_description:this.newFieldStatus ,
          Field_order:ord
    
        }
        if((this.fields.findIndex((e:any)=> e.Name==newField.Name)==-1)&&((this.newFieldName!='')&&(this.newFieldType!=''))||((this.newFieldType=='list')&&(this.newfieldChoises==''))){ 
          console.log() 
       
          
          this.FormulaireService.addNewfields(newField).subscribe((res:any)=>{
            this.formulaire.tables[indexT].fields.push(newField)
            this.servsEtap.forEach((serv:any)=>{
              let newFieldServ={
                Table_Id:this.formulaire.tables[indexT].Table_Id,
                Name:this.newFieldName.replaceAll(' ','_').replaceAll(';','_').toLowerCase(),
                Type:this.newFieldType,
                choises:this.newfieldChoises,
                Status:'consulté',
                Serv_Id:serv.Serv_Id,
                Serv_description:this.newFieldStatus ,
                Field_order:ord
          
              }
              this.FormulaireService.postField(newFieldServ).subscribe((res:any)=>{
                let newField2= {
                  Table_Id:res.Table_Id,
                  Name:res.Name,
                  Type:res.Type,
                  choises:res.choises,
                  Status:res.Status,
                  Serv_Id:res.Serv_Id,
                  Serv_description:res.Serv_description ,
                  editDesc:false,
                  editSataus:false,
                  editName:false,
                  editType:false,
                  oldName:'',
                  Field_order:ord
            
                }
                serv.fields.push(newField2)
              })
            })

            if(Number(this.shownServNum)==Number(this.currentsrvOrd)){let newField2= {
              Table_Id:this.formulaire.tables[indexT].Table_Id,
              Name:this.newFieldName.replaceAll(' ','_').replaceAll(';','_').toLowerCase(),
              Type:this.newFieldType,
              choises:this.newfieldChoises,
              Status:'consulté',
              Serv_Id:null,
              Serv_description:this.newFieldStatus ,
              editDesc:false,
              editSataus:false,
              editName:false,
              editType:false,
              oldName:'',
              Field_order:ord
        
            }
            this.fields.push(newField2)}
            this.openfieldForm()
            this.newFieldName=''
            this.newFieldType='character varying(255)'
            this.newfieldChoises=null
            this.newFieldStatus='no description'
            console.log(this.formulaire)
        
  
          })
                  }

      }
      else{
        console.log(this.lastTableIndex)
        if((this.fields.findIndex((e:any)=> e.Name==this.newFieldName.replaceAll(' ','_').replaceAll(';','_').toLowerCase())==-1)&&((this.newFieldName!='')&&(this.newFieldType!=''))||((this.newFieldType=='list')&&(this.newfieldChoises==''))){ 


          this.lastTableIndex++;
          let newTable={
            Formulaire_Id:this.formulaire.Formulaire_Id,
            Table_Name:this.formulaire.Formulaire_Name.replace(/\s/g, '').toLowerCase().replace(/\s/g, '').replaceAll(' ','').replaceAll('(','').replaceAll(')','').replaceAll('-','').replaceAll('"','')+this.lastTableIndex,
            Table_level:this.lastTableIndex
    
          }
          this.FormulaireService.creatNewTable(newTable).subscribe((table:any)=>{
            table['fields']=[]
           
    
            this.lastTableIndex--

    
            console.log(this.formulaire.tables,this.lastTableIndex)
            if(this.formulaire.tables.length!=0){let val={
              Table_Name_inf:table.Table_Name,
              Table_Name_sup:this.formulaire.tables[this.lastTableIndex].Table_Name
            }
            this.FormulaireService.addForeignKey(val).subscribe((res:any)=>{})}


              let newField={
                Table_Id:table.Table_Id,
                Name:this.newFieldName.replaceAll(' ','_').replaceAll(';','_').toLowerCase(),
                Type:this.newFieldType,
                choises:this.newfieldChoises,
                Status:'consulté',
                Serv_Id:null,
                Serv_description:this.newFieldStatus ,
                Field_order:0
          
              }
       
                console.log() 
             
                
                this.FormulaireService.addNewfields(newField).subscribe((res:any)=>{
                     table.fields.push(newField)
                  this.servsEtap.forEach((serv:any)=>{
                    let newFieldServ={
                      Table_Id:table.Table_Id,
                      Name:this.newFieldName.replaceAll(' ','_').replaceAll(';','_').toLowerCase(),
                      Type:this.newFieldType,
                      choises:this.newfieldChoises,
                      Status:'consulté',
                      Serv_Id:serv.Serv_Id,
                      Serv_description:this.newFieldStatus ,
                      Field_order:0
                
                    }
                    this.FormulaireService.postField(newFieldServ).subscribe((res:any)=>{
                      let newField2= {
                        Table_Id:res.Table_Id,
                        Name:res.Name,
                        Type:res.Type,
                        choises:res.choises,
                        Status:res.Status,
                        Serv_Id:res.Serv_Id,
                        Serv_description:res.Serv_description ,
                        editDesc:false,
                        editSataus:false,
                        editName:false,
                        editType:false,
                        oldName:'',
                        Field_order:0
                  
                      }
                      serv.fields.push(newField2)
                    })
                  })
      
                  if(Number(this.shownServNum)==Number(this.currentsrvOrd)){let newField2= {
                    Table_Id:table.Table_Id,
                    Name:this.newFieldName.replaceAll(' ','_').replaceAll(';','_').toLowerCase(),
                    Type:this.newFieldType,
                    choises:this.newfieldChoises,
                    Status:'consulté',
                    Serv_Id:null,
                    Serv_description:this.newFieldStatus ,
                    editDesc:false,
                    editSataus:false,
                    editName:false,
                    editType:false,
                    oldName:'',
                    Field_order:0
              
                  }
                  this.fields.push(newField2)}
                  this.openfieldForm()
                  this.newFieldName=''
                  this.newFieldType='character varying(255)'
                  this.newfieldChoises=null
                  this.newFieldStatus='no description'
                  console.log(this.formulaire)
              
        
                })


              this.formulaire.tables.push(table)
              this.lastTableIndex++
              

            
          })




        
                  

      }
    }
    }
  }

  }
  generatFields(){
    let test=false
    this.formulaire.tables.forEach((tab:any,i:any)=>{

      if(tab.fields.length==0){
        if(i==this.formulaire.tables.length-1){
          this.FormulaireService.deleteTable(tab.Table_Id).subscribe((res:any)=>{
            this.formulaire.tables.splice(this.formulaire.tables.length-1,1)
            this.lastTableIndex--
          })
        }
        else{
          if(!((this.formulaire.tables.length==1)&&(i==0))) {
            for(let j=i;j<this.formulaire.tables.length-1;j++){
            this.formulaire.tables[j].fields=[]
            this.formulaire.tables[j].fields=this.formulaire.tables[j+1].fields
            this.formulaire.tables[j].fields.forEach((field:any)=>{
              field.Table_Id=this.formulaire.tables[j].Table_Id
            })
          }
          this.FormulaireService.deleteTable(this.formulaire.tables[this.formulaire.tables.length-1].Table_Id).subscribe((res:any)=>{
            this.formulaire.tables.splice(this.formulaire.tables.length-1,1)
            this.lastTableIndex--
          })
          test=true
        }
        }

       }

    })
   
    if(!test){this.formulaire.tables.forEach((tab:any)=>{

          tab.fields.forEach((field:any)=>{ 
          let newField={
            Table_Id:field.Table_Id,
            Name:field.Name,
            Type:field.Type,
            choises:field.choises,
            Status:field.Status,
            Serv_Id:null,
            Serv_description:field.Serv_description,
            Field_order:field.Field_order
      
          }    
          this.FormulaireService.addNewfields(newField).subscribe((res:any)=>{ })})
         
    })
    this.shownServNum=this.currentsrvOrd

   this.isGenerated=true}
   else{
    alert("verifier l'organization des colones")
   }
  }
  drop(event: CdkDragDrop<any>) {

  
   if (event.previousContainer === event.container) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      } else if((event.previousContainer !== event.container)&&(!this.isGenerated)) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
      
 
      for(let i=0;i<this.formulaire.tables.length;i++){
          
      
        for(let j=0;j<this.formulaire.tables[i].fields.length;j++){
          this.formulaire.tables[i].fields[j].Field_order=j
          this.formulaire.tables[i].fields[j].Table_Id=this.formulaire.tables[i].Table_Id
          let indexF=this.fields.findIndex((e:any)=> e.Name==this.formulaire.tables[i].fields[j].Name)
          this.fields[indexF].Table_Id=this.formulaire.tables[i].Table_Id
          this.fields[indexF].Field_order=j
          if(Number(this.shownServNum)!=Number(this.currentsrvOrd)){
            let place={
              Field_order:j
            }
            this.FormulaireService.updateFieldPlace(this.fields[indexF].Field_Id,place).subscribe((res:any)=>{
             
              this.fields[indexF].Table_Id=this.formulaire.tables[i].Table_Id
              this.fields[indexF].Field_order=j
            })
          }
        }

 

    }
    console.log(this.formulaire.tables,this.fields)
    }

    addNewTable(){
      this.lastTableIndex++;
      let newTable={
        Formulaire_Id:this.formulaire.Formulaire_Id,
        Table_Name:this.formulaire.Formulaire_Name.replace(/\s/g, '').toLowerCase().replace(/\s/g, '').replaceAll(' ','').replaceAll('(','').replaceAll(')','').replaceAll('-','').replaceAll('"','')+this.lastTableIndex,
        Table_level:this.lastTableIndex

      }
      this.FormulaireService.creatNewTable(newTable).subscribe((table:any)=>{
        table['fields']=[]

        this.lastTableIndex--

        console.log(this.formulaire.tables,this.lastTableIndex)
        let val={
          Table_Name_inf:table.Table_Name,
          Table_Name_sup:this.formulaire.tables[this.lastTableIndex].Table_Name
        }
        this.FormulaireService.addForeignKey(val).subscribe((res:any)=>{
          this.formulaire.tables.push(table)
          this.lastTableIndex++
        })
      })
    }
  End(){
    let test=false
    this.fields.forEach((field:any)=>{
      if(field.Status!='consulté') test=true
    })
   if(test) this.nextServ()
    this.router.navigate(['/formulaire/list/'])
  }
  fieldsToShow(){
    console.log(Number(this.shownServNum),Number(this.currentsrvOrd))
    if(Number(this.shownServNum)!=Number(this.currentsrvOrd)){
      let index=this.servsEtap.findIndex((e:any)=> e.Serv_order==Number(this.shownServNum))
      let indexP=this.servsEtap.findIndex((e:any)=> e.Serv_order==this.fields[1].Serv_Id)
      if(indexP!=-1) this.servsEtap[indexP].fields=this.fields
      this.fields=this.servsEtap[index].fields
      this.fields.sort((a:any, b:any) => a.Name.localeCompare(b.Name))
      console.log(this.fields)
      this.currentsrvName=this.servsEtap[index].Serv_Name
      this.formulaire.tables.forEach((table:any)=>{
      table.fields=this.fields.filter((e:any)=>e.Table_Id==table.Table_Id)
        table.fields.sort((a:any, b:any) => {
          return a.Field_order - b.Field_order;
      });
      })
    }
else{
  this.fields.forEach((field:any)=>{
    if(field.Name!='ID'){
      field.Status='consulté'
      field.Serv_Id=null
    }
  })
  this.fields.sort((a:any, b:any) => a.Name.localeCompare(b.Name))
}
  }

  correctionField(index:any){
    if(this.fields[index].Serv_Id!=null){
      let indexT=this.formulaire.tables.findIndex((e:any)=> e.Table_Id==this.fields[index].Table_Id)
      let indexF=this.formulaire.tables[indexT].fields.findIndex((e:any)=>e.Name==this.fields[index].Name)
      let updatedField={
        Field_Id:this.fields[index].Field_Id,
        Table_Id:this.fields[index].Table_Id,
        Name:this.fields[index].Name,
        Type:this.fields[index].Type,
        choises:this.fields[index].choises,
        Status:this.fields[index].Status,
        Serv_Id:this.fields[index].Serv_Id,
        Serv_description:this.fields[index].Serv_description,
        Field_order:this.formulaire.tables[indexT].fields[indexF].Field_order
  
      }
   this.FormulaireService.updateField(updatedField).subscribe((res:any)=>{})
    }
    this.editSatus(index)
  }
  nextServ(){
      let newServ={
        Formulaire_Id:this.formulaire.Formulaire_Id,
        Serv_Name:this.currentsrvName,
        Serv_User:null,
        Serv_order:this.currentsrvOrd,
        serv_reponse:null,
        Serv_Refer:null
      }
      if(this.currentsrvOrd==this.shownServNum){
        this.FormulaireService.creatNewService(newServ).subscribe((serv:any)=>{
    serv['fields']=[{
    Name:'ID',
    Type:'auto_number',
    Status:'consulté'
  }]
        serv.fields.forEach((field:any)=>{
          field.Serv_Id=serv.Serv_Id
        })
        this.currentsrvOrd++;
        this.shownServNum++;
        this.servsEtap.push(serv)
        this.fields.forEach((field:any)=>{

          if(field.Name!='ID'){    
     
            let newField={
            Table_Id:field.Table_Id,
            Name:field.Name,
            Type:field.Type,
            choises:field.choises,
            Status:field.Status,
            Serv_Id:serv.Serv_Id,
            Serv_description:field.Serv_description,
            Field_order:field.Field_order
      
          }
          this.FormulaireService.creatFieldToServ(newField).subscribe((res:any)=>{
            console.log
            res['editDesc']=false
            res['editSataus']=false
            res['editName']=false
            res['editType']=false
            res['oldName']=''
            serv.fields.push(res);
            field.Status='consulté'
          })}
        })
      })}
      else{
        if(Number(this.shownServNum)+1<=Number(this.currentsrvOrd)){
        this.shownServNum=Number(this.shownServNum)+1
        this.fieldsToShow()}
      }

  }
  prevServ(){
    
    if(Number(this.shownServNum)-1>0){
      this.shownServNum=Number(this.shownServNum)-1
      this.fieldsToShow()}
  }

 changeServName(){
  if(this.currentsrvOrd!=this.shownServNum){
   let updateServ={
    Serv_order:Number(this.shownServNum),
    Formulaire_Id:this.formulaire.Formulaire_Id,
    newName:this.currentsrvName
   }
   this.FormulaireService.updateServName(updateServ).subscribe((res:any)=>{
    console.log(res)
   })
  }
 }

  getNewFormulaire(){
    this.authService.loadUser();
    this.route.params.subscribe((param:any)=>{
      this.FormulaireService.getFormulaireById(param.id).subscribe((form:any)=>{
        this.FormulaireService.getTables(param.id).subscribe((tables:any)=>{
  this.lastTableIndex=tables.length-1
          this.FormulaireService.getServicesByformulaire(param.id).subscribe((servs:any)=>{
            if(param.generated==1){
              this.isGenerated=true
            }
            let level=0
            for(let i=0;i<tables.length;i++){
              let index=tables.findIndex((e:any)=> e.Table_level==level)
              
              tables[index]['fields']=[]
              this.FormulaireService.getAllFields(tables[index].Table_Id).subscribe((fields:any)=>{
               
                  
              tables[index]['fields']=fields
              fields.forEach((field:any)=>{
                field.Status='consulté'
                this.fields.push(field)
              })
                
              
              })  
              level++
            }
            this.FormulaireService.workingServices(param.id).subscribe((servs:any)=>{
              servs.forEach((serv:any)=>{
                serv['fields']=[]
                this.FormulaireService.getFields(serv.Serv_Id).subscribe((fields:any)=>{
                  fields.forEach((field:any)=>{
                    field['editDesc']=false
                    field['editSataus']=false
                    field['editName']=false
                    field['editType']=false
                    field['oldName']=''
                    serv.fields.push(field)
                  })
                })
              })
              this.servsEtap=servs
              this.currentsrvOrd=servs.length+1
              this.shownServNum=this.currentsrvOrd
            })

              
              form['tables']=tables
              form['services']=servs

              this.formulaire=form

              this.currentsrvName=servs[0].Serv_Name
              this.numservs=this.formulaire.services.length
              this.fields.sort((a:any, b:any) => a.Name.localeCompare(b.Name))
              console.log(this.formulaire,this.fields)
              


          })

        })
        
      })
    })
  }

}
