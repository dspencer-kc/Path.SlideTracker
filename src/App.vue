<template>
  <div id="app">

        <nav class="navbar navbar-expand-sm bg-dark navbar-dark static-top">
          <router-link class="navbar-brand" to="/">
            Slide-Tracker Dashboard
          </router-link>
      <a class="container" text-align: center href="#">v 1.01</a>
            <a v-if='blStrSlideDistLoc' class="navbar-brand" href="#/">
           {{strSlideDistLoc}} 
            </a>
      <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link class="nav-link text-nowrap" to="/caseinquiry">Case Inquiry</router-link>
      </li>
      <li class="nav-item">
      <router-link class="nav-link" to="/about">About</router-link>
      </li>
      </ul>
    </nav>
    <br>
    <!-- 
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>


<style>
body {
  background-image: url("./assets/background.jpg");
  height: 100%;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.customheadertext {
 text-rendering: optimizeLegibility;
      color: #e0dfdc;
      letter-spacing: .1em;
      }
.customsubheadertext {
 text-rendering: optimizeLegibility;
      color: #e0dfdc;
      letter-spacing: .1em;
      color: white;
      text-shadow: -1px -1px 0 #2c2d2d, 1px -1px 0 #2c2d2d, -1px 1px 0 #2c2d2d, 1px 1px 0 #2c2d2d;
      }
.abouttext {
 text-rendering: optimizeLegibility;
      color: #e0dfdc;
      letter-spacing: .1em;
      }
.abouttextparagraph {
 text-rendering: optimizeLegibility;
      color: #e0dfdc;
      letter-spacing: .1em;
      background-color: rgba(103, 111, 128, 0.986);
      opacity:0.95;
      text-align: center;
      }
</style>

<script>
import store from './store.js'

export default {
  name: 'app',
  components:
  {

  },
  data() {
    return {
     // strSlideDistLoc: null,
     strURL: null,
     blStrSlideDistLoc: true
    }
  },
  mounted() {
    this.strSlideDistLoc = store.state.strSlideDistLoc
    
    //this.strURL = '/#/locn/' & this.$route.params.locnid
  },
  computed : {
    strSlideDistLoc () {
      return this.$store.getters.SlideDistLoc
      this.blStrSlideDistLoc = true
    }
  }

}
</script>