import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Usuario{
  name?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private apiUrl = 'http://localhost:8080/api/usuarios'
  constructor(private http: HttpClient) { }

  cadastrar(usuario: Usuario): Observable<string>{
    return this.http.post(`${this.apiUrl}/cadastro`, usuario,{
      responseType: 'text'
    })
  }
  login(usuario: Usuario): Observable<Usuario  |  null>{
    return this. http.post<Usuario  | null>(`${this.apiUrl}/login`, usuario)
  }
}
