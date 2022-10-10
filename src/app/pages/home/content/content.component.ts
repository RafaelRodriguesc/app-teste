import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/app/models/users';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  usuarios: any[] = []

  constructor(
    private _router: Router,
    private _userService: UsersService
  ) { }

  ngOnInit(): void {
    this.buscaUsuarios()
  }

  buscaUsuarios() {
    this._userService.getALLUsers().subscribe(data =>{
      this.usuarios = data
    })
  }

  goDelete(id:number) {
    const params = {
      id: id,
      tabela:'usuarios'
    }
    this._userService.deleteitem(params).subscribe(data => {
      console.log("data returned from delete", data)
      this.getAllUsers()
    })
  }
  getAllUsers() {
    this._userService.getALLUsers().subscribe(data => {
      this.usuarios = data

    })
  }

  goAltera(id:number) {
    this._router.navigate(['altera-cadastro', id])

  }

}
