<template>
  <div class='container'>
  <caseblockslidecounttable> </caseblockslidecounttable>
  <b-button variant="secondary sm" @click="clearCurrentSlide()">Show Details</b-button>
  </div>
</template>

<script>
import store from '../store.js'
import axios from 'axios'
import caseblockslidecounttable from './CaseBlockSlideCountTable'

export default {
  name: 'PathConsole',
  components: { 
    caseblockslidecounttable
  },
  data() {
    return {
      blTblDataLoaded: false,
      strLocnIDURLHash: null
    }
  },
  watch: {
   $route(to, from) {
     console.log(to)
     console.log(from)
     this.strLocnIDURLHash = this.$route.params.locnid
   }

  },
  mounted() {
      console.log('Hello mounted')
      this.GetTableData()
  },
  methods: {
    GetTableData () {
      this.blTblDataLoaded = false
      store.dispatch('LoadCaseBlockSlideCountTableData', this.$route.params.locnid).then(() => {
        console.log('Promise completed')
        this.objAllRunData = store.state.objPieChartTotalData
        this.objFirstRunData = store.state.objPieChartFirstRunData
        this.objSecondRunData = store.state.objPieChartSecondRunData
        this.objThirdRunData = store.state.objPieChartThirdRunData
        this.objFourthRunData = store.state.objPieChartFourthRunData
        this.loaded=true    
      })  
    }
  }
}
</script>
