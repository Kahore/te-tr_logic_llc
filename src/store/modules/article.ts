import { VuexModule, Module, getModule, Action, Mutation } from 'vuex-module-decorators';
import store from '@/store/store';
import { Article } from '../model';

@Module({
  dynamic: true,
  namespaced: true,
  name: 'article',
  store,
})

class ArticleModule extends VuexModule {
  public articleList: Article[] = [
    {
      id: 'f7e2db0c-3b47-4ca4-8f6b-7b553f1e6ffd',
      author: 'Some Author 3',
      body: 'Nunc vel risus commodo viverra maecenas accumsan lacus vel. Mi in nulla posuere sollicitudin aliquam ultrices. Sit amet consectetur adipiscing elit pellentesque habitant morbi tristique. Ac tortor dignissim convallis aenean et tortor. Etiam non quam lacus suspendisse faucibus interdum posuere lorem. Hac habitasse platea dictumst vestibulum rhoncus. Magna fermentum iaculis eu non diam phasellus vestibulum lorem sed. Quis auctor elit sed vulputate mi sit amet. Felis eget nunc lobortis mattis aliquam faucibus. Id velit ut tortor pretium viverra. Dolor sed viverra ipsum nunc aliquet. Lectus urna duis convallis convallis tellus id. Orci phasellus egestas tellus rutrum tellus pellentesque. Tincidunt vitae semper quis lectus nulla at volutpat diam ut. In hendrerit gravida rutrum quisque non tellus. Sit amet cursus sit amet dictum. Eget mauris pharetra et ultrices neque.',
      title: 'Some Title 3',
      createdAt: new Date('2019-09-10T12:14:54.416+00:00'),
      updatedAt: new Date('2019-09-10T12:14:54.416+00:00'),
    },
    {
      id: '4f051793-2481-46b5-b17b-6976acc77066',
      author: 'Some Author 2',
      body: 'Ornare quam viverra orci sagittis eu volutpat odio facilisis mauris. Luctus accumsan tortor posuere ac ut. Tincidunt lobortis feugiat vivamus at augue eget. Sed libero enim sed faucibus turpis in. Vel quam elementum pulvinar etiam non. Blandit turpis cursus in hac habitasse. Magnis dis parturient montes nascetur ridiculus mus. Vitae tortor condimentum lacinia quis. Tortor posuere ac ut consequat. A erat nam at lectus urna. Non pulvinar neque laoreet suspendisse. In nibh mauris cursus mattis molestie a. Ipsum dolor sit amet consectetur adipiscing elit ut.',
      title: 'Some Title 2',
      createdAt: new Date('2019-09-09T12:14:54.416+00:00'),
      updatedAt: new Date('2019-09-09T12:14:54.416+00:00'),
    },
    {
      id: 'c1066d61-c6e4-475d-a068-de949e1647c3',
      author: 'Some Author',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      title: 'Some Title',
      createdAt: new Date('2019-09-08T12:14:54.416+00:00'),
      updatedAt: new Date('2019-09-08T12:14:54.416+00:00'),
    },
  ];

  public get getArticleList(): Article[] {
    return this.articleList;
  }
  @Mutation
  public addNewArticle(article: Article) {
    this.articleList.unshift(article);
  }
  @Mutation
  public deleteArticle(articleId: string) {
    const index = this.articleList.findIndex( (article) => article.id === articleId);
    this.articleList.splice(index, 1);
  }

  @Action({commit: 'addNewArticle'})
  public async insertArticle(newArt: Article) {
    const newArticle = newArt;
    return newArticle;
  }
}

export default getModule(ArticleModule);
