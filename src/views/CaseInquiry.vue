<template>
  <div class="abouttext">
      <h2>Case Inquiry</h2>
      <br>
      <LookupSlideDetails> </LookupSlideDetails>
      
      <br>
      <div class="abouttextparagraph">
      </div>
    </div>
</template>

<script>
import LookupSlideDetails from '../components/LookupSlideDetails'

export default {
  name: 'CaseInquiry',
  components:
  {
     LookupSlideDetails
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