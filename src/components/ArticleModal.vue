<template>
  <div
    class="modal modal-bg "
    :class="{'modal-bg--show': isActive}">

    <div class="modal-content">
          <div class="modal-header">
            <template v-if="id === ''">
                 <h3 class="modal-title text-center">Добавить статью</h3>
            </template>
            <template v-else>
                 <h3 class="modal-title text-center">Внести изменения</h3>
            </template>
   
      <button type="button" class="close">
        <span >×</span></button></div>
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
        <input
          type="password"
          class="form-control"
          tabindex="2"
          id="password"
          v-model="body">
      </div>
          <div class="form-block">
      <button
        class="btn"
        :disabled="isLoading"
        @click.prevent="saveAction">Сохранить</button>
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

<style scoped lang="scss">
.modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    display: none;
    width: 100%;
    height: 100%;
    overflow: hidden;
    outline: 0;
    &-bg {
      background: #212529;
      opacity: .98;
      overflow: overlay;
      &--show {
        display: block;
      }
    }
    &-content {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      pointer-events: auto;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid rgba(0,0,0,.2);
      border-radius: .3rem;
      outline: 0;
  }
}
.modal-header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 1rem 1rem;
    border-bottom: 1px solid #dee2e6;
    border-top-left-radius: .3rem;
    border-top-right-radius: .3rem;
}
.close {
    float: right;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: .5;
}
.modal-header .close {
    padding: 1rem 1rem;
    margin: -1rem -1rem -1rem auto;
}
</style>