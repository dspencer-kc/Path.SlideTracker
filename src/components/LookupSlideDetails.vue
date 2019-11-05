<template>
  <div class="container">
    <div class="mx-auto">
      <div class="container">
        <div class= "row">
            <b-input id="InputCaseNo" class="w-25 p-1" v-model="strCaseNo" placeholder="Input Case No" />
            <b-button type="submit" variant="secondary sm" @click="ShowTable()">OK</b-button>
        </div>
      <br>
      <CaseInquiryDetailsTable :strCaseNo="strCaseNo" v-if='blShowTable'> </CaseInquiryDetailsTable>
      </div>
    </div>
  </div>
</template>

<script>
import CaseInquiryDetailsTable from './CaseInquiryDetailsTable.vue'

export default {
  name: 'LookupSlideDetails',
  components: {
    CaseInquiryDetailsTable
  },
  data() {
    return {
      strCaseNo: '',
      blDataLoaded: false,
      blShowTable: false
    }
  },
  methods: {
    ShowTable()
    {
       this.blShowTable = true
    }
  }
}
</script>