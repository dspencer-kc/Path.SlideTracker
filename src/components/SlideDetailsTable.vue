<!-- ===========================================================================================

    File: SlideDetailsTable.vue

    Authors: Drew Spencer

============================================================================================ -->
<template>
<div class="container">

  <b-table striped hover dark small borderless :items="arTableItems" :fields="arTableFields"></b-table>


</div>  <!-- /container -->
</template>


<!--components/Slides.vue -->
<script>
import axios from 'axios'
import store from '../store.js'

export default {
  name: 'slidedetails', // component name
  props: {
    lastname: String,
    userid: String,
    },
    data() {
    return {
    }
  },      
  created () {
          console.log('Hello Slide Details Mounted')
          // this.LoadTableData()
      },
  methods: {
      LoadTableData() {
        store.dispatch('LoadSlideDetailsTableData').then(() => {
        console.log('Show after promise blah')
        // this.datacollection = store.state.objChartDataCollection
        console.log(store.state.arSlideDetailsTableItems)
        }) 
      }

  },
    computed: {
        arTableItems () {
            return this.$store.getters.SlideDetailsTableItems
        },
        arTableFields () {
            return this.$store.getters.SlideDetailsTableFields
        } 
    }
}
</script>

<style scoped>
#slides {
  margin: 30px 0;
}

.loader {
  text-align: center;
}
</style>
