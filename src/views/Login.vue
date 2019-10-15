<template>
  <form class="form">
    <div class="form-block">
      <label for="login">Логин</label>
      <input
        type="text"
        class="form-control"
        tabindex="1"
        id="login"
        v-model="login">
    </div>
    <div class="form-block">
      <label for="password">Пароль</label>
      <input
        type="password"
        class="form-control"
        tabindex="2"
        id="password"
        v-model="password">
    </div>
    <div class="form-block">
      <button
        class="btn"
        :disabled="isLoading"
        @click.prevent="loginAction">Вход</button>
    </div>
  </form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import auth from '@/store/modules/auth';

@Component
export default class Login extends Vue {
  public login: string = '';
  public password: string = '';
  public error: string = '';
  public isLoading: boolean = false;

  public loginAction() {
    this.isLoading = true;
    auth
    .login({
      login: this.login,
      password: this.password,
    })
    .then(() => {
      this.isLoading = true;
      this.$router.push('/');
    })
    .catch((err) => {
      this.error = 'Invalid username or password';
    });
  }
}
</script>

<style lang="scss" scoped>

</style>
