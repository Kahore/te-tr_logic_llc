import { VuexModule, Module, getModule } from 'vuex-module-decorators';
import store from '@/store/store.js';

@Module({
  dynamic: true,
  namespaced: true,
  name: 'message',
  store,
})

class ArticleModule extends VuexModule {

}

export default getModule(ArticleModule);
