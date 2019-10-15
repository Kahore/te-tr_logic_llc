
import { Module , VuexModule, Mutation, getModule, MutationAction } from 'vuex-module-decorators';
import store from '@/store/store';
import { User } from '../model';
@Module({
  dynamic: true,
  namespaced: true,
  name: 'auth',
  store,
})
class AuthModule extends VuexModule {
  public user: User = {
    login: '',
    password: '',
  };

  public get getUser(): User {
    if (localStorage.getItem('user_auth')) {
      const userTmp: string = localStorage.getItem('user_auth')!;
      const user: User = JSON.parse(userTmp);
      return user;
    }
    return this.user;
  }

  @Mutation
  public loginCashed(): void {
    if (localStorage.getItem('user_auth')) {
      const userTmp: string = localStorage.getItem('user_auth')!;
      this.user = JSON.parse(userTmp);
    }
  }

  @Mutation
  public logOut(): void {
    this.user = {
      login: '',
      password: '',
    };
    localStorage.removeItem('user_auth');
  }

  @MutationAction
  public async login(userSubmit: User) {
    let user = {};
    await delay(1000);
    user = userSubmit;
    localStorage.setItem('user_auth', JSON.stringify(user));
    return { user };
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default getModule(AuthModule);
