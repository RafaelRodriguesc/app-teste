import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent  {

  classToApply: string = 'noShow'
  cepNaoEcontrado: boolean = false
  disabled: boolean = true

  usuarios = new FormGroup ({
    nome: new FormControl('', [Validators.required]),
    telefone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required]),
    acesso: new FormControl('', [Validators.required]),
    cep: new FormControl('', [Validators.required]),
    logradouro: new FormControl(''),
    bairro: new FormControl(''),
    cidade: new FormControl(''),
    estado: new FormControl(''),
    id: new FormControl('')
  })

  constructor(
    private _router: Router,
    private _usersService: UsersService,
    private _http: HttpClient
  ) {
    this.usuarios.controls.logradouro.disable()
    this.usuarios.controls.bairro.disable()
    this.usuarios.controls.cidade.disable()
    this.usuarios.controls.estado.disable()

  }


  goBack() {
    this._router.navigate(['/home'])
  }

  cadastrar() {
    this._usersService.postItem(this.usuarios.value).subscribe(data => {
      console.log("data returned =>", data)
    })

  }
  buscaCep(e:any) {
    this._http.get('https://viacep.com.br/ws/'+e.target.value+'/json').subscribe((data:any) => {
      if(data.erro) {
        this.classToApply = 'noShow';
        this.cepNaoEcontrado = true
        setTimeout(() => {
          this.cepNaoEcontrado = false
          this.usuarios.controls.cep.setValue('')
        }, 2000)
        return
      } else {
        this.classToApply = 'show'
        this.usuarios.controls.logradouro.setValue(data.logradouro)
        this.usuarios.controls.bairro.setValue(data.bairro)
        this.usuarios.controls.cidade.setValue(data.localidade)
        this.usuarios.controls.estado.setValue(data.uf)

      }

    })
  }
}
