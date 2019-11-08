<template>
  <div class="abouttext">
      <CaseInquiryDetails> </CaseInquiryDetails>
      
      <br>
      <div class="abouttextparagraph">
      </div>
    </div>
</template>

<script>
import CaseInquiryDetails from '../components/CaseInquiryDetails'

export default {
  name: 'CaseInquiry',
  components:
  {
     CaseInquiryDetails
  },
  data() {
    return {
     // strSlideDistLoc: null,
    }
  },
  mounted() {
  },
}
</script>