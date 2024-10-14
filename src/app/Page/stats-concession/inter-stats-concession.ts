export interface InterStatsConcession {
  id: number;
  total_selled_car: number;
  number_sale_all_price: number;
  total_selled_model_price: number;
  total_selled_options_price: number;
  total_selled: number;
  percent_of_total_selled: number;
}


export interface InterStatsPercent {
  animationEnabled: boolean;
  title: { text: string };
  data: Array<{
    type: string;
    dataPoints: Array<{ y: number, label: string }>;
  }>;
}
