import {Component} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {PaisesService} from 'src/app/services/paises.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent  {
  pais: any[] = [];
  formFirm = this.dt.group({
    nombre: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    tipo: ['', [Validators.required]],
    institucion: ['', [Validators.required]],
    cargo: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    logo: ['']
  })
  constructor(
    private paisesService: PaisesService,
    private dt: FormBuilder
    ){

  }
  ngOnInit(){
    
    this.paisesService.getAllPaises().subscribe( result => {
      this.pais = result;
      console.log(this.pais)
    });
  }

  saveFile(event:any){
    const file:File = event.target.files[0].name;
    this.formFirm.controls['logo'].setValue(event.target.files[0].name);
    console.log(file);
    
  }
  saveDate(){
   const data={
    "datos":{
      "id": 0,
      "nombre": this.formFirm.get('nombre')?.value,
      "apellidos": this.formFirm.get('apellidos')?.value,
      "correo": this.formFirm.get('correo')?.value,
      "cargo": this.formFirm.get('cargo')?.value,
      "institucion": this.formFirm.get('institucion')?.value,
      "pais": this.formFirm.get('pais')?.value,
      "logo": this.formFirm.get('logo')?.value,
      "tipo": Number(this.formFirm.get('tipo')?.value)
    }
   }
   console.log(data.datos.cargo); 
   if(this.formFirm.valid){
    this.paisesService.postAllGuardarRegistroFirma(data).subscribe( response => {
      console.log(response);
      if(response.status === "OK"){
        Swal.fire({
        icon: 'success',
        title: 'Su firma se registro correctamente',
        showConfirmButton: false,
        timer: 2500
      })
      }
  });
  }else {
    this.formFirm.markAllAsTouched();
  }
  
  }


  
}

