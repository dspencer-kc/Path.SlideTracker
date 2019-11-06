<template>
  <div>
    <div class="d-flex justify-content-center">      
        <div class="p-2 col-sm-3"><!--width is set by this div -->
          <div class="input-group">
              <b-input id="InputCaseNo" style="width: 150px;" v-model="strCaseNo" placeholder="Input Case No: ie D19-99999" />
              <b-button type="submit" variant="secondary sm" @click="ShowTable()">OK</b-button>
        </div>
      </div>
    </div>
      <br>
      <CaseInquiryDetailsTable :strCaseNo="strCaseNo" v-if='blShowTable'> </CaseInquiryDetailsTable>
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