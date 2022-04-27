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
    }
  },
  data() {
    return {
      chartData: {
        labels: this.timeLabels,
        datasets: [
          {
            label: 'Closing Price',
            backgroundColor: [
              'green',
              'rgba(255, 255, 255, 0.1)'
            ],
            data: this.closingPrices,
            borderColor: [
              'rgba(255, 255, 255, 0.9)'
            ],
            fill: true,
            pointRadius: 0,
            borderWidth: 2.5
          }
        ]
      },
      chartOptions: {
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: 'rgba(255, 255, 255, 1)',
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
              color: 'rgba(255, 255, 255, 1)',
              font: {
                size: 18
              }
            }
          }
        },
      }
    }
  }
}
</script>

<style scoped>

</style>