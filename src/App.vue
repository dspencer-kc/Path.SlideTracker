<template>
  <div id="app">

        <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
      <a class="navbar-brand" href="#">
          Path Slide Tracker
      </a>
      <a class="container" text-align: center href="#">v 0.01 Beta Test Environment</a>
            <a class="navbar-brand" href="#/">
          {{strSlideDistLoc}}
      </a>
      <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <b-link class="nav-link" to="/">Home</b-link>
      </li>          
      <li class="nav-item">
        <b-link class="nav-link" to="/#/locn/NKC">NKC</b-link>
      </li>      
        <li class="nav-item">
        <a class="nav-link" href="/#/locn/DERM">Derm</a>
      </li>
      </ul>
    </nav>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
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
     strSlideDistLoc: null,
     strURL: null
    }
  },
  mounted() {
    this.strSlideDistLoc = store.state.strSlideDistLoc
    //this.strURL = '/#/locn/' & this.$route.params.locnid
  }

}
</script>