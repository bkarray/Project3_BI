import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { GraphsService } from 'src/app/services/Graphs/graphs.service';
import { AuthService } from 'src/app/services/auth/authservice';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {


  selectedFile: File | null = null;
  constructor(
   private GraphsService:GraphsService,
    private AuthService:AuthService 
  ) { }

  @Input() isValidation:boolean=false;
  @Input() action:any=null
  @Output() close=new EventEmitter<boolean>();
  documents:any[]=[];

  ngOnInit(): void {
    this.getDocuments();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      console.log(this.selectedFile.name);
      
      formData.append('Document', this.selectedFile);
      formData.append('User_Submitter', this.AuthService.authenticatedUser.U_Id)
      formData.append('Document_Name', this.selectedFile.name);
      if(this.isValidation){
        this.GraphsService.createDocumentValidatedByAction(this.action.Action_Id,formData).subscribe((res:any)=>{
          this.documents.push(res);
          
        }
        )
      }else{
      this.GraphsService.createDocumentSubmittedByAction(this.action.Action_Id,formData).subscribe((res:any)=>{
        this.documents.push(res);
      }
      )
    }
      
  }
}


getURlDocument(document:any){

  return this.GraphsService.APIUrl+document.Document;
}


deleteDocument(document:any){
this.GraphsService.deleteDocument(document.Document_Id).subscribe((res:any)=>{
this.documents=this.documents.filter((doc:any)=>doc.Document_Id!=document.Document_Id);
})
}
validate(){
  this.close.emit(true);
}
getDocuments(){
  console.log('isValidation',this.isValidation);
  if(this.isValidation){
   this.GraphsService.getDocumentsValidatedByAction(this.action.Action_Id).subscribe((documents:any)=>{
    this.documents=documents;
    console.log('documents',documents);
   })
  }
  else{
    this.GraphsService.getDocumentsSubmittedByAction(this.action.Action_Id).subscribe((documents:any)=>{
      this.documents=documents;
      console.log('documents',documents);
     })
  }
}

}
