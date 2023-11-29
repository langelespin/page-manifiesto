import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geofata_wordLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
//import { ArticleService } from 'src/app/services/article.service';
import { Country } from '../models/Country.model';
import { PaisesService } from '../services/paises.service';
import { environment } from '../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormControl} from '@angular/forms';

export interface PeriodicElement {
  name: string;
  institution: any;
  type: any;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  //Tabla
  @ViewChild(MatTable) table?: MatTable<any>;

  displayedColumns: string[] = ['name', 'institution', 'type'];
  ELEMENT_DATA: any[] = []
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);

  serachFormControl = new FormControl('', []);
  
  private urlProject: string = environment.urlProject;
  countrys!: Country[];
  private chart!: am4maps.MapChart;
  constructor(
    private paisesService: PaisesService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe(resp=>{
      this.idioma = resp.lang
      this.ngAfterViewInit()
    })

    this.paisesService.getRegistrosFirma().subscribe((firmantes: any) =>{
      console.log("firms", firmantes)
      firmantes.forEach((element: any) => {
        this.ELEMENT_DATA.push({name: element.nombre+' '+element.apellidos, institution: element.institucion, type: element.tipo})
      });
      this.table?.renderRows();
    })
  }

  cities: any[] = []
  idioma = localStorage.getItem('idioma')
  ngAfterViewInit(): void {
    this.chart = am4core.create('chartdiv', am4maps.MapChart); // Create map instance
    this.chart.geodata = am4geofata_wordLow; // Set map definition
    this.chart.projection = new am4maps.projections.Miller(); // Set projection
    this.chart.maxZoomLevel = 1;
    this.chart.seriesContainer.draggable = false;
    this.chart.seriesContainer.resizable = false;

    // Creating polygon series and loadin data
    let polygonSeries = this.chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.exclude = ['AQ'];
    polygonSeries.useGeodata = true;

    let polygonTemplate = polygonSeries.mapPolygons.template;
    // polygonTemplate.tooltipText = '{name}';
    polygonTemplate.polygon.fillOpacity = 0.6;
    polygonTemplate.fill = am4core.color('#9B9B9B');
    // let hs = polygonTemplate.states.create('hover');
    // hs.properties.fill = am4core.color('#74X999');

    let imageSeries = this.chart.series.push(new am4maps.MapImageSeries());
    imageSeries.dataFields.value = 'value';
    imageSeries.fill = am4core.color('#e5243b');

    let imageTemplate = imageSeries.mapImages.template;
    imageTemplate.propertyFields.latitude = 'latitude';
    imageTemplate.propertyFields.longitude = 'longitude';
    imageTemplate.nonScaling = true;
    imageTemplate.fill = am4core.color('white');

    imageSeries.tooltip!.label.interactionsEnabled = true;
    imageSeries.tooltip!.keepTargetHover = true;

    let circle = imageTemplate.createChild(am4core.Circle);
    circle.fillOpacity = 0.7;
    circle.propertyFields.fill = 'color';
    circle.tooltipText = '{name}';
    circle.events.on("hit", function(ev) {
      // zoom to an object
    
      // get object info
      console.log("hit", ev.target.dataItem?.dataContext);
    });
    //circle.urlTarget = '_self';
    //circle.url = this.urlProject + '#/mapa/{clave}';
    let datos: any = []

      function addCity(longitude: any, latitude: any, title: any, dato: any) {
        datos.push({
          "clave": dato.idPais,
          "color": "#FF4C00",
          "latitude": Number(latitude),
          "name": title,
          "id": dato.siglas,
          "value": dato.total,
          "longitude": Number(longitude)
        });
      }
    this.paisesService.getDatosMapa().subscribe((countrys: any) => {
      this.cities = countrys
      for (var i = 0; i < this.cities.length; i++) {
        var city = this.cities[i];
        if(Number(city.idPais) != 96)
        {
          addCity(city.longitud, city.latitud, (this.idioma == 'en'?  city.paisE : city.pais )+'\n'+city.total, city);
        }
      }
      imageSeries.data = datos
      imageSeries.dataSource.parser = new am4core.JSONParser();
      imageSeries.heatRules.push({
        "target": circle,
        'property': 'radius',
        'min': 5,
        'max': 15,
        'dataField': 'value'
      });

   })
   
      
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.dispose();
    }
  }

}
