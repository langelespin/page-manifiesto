import { Component, OnInit } from '@angular/core';
import { PaisesService } from '../services/paises.service';
import { Maps, Marker, MapsTooltip, Bubble } from '@syncfusion/ej2-angular-maps';
import { world_map } from './world-map';
Maps.Inject(Marker, MapsTooltip);
Maps.Inject(Bubble);

@Component({
  selector: 'app-mapa',
  styleUrls: ['./mapa.component.css'],
  template:
    `    
    <ejs-maps id='rn-container'>
    <e-layers>
    <e-layer  [shapeData]= 'shapeData' [bubbleSettings] = 'bubbleSettings'></e-layer>
    </e-layers>
    </ejs-maps>`
})
export class MapaComponent implements OnInit {

  constructor(
    private paisesService: PaisesService
  ){
    /*this.shapeData = world_map;
    this.shapeSettings = {
        fill: '#CDCDCD'
    };
    
let i = 0
    this.paisesService.getDatosPaisesMap().subscribe(resp =>{
      console.log("paises", resp)
      this.dataPaises = resp
      this.dataPaises.forEach(item =>{
        console.log("item", item)
        this.data.push({ name: item.paisE, population: item.total , text: item.paisE+'<br>'+item.total })
      })

      this.markerSettings = [{
        enableDrag: true,
        dataSource: 
             this.data
        ,
        visible: true,
        animationDuration: 0,
        shape: 'Circle',
        tooltipSettings: {
            visible: true,
            valuePath: 'name',
        }
    }]

    console.log("set", this.markerSettings)
      console.log("szd", this.data)
    });*/
  }



  dataPaises: any[] = []
  public shapeData?: object;
  public markerSettings?: object;
  public shapeSettings?: object;
  public zoomSettings?: object;
  data: Object[] = [];
  prueba: any = []

      public shapeDataPath?: object | any;
      public shapePropertyPath?: object | any;
      public bubbleSettings?: object;


  ngOnInit(): void {
      console.log("dataaa", this.data)
      console.log("prueba", )
      this.cargaDatos()
              .then(base64 => {
                console.log("x", base64);
                this.shapeData = world_map;
                this.shapeDataPath = 'name';
                this.shapePropertyPath = 'name',
                this.bubbleSettings = [{
                    visible: true,
                    minRadius: 5,
                    dataSource: [
                        { name: 'India', population: '38332521' },
                        { name: 'New Zealand', population: '19651127' },
                        { name: 'Pakistan', population: '3090416' }
                    ],
                    maxRadius: 80,
                    valuePath: 'population'
                }]

          console.log("resp", this.bubbleSettings)

              })
              .catch(error => {
                console.error(error);
              })
         

        
      
  }

  /*pruebaa(): any{
    this.paisesService.getDatosPaisesMap().subscribe(resp =>{
      console.log("paises", resp)
      this.dataPaises = resp
      this.dataPaises.forEach(item =>{
        this.data.push({ name: 'India', population: '38332521' })
      })
       return this.data
    })

    return [
      { name: 'India', population: '38332521' },
      { name: 'New Zealand', population: '19651127' },
      { name: 'Pakistan', population: '3090416' }
  ]
  }*/

  cargaDatos(): Promise<any> {
    return new Promise((resolve, reject) => {
          this.paisesService.getDatosPaisesMap().subscribe(resp =>{
            console.log("paises", resp)
            this.dataPaises = resp
            this.dataPaises.forEach(item =>{
              this.data.push({ name: item.paisE, population: item.total , text: item.paisE+'<br>'+item.total })
            })
            resolve([
              { name: 'India', population: '38332521' },
              { name: 'New Zealand', population: '19651127' },
              { name: 'Pakistan', population: '3090416' }
          ]);

          }, error=>{
            reject(error);
          })
    });
  }
  
  
}
