<template>
  <div class='container'>
  <caseblockslidecounttable v-if='blTblDataLoaded'> </caseblockslidecounttable>
  <br>
  </div>
</template>

<script>
import store from '../store.js'
import axios from 'axios'
import caseblockslidecounttable from './CaseBlockSlideCountTable'
import slidedetailstable from './SlideDetailsTable'

export default {
  name: 'MasterPathConsole',
  components: { 
    caseblockslidecounttable,
    slidedetailstable
  },
  data() {
    return {
      blTblDataLoaded: false,
      strLocnIDURLHash: null,
      blTblSlideDetailsDataLoaded: false,
      strShowDetailText: 'Show Details',
      blDetailsShow: false,
      blDetailsVisible: false
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
      store.dispatch('AssignSlideDistrLoc', 'Slide Distribution')
      // store.dispatch('AssignSlideDistrLoc', 'Slide Distribution').then(() => {
      //   console.log('AssignSlideDistrLoc completed')  
      // })  
      this.GetTableData()
  },
  methods: {
    GetTableData () {
      this.blTblDataLoaded = false
      store.dispatch('LoadAllLocBlockCountTableData', this.$route.params.locnid).then(() => {
        console.log('Promise completed')
        this.blTblDataLoaded=true    
      })  
    }
  },
  computed: {
  }
}
</script>
