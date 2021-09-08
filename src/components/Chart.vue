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
    }
  },
  mounted () {
    // this.renderChart(this.chartData, this.chartOptions)
    const times = this.chartData.map(d=>d.time)
    const temps = this.chartData.map(d=>d.temp)

    this.renderChart({
        labels: times,
        datasets: [
            {
                label: this.label,
                data: temps,
                borderColor: "none",
                pointBorderColor: "#f9daf8",
                pointBackgroundColor: "#f9daf8",
                backgroundColor: "#e6c4e5"
            }
        ]
    },
    this.options
    )
  },

  updated(){
    const times = this.chartData.map(d=>d.time)
    const temps = this.chartData.map(d=>d.temp)    


    this.renderChart({
        labels: times,
        datasets: [
            {
                label: this.label,
                data: temps,
                borderColor: "none",
                pointBorderColor: "#f9daf8",
                pointBackgroundColor: "#f9daf8",
                backgroundColor: "#e6c4e5"
            }
        ]
    },
    this.options
    )
  }

}

)
</script>
