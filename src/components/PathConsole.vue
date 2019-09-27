<template>
  <div class='container'>
  <caseblockslidecounttable v-if='blTblDataLoaded'> </caseblockslidecounttable>
  <b-button variant="secondary sm" @click="LoadSlideDetailsTableData()">Show Slide Details</b-button>
  <br>
  <br>
  <slidedetailstable v-if='blTblSlideDetailsDataLoaded'> </slidedetailstable>
  </div>
</template>

<script>
import store from '../store.js'
import axios from 'axios'
import caseblockslidecounttable from './CaseBlockSlideCountTable'
import slidedetailstable from './SlideDetailsTable'

export default {
  name: 'PathConsole',
  components: { 
    caseblockslidecounttable,
    slidedetailstable
  },
  data() {
    return {
      blTblDataLoaded: false,
      strLocnIDURLHash: null,
      blTblSlideDetailsDataLoaded: false
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
        this.blTblDataLoaded=true    
      })  
    },
    LoadSlideDetailsTableData() {
        this.blTblSlideDetailsDataLoaded = false
        store.dispatch('LoadSlideDetailsTableData').then(() => {
        console.log('Show after promise blah')
        // this.datacollection = store.state.objChartDataCollection
        console.log(store.state.arSlideDetailsTableItems)
        this.blTblSlideDetailsDataLoaded = true
        }) 
      }
  }
}
</script>
