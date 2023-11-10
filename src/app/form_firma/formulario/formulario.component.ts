import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {PaisesService} from 'src/app/services/paises.service';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent  {
  pais: any[] = [];
  options: string[] = ['Estoy firmando como particular.', 'Firmo en nombre de una institución u otra organización.'];
  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required]);
  surname = new FormControl('', [Validators.required]);
  disableSelect = new FormControl(false);

  constructor(
    private paisesService: PaisesService
    ){

  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un valor';
    }else{
      return this.email.hasError('email') ? 'No es valido tu correo' : '';
    }

    
  }
  
  ngOnInit(){
    
    this.paisesService.getAllPaises().subscribe( result => {
      this.pais = result;
      console.log(this.pais)
    });
  }
}

