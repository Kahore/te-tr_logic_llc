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
.form {
  width: 20%;
  margin-top: 5%;
  margin-left: 35%;
  box-shadow: 0px 3px 5px 0 rgba(174,174,174,0.5);
  background: #fff;
    padding: 2rem 4rem 4rem 3rem;
}
.form-block{
  margin-bottom: 1rem;
}
.form-control {
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    &:focus {
      color: #495057;
      background-color: #fff;
      border-color: #94d9ba;
      outline: 0;
      box-shadow: 0 0 0 0.15rem rgba(0,123,255,.25);
    }
}

</style>
