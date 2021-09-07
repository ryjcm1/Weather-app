<script>
import { defineComponent } from 'vue'
import { Line } from 'vue3-chart-v2'

export default defineComponent({
  extends: Line,
  props: {
    chartData: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: false
    },
    label:{
        type: String,
        required: false
    },
    chartColors:{
        type: Object,
        require: false
    }
  },
  mounted () {
    // this.renderChart(this.chartData, this.chartOptions)
    const times = this.chartData.map(d=>d.time)
    const temps = this.chartData.map(d=>d.temp)
    const {borderColor, pointBorderColor, pointBackgroundColor, backgroundColor} = this.chartColors

    this.renderChart({
        labels: times,
        datasets: [
            {
                label: this.label,
                backgroundColor: '#191',
                data: temps,
                borderColor: borderColor,
                pointBorderColor: pointBorderColor,
                pointBackgroundColor: pointBackgroundColor,
                backgroundColor: backgroundColor
            }
        ]
    },
    this.options
    )
  },

  updated(){
    const times = this.chartData.map(d=>d.time)
    const temps = this.chartData.map(d=>d.temp)
    const {borderColor, pointBorderColor, pointBackgroundColor, backgroundColor} = this.chartColors


    this.renderChart({
        labels: times,
        datasets: [
            {
                label: this.label,
                backgroundColor: '#191',
                data: temps,
                borderColor: borderColor,
                pointBorderColor: pointBorderColor,
                pointBackgroundColor: pointBackgroundColor,
                backgroundColor: backgroundColor
            }
        ]
    },
    this.options
    )
  }

}

)
</script>
