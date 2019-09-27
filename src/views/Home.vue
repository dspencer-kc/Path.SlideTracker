<template>
  <div class="abouttext">
    <h1>Welcome to Path Slide Tracker</h1>
    <br>
    <div class="abouttextparagraph">
    <P>You will need to access your individual slide tracker at the address given to you by MAWD it.
      Basically, you will need to go to the site www.slide-tracker.com/#/locn/04780183.  If your sides
      are assigned to a hospital as opposed to a specific pathologist, the address will be that hospital
      abbreviation instead of the unique id.  For example www.slide-tracker.com/#/locn/NKCH
    </P>
    <p>
      If you navigate to a page from here, you will need to refresh your browser once you get there.
      For future access, bookmark the page that has the full location id in it.
    </p>
    <p>See the about page for more details.</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
