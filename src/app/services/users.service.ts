import { Users } from './../models/users';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  urlUser: string = 'http://localhost:3000/usuarios'

  constructor(
    private _http: HttpClient,
  ) { }

  getALLUsers(): Observable<any> {
    this._http.get(this.urlUser).subscribe(data => {
      console.log(data)
    })
    return this._http.get(this.urlUser)
  }

  postItem(params: any): Observable<any> {
    return this._http.post<any>(this.urlUser, params)

  }
  deleteitem(params:any): Observable<any>{
    const tabela = params.tabela
    const id = params.id
    return this._http.delete<any>(this.urlUser+'/'+id)
  }

  getUser(id: number) : Observable<any> {
    return this._http.get(this.urlUser+"/"+id)
  }

  putUsuarios (params: any) : Observable<any> {
    console.warn(params)
    return this._http.put(this.urlUser+'/'+params.value.id, params.value)
  }


}
