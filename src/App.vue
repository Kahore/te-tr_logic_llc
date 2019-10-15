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
import article from '@/store/modules/article';
@Component({
  components: {
    Navbar: () => import('@/components/Layout/Navbar.vue'),
  },
})
export default class App extends Vue {
  public created() {
    auth.loginCashed();
    article.loadArticles();
  }
}
</script>

<style lang="scss">

</style>
