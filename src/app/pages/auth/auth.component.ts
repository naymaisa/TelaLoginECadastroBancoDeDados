import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface Usuario{
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-auth',
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit  {
form!: FormGroup;
isLoginMode = true;

constructor(
  private fb: FormBuilder,
  private router: Router,
  private authService: AuthService
){}

ngOnInit(): void {
  this.setupForm();
}

setupForm():void{
  this.form = this.fb.group({
    name:[''],
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(6)]]
  })
}
toggleMode(): void{
  this.isLoginMode = !this.isLoginMode;
}


onSubmit(): void{
if( this.form.invalid)return;

const{name, email, password} = this.form.value;

if(this.isLoginMode){
  this.authService.login({email, password}).subscribe(usuario =>{
    if(usuario){
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario))
      this.router.navigate(['/home'])
    }else{
      alert('Email ou senha invalidos')}
  })
}else{
   this.authService.cadastrar({name, email, password}).subscribe(msg =>{
        alert(msg)
        this.toggleMode()
        this.form.reset()
      })
    }
}
}

