<template>
  <div class='container'>
  <caseblockslidecounttable> </caseblockslidecounttable>
  <b-button variant="secondary sm" @click="clearCurrentSlide()">Show Details</b-button>
  <br>
  <br>
  <slidedetailstable> </slidedetailstable>
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
        this.blTblDataLoaded=true    
      })  
    }
  }
}
</script>
