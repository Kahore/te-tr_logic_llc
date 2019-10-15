<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
    <div class="container">
      <router-link to="/"  class="navbar-brand mr-auto router-link-active">Home
      </router-link>
      <div class="m-avto"></div>
      <ul class="nav navbar-nav">
        <router-link to="/login">
          <a
          v-if="!isLogin"
          href=""
          class="nav-link">Вход</a>
        </router-link>
        <router-link to="/editor">
          <a
            v-if="isLogin"
            href=""
            class="nav-link">Статьи</a>
        </router-link>
        <router-link to="/">
          <a
            v-if="isLogin"
            href=""
            class="nav-link"
            @click="logOut">Выход</a>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import auth from '@/store/modules/auth';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Navbar extends Vue {

  public get isLogin(): boolean {
    const userTmp = auth.getUser;
    if (userTmp.login !== '') {
      return true;
    }
    return false;
  }
  /**
   * logOut
   */
  public logOut(): void {
    auth.logOut();
    // @ts-ignore.
    this.$router.go('/');
  }
}
</script>

<style lang="scss" scoped>
</style>