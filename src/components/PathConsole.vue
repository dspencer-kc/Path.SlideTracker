<template>
  <h1>This is locn: {{this.$route.params.locnid}}</h1>
</template>

<script>
import store from '../store.js'
import axios from 'axios'

export default {
  name: 'PathConsole',
  components: {

  },
  data() {
    return {

    }
  }
}
</script>
