import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Categoria } from 'src/model/categoria';
import { Usuario } from 'src/model/usuario';

const apiUrl = 'https://localhost:7083/api/categorias';
const apiLoginUrl = 'https://localhost:7083/api/Autoriza/login';
var token;
var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  montaHeaderToken(){

    token = localStorage.getItem("jwt")

    console.log('jwt header token: ' + token);
    httpOptions = {headers: new HttpHeaders({"Authorization": "Bearer " + token, "Content-Type": "application/json"})}
  }

  Login(Usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(apiLoginUrl, Usuario).pipe(tap((Usuario: Usuario) => console.log(`Login usuario com email = ${Usuario.email}`)), catchError(this.handleError<Usuario>('login'))
    );
  }

  getCategorias(): Observable<Categoria[]> {
    this.montaHeaderToken();
    console.log(httpOptions.headers);

    return this.http.get<Categoria[]>(apiUrl, httpOptions).pipe(tap(Categorias => console.log("leu as categorias")));
  }

  getCategoriaById(id: string): Observable<Categoria> {
    this.montaHeaderToken();
    console.log(httpOptions.headers);
    const url = `${apiUrl}/${id}`;
    return this.http.get<Categoria>(url, httpOptions).pipe(tap(Categoria => console.log(`getbyid ${id}`)));
  }

  addCategoria(Categoria: Categoria): Observable<Categoria> {
    this.montaHeaderToken();
    return this.http.post<Categoria>(apiUrl, Categoria, httpOptions).pipe(tap((Categoria: Categoria) => console.log(`adicionou a categoria com w/ id = ${Categoria.categoriaId}`)), catchError(this.handleError<Categoria>('createCategoria')))
  }

  updateCategoria(id: string, Categoria: Categoria): Observable<any> {
    this.montaHeaderToken();
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, Categoria, httpOptions).pipe(tap(_ => console.log(`atualiza produto com id ${id}`)), catchError(this.handleError<Categoria>('updateCategoria')))
  }

  deleteCategoria(id: string): Observable<Categoria> {
    this.montaHeaderToken();
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Categoria>(url, httpOptions).pipe(tap(_ => console.log(`remove categoria com o id ${id}`)), catchError(this.handleError<Categoria>('deleteCategoria')))
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
