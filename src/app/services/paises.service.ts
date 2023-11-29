import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  // private paises = 'http://148.215.24.201:5000/siir/usuarios/catalogo/countries';
  // private guardarDatos = 'http://148.215.24.201:5000/siir/usuarios/usuario/guardarRegistroFirma'

  // private paises = 'https://fiap.redalyc.org/back/siir/postulacion/catalogo/countries';
  // private guardarDatos = 'https://fiap.redalyc.org/back/siir/usuarios/usuario/guardarRegistroFirma'

  private paises = environment.urlBack + '/siir/postulacion/catalogo/countries';
  private guardarDatos = environment.urlBack + '/siir/usuarios/usuario/guardarRegistroFirma'

  constructor(private http: HttpClient) { }
  public getAllPaises(): Observable<any>{
    return this.http.get(this.paises);
  }

  public postAllGuardarRegistroFirma(form: any): Observable<any>{
    console.log(form);
    return this.http.post(this.guardarDatos, form);
  }

  public postSubirArchivo(form:any): Observable<any>{
    // return this.http.post('https://fiap.redalyc.org/back/siir/generador/archivos/subir', form);
    return this.http.post(environment.files + '/generador/archivos/subir', form);
    
  }

  public getDatosMapa(): Observable<any>{
    return this.http.get(environment.files + '/usuarios/usuario/recuperarDatosPaises');
  }

  getRegistrosFirma(): Observable<any>{
    console.log(1)
    return this.http.get(environment.files + '/usuarios/usuario/recuperarRegistrosFirma');
  }



}

