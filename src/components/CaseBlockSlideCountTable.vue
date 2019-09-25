<!-- ===========================================================================================

    File: CaseBlockSlideCountTable.vue

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
  name: 'caseblockslidecount', // component name
  props: {
    lastname: String,
    userid: String,
    },
    data() {
    return {
        fields: store.state.TableFields,
        items: store.state.TableItems
    }
  },
  methods: {
      created () {
          // console.log('Hello mounted')
          // this.LoadTableData()
      },
      LoadTableData() {
        store.dispatch('LoadBlockCountTableData').then(() => {
        console.log('Show after promise blah')
        // this.datacollection = store.state.objChartDataCollection
        console.log(store.state.blockCountTableItems)
        }) 
      }

  },
    computed: {
        arTableItems () {
            return this.$store.getters.TableItems
        },
        arTableFields () {
            return this.$store.getters.TableFields
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
