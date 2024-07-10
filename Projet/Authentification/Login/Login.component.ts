
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'Projet/Authentification/Login';

@Component({
  selector: 'app-Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  log: FormGroup | any;
  submitted = false;
  constructor(private authService:AuthService,private fb: FormBuilder,private router:Router) { }
  U_login: string = "";
  U_pwd: string = "";

  
/* Initial */

  ngOnInit(): void {
    if(this.authService.isAuthenticated())
      {
        this.router.navigate(['/P_Home']);
      }
    this.log = this.fb.group({
      login: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(50)]],
    })
  }

  get f()
    {
      return this.log.controls;
    }



/* Action HTML */

  onSubmit() {
    this.submitted = true;
    if (this.log.invalid) {
      return;
    }

    var u = {
      username:this.U_login,
      password:this.U_pwd
    }
    this.Signin(u);
  }


  Signin(user:any){
    this.authService.login(user.username,user.password);
      let users
      this.authService.getUser().subscribe((data: any) => {
      let us;
      data.forEach((u:any)=>{
        if(u.U_Email===user.username && u.U_Pwd===user.password) {
          us=u;
        }
      })
      if(us){
        this.authService.authenticated=true;
        this.authService.authenticatedUser=us;
        localStorage.setItem("authenticatedUser",JSON.stringify(this.authService.authenticatedUser));
        alert("vous êtes connecté");
      this.router.navigateByUrl('');
      window.location.reload();
      }
      else{
        alert("mot de passe ou email incorrect")
        this.authService.authenticated=false;
      }
    })
  }

  getuser(){
    this.authService.loadUser()
    console.log(this.authService.authenticatedUser.U_Id);
  }







}