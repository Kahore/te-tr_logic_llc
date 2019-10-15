<template>
  <div id="app">
    <div id="nav">
      <Navbar/>
    </div>
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import auth from '@/store/modules/auth';
@Component({
  components: {
    Navbar: () => import('@/components/Layout/Navbar.vue'),
  },
})
export default class App extends Vue {
  public created() {
    auth.loginCashed();
  }
}
</script>

<style lang="scss">

</style>
