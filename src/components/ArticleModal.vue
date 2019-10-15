<template>
  <div
    class="modal modal-bg "
    :class="{'modal-bg--show': isActive}">
    <div class="modal-dialog modal-dialog-centered row pt-5">
      <div class="modal-content p-2">
        <div class="modal-header">
          <template v-if="article.id === ''">
            <h5 class="modal-title text-center">Добавить статью</h5>
          </template>
          <template v-else>
            <h5 class="modal-title text-center">Внести изменения</h5>
          </template>
          <button
            type="button"
            class="close"
            @click="toggleState">
            <span>×</span></button>
        </div>
        <div class="form-block">
          <label for="articleTitle">Заголовок</label>
            <input
              type="text"
              class="form-control"
              tabindex="1"
              id="articleTitle"
              v-model="article.title">
        </div>
        <div class="form-block">
          <label for="articleBody">Статья</label>
          <textarea
            type="password"
            class="form-control"
            row="10"
            tabindex="2"
            id="articleBody"
            @input="avtosize($event)"
            @focus="avtosize($event)"
            v-model="article.body"></textarea>
        </div>
        <div class="form-block pt-2">
          <button
            class="btn btn-primary w-100 "
            :disabled="isLoading"
            @click.prevent="saveAction">Сохранить</button>
        </div>
      </div>
    </div>   
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Article } from '@/store/model';
import auth from '@/store/modules/auth';
import article from '@/store/modules/article';
import { EventBus } from '@/EventBus.ts';

@Component
export default class ArticleModal extends Vue {

  public article: Article =  {
    id: '',
    author: '',
    body: '',
    title: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  public error: string = '';
  private isLoading: boolean = false;
  private isActive: boolean = false;
  /**
   * mounted
   */
  public mounted() {
    EventBus.$on('MODAL_CALL', (payload?: string) => {
      this.isActive = true;
      if (typeof payload !== 'undefined') {
        this.loadSingleArticle(payload);
      } else {
        // MEMO: Clear field before adding new article
        this.clearField();
      }
    });
  }
  /**
   * saveAction
   */
  public async saveAction() {
    this.isLoading = true;
    if (this.article.id === '') {
      await this.insertArticle();
    } else {
      await this.updateArticle();
    }
    this.isLoading = false;
    this.clearField();
    this.toggleState();
  }
  /**
   * insertArticle
   */
  public insertArticle() {
    const data: Article = {
      id: this.uuid(),
      title: this.article.title,
      author: auth.getUser.login,
      body: this.article.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    article.insertArticle(data);
  }
  /**
   * updateArticle
   */
  public updateArticle() {
    const data: Article = this.article;
    article.updateArticle(data);
  }
  private avtosize(e: any) {
    e.srcElement.style.height = '';
    e.srcElement.style.height = e.srcElement.scrollHeight + 3 + 'px';
  }
  private uuid(): string {
    const crypto = require('crypto');
    const id = crypto.randomBytes(16).toString('hex');
    return id;
  }
  private loadSingleArticle(articlesId: string) {
    article.loadSingleArticle(articlesId);
    const data: Article = article.getArticleSelected;
    this.article = data;
  }
  private toggleState() {
    this.isActive = ! this.isActive;
  }
  private clearField(): void {
    this.article =  {
      id: '',
      author: '',
      body: '',
      title: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
</script>
