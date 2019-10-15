<template>
  <nav class="navbar">
    <router-link to="/"  class="navbar-logo">Home
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

.navbar{
  position: relative;
  padding: .5rem 1rem;
  display: flex;
  background-color: #343a43;
  &-logo {
    display: inline-block;
    padding-top: .3125rem;
    padding-bottom: .3125rem;
    margin-right: 1rem;
    font-size: 1.25rem;
    line-height: inherit;
    white-space: nowrap;
  }
}
.navbar-nav {
    display: flex;
    flex-direction: column;
    flex-direction: row;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
}
.nav-link{
  color: hsla(0,0%,100%,.5);
}    
</style>