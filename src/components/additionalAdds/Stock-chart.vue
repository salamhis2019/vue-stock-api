<template>
  <div class="chart-area">
    <LineChartGenerator
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs'
import clone from 'just-clone'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
)

export default {
  name: 'LineCharts',
  components: {
    LineChartGenerator
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    },
    loadInfoContainer: {
      type: Boolean,
      default: false
    },
    timeLabels: {
      type: Array
    },
    closingPrices: {
      type: Array
    },
    chartOption: {
      type: Object
    }
  },
  data() {
    return {
      chartOptions: {
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: 24,
              stepSize: 1,
              beginAtZero: true,
              font: {
                size: 14
              }
            }
          },
          y: {
            grid: {
              display: false
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.9)',
              font: {
                size: 16,
                style: 'italic'
              }
            }
          }
        },
      },
    }
  },
  computed: {
    chartData() {
      return clone({
        labels: this.timeLabels,
        datasets: [
          {
            label: 'Closing Price',
            data: this.closingPrices,
            borderColor: this.chartOption.color,
            backgroundColor: this.chartOption.color,
            pointBackgroundColor: '#11111100',
            pointBorderColor: '#11111100',
            pointHoverBackgroundColor: this.chartOption.color,
            pointHoverBorderColor: '#FFF',
            pointRadius: 7,
            borderWidth: 1.5
          }
        ]
      })
    }
  },
}
</script>

<style scoped>
.chart-area {
  box-sizing: border-box;
  background: linear-gradient(to right, #1B1B1C, #111111);
  border-top-left-radius: 25px;
  border-bottom-right-radius: 25px;
  padding: 1em;
  color: #11111100;
}
</style>