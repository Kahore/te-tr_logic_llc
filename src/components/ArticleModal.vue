<template>
  <div
    class="modal modal-bg "
    :class="{'modal-bg--show': isActive}">
    <div class="modal-dialog modal-dialog-centered row pt-5">
      <div class="modal-content p-2">
        <div class="modal-header">
          <template v-if="id === ''">
            <h5 class="modal-title text-center">Добавить статью</h5>
          </template>
          <template v-else>
            <h5 class="modal-title text-center">Внести изменения</h5>
          </template>
          <button type="button" class="close">
            <span >×</span></button>
        </div>
        <div class="form-block">
          <label for="login">Заголовок</label>
            <input
              type="text"
              class="form-control"
              tabindex="1"
              id="login"
              v-model="title">
        </div>
        <div class="form-block">
          <label for="password">Статья</label>
          <textarea
            type="password"
            class="form-control"
            row="10"
            tabindex="2"
            id="password"
            v-model="body"></textarea>
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
  public id: string = '';
  public title: string = '';
  public body: string = '';
  public error: string = '';
  private isLoading: boolean = false;
  private isActive: boolean = false;
  public mounted() {
    EventBus.$on('MODAL_CALL', () => {
      this.isActive = true;
    });
  }
  public saveAction() {
    if (this.id === '') {
      this.insertArticle();
    } else {
       this.updateArticle();
    }
  }
  public insertArticle() {
      this.isLoading = true;
      const data: Article = {
        id: this.uuid(),
        title: this.title,
        author: auth.getUser.login,
        body: this.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      article.insertArticle(data).then(() => {
        this.isLoading = false;
        this.clearField();
        this.$router.push('/');
      }).catch((err: string) => {
        this.error = err;
      });
    }
    /**
     * updateArticle
     */
    public updateArticle() {
    // console.log('TCL: ArticleModal -> updateArticle -> updateArticle');
    }
    private uuid(): string {
      const crypto = require('crypto');
      const id = crypto.randomBytes(16).toString('hex');
      return id;
  }
  private clearField(): void {
    this.title = '';
    this.body = '';
  }
}
</script>
