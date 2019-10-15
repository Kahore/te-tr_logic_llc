<template>
  <div class="container">
    <div class="row">
      <div class="offset-md-3 col-md-6 col-12">
        <form class="form modal-content p-5 mt-2">
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
          <div class="form-block mt-2">
            <button
              class="btn btn-primary w-100"
              :disabled="isLoading"
              @click.prevent="loginAction">Вход</button>
          </div>
        </form>  
      </div>
    </div>
  </div>
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
