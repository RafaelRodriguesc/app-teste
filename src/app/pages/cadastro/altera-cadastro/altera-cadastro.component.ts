import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-altera-cadastro',
  templateUrl: './altera-cadastro.component.html',
  styleUrls: ['./altera-cadastro.component.css']
})
export class AlteraCadastroComponent implements OnInit {

  classToApply: string = 'noShow'
  cepNaoEcontrado: boolean = false
  idUsuarios: number | null = 0
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
    private _http: HttpClient,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.usuarios.controls.logradouro.disable()
    this.usuarios.controls.bairro.disable()
    this.usuarios.controls.cidade.disable()
    this.usuarios.controls.estado.disable()
  }

  ngOnInit(): void {
    this.idUsuarios = Number (this._activatedRoute.snapshot.paramMap.get('id'))
    console.log("id do usuario", this.idUsuarios)
    this.buscausuarioId(this.idUsuarios)
  }

  buscausuarioId(id:number) {
    this._usersService.getUser(id).subscribe(data => {
      console.log("data do usuario", data)
      this.usuarios.controls.id.setValue(data.id)
      this.usuarios.controls.nome.setValue(data.nome)
      this.usuarios.controls.telefone.setValue(data.telefone)
      this.usuarios.controls.cep.setValue(data.cep)
      this.usuarios.controls.logradouro.setValue(data.logradouro)
      this.usuarios.controls.bairro.setValue(data.bairro)
      this.usuarios.controls.cidade.setValue(data.cidade)
      this.usuarios.controls.estado.setValue(data.uf)
      this.usuarios.controls.email.setValue(data.email)
      this.usuarios.controls.senha.setValue(data.senha)
      this.usuarios.controls.acesso.setValue(data.acesso)
    })
}

  goBack() {
    this._router.navigate(['/home'])
  }

  alterar()  {
    console.log("this.usuarios", this.usuarios)
    this._usersService.putUsuarios(this.usuarios).subscribe(data =>{
      console.log('data retorno', data)
      this._router.navigate(['/home'])
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
