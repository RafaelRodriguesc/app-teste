import { Users } from 'src/app/models/users';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged: boolean = false
  mensagem: string = ''
  acesso: string = ''

  formUsuario: Users

  constructor(
    private _router: Router,
    private _usersService: UsersService
  ) {
    this.formUsuario = new Users
   }

  ngOnInit(): void {
    if (window.localStorage.getItem('usuarios')){
      this._router.navigate(['/home'])
    }
  }

  login() {
    if(this.formUsuario.email === '' || this.formUsuario.senha === '') {
      this.isLogged = true
      this.mensagem = "Campos em branco*"
      setTimeout(() => {
        this.isLogged = false
        this.mensagem = ""
      }, 3000)
    } else {
      this.testLogin()
    }
  }

  testLogin() {
    this._usersService.getALLUsers()
   .subscribe((dados: any) => {
     dados.forEach((element:any) => {
       if(element.email === this.formUsuario.email && element.senha === this.formUsuario.senha) {
         window.localStorage.setItem('user', this.formUsuario.senha)
         window.localStorage.setItem('acesso', element.acesso)
         this._router.navigate(['/home']);
       }
     });
     this.mensagem = 'Usuário não encontrado';
     this.isLogged = true
     setTimeout( () => {
       this.isLogged = false
       this.mensagem = "";
       this.formUsuario.senha = ''
       this.formUsuario.email = ''
     }, 3000)
   })
  }
}
