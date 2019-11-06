<template>
  <div class="abouttext">
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