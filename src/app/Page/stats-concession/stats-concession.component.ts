import {Component, inject, OnInit} from '@angular/core';
import {CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";
import {ServiceStatsConcessionService} from "./service-stats-concession.service";
import {InterStatsConcession, InterStatsPercent} from './inter-stats-concession';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-stats-concession',
  standalone: true,
  imports: [
    CanvasJSAngularChartsModule
  ],
  templateUrl: './stats-concession.component.html',
  styleUrls: ['./stats-concession.component.scss']
})
export class StatsConcessionComponent {
  chartOptions = {
    title: {
      text: "de la concession 1 "
    },
    data: [{
      type: "column",
      dataPoints: [
        {label: "Total voiture vendu", y: 0},
        {label: "Total options vendu", y: 0},
      ]
    }]
  };
  StatOptions: InterStatsPercent = {
    animationEnabled: true,
    title: {
      text: "Pourcentage de vente par concession "
    },
    data: [{
      type: "pie",
      dataPoints: [
        {y: 0, label: "Pourcentage Concession 1"},
        {y: 0., label: "Pourcentage Concession 2"},
        {y: 0, label: "Pourcentage Concession 3"},
      ],
    }]
  }

  constructor(private lookStats: ServiceStatsConcessionService, route: ActivatedRoute) {
    route.params.subscribe(params => this.getStat(params["concession_id"]))
  }

  getStat(id: number) {
    this.lookStats.FuncStatConcession().then((stats: InterStatsConcession[] | undefined) => {
      if (stats) {
        const stats_mapped = stats.reduce((map, current) => map.set(current.id.toString(), current), new Map());
        this.generateVehiclesStat(stats_mapped.get(id));
        this.generateConcessionsCompare(stats.sort((a, b) => a.id < b.id ? 1 : -1));
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  generateVehiclesStat(stats: InterStatsConcession) {
    this.chartOptions = {
      title: {
        text: `De la Concession ${stats.id}`,
      },
      data: [{
        type: "column",
        dataPoints: [
          {label: "Total des ventes", y: stats.number_sale_all_price},
          {label: "Total voiture vendu", y: stats.total_selled_model_price},
          {label: "Total options vendu", y: stats.total_selled_options_price},
        ]
      }]
    };
  }

  generateConcessionsCompare(stats: InterStatsConcession[]) {
    this.StatOptions = {
      animationEnabled: true,
      title: {
        text: "Pourcentage de vente par concession "
      },
      data: [{
        type: "pie",
        dataPoints: stats.map(
          (value) => {
            return {y: value.percent_of_total_selled, label: `Pourcentage Concession ${value.id}`}
          })
      }]
    }
  }
}
