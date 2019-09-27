<template>
  <div class='container'>
  <caseblockslidecounttable v-if='blTblDataLoaded'> </caseblockslidecounttable>
  <b-button v-if='ShowDetailButtonVisible' variant="secondary sm" @click="ClickShowHideDetails()">{{strShowDetailText}}</b-button>
  <br>
  <br>
  <slidedetailstable v-if='ShowDetails'> </slidedetailstable>
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
        this.blDetailsShow = true
        }) 
      },
      ClickShowHideDetails() {
       if (this.blDetailsShow) {
        this.blDetailsVisible = false
        this.strShowDetailText = 'Show Details'
       } else {
         if (this.blTblSlideDetailsDataLoaded) {
         this.blDetailsVisible = true
         } else {
          this.LoadSlideDetailsTableData()
          this.blDetailsVisible = true
         }

        this.strShowDetailText = 'Hide Details'
       }
      }
  },
  computed: {
    ShowDetailButtonVisible (){
      //if (this.validuser=='f' || !blockID ) {
      if (this.blTblDataLoaded) {
        return true
      } else {
        return false
      }
    },
    ShowDetails () {
      if ( this.blTblDataLoaded && this.blDetailsVisible ){
        return true
      } else {
        return false
      }
    }

  }
}
</script>
