<template>
  <div
    class="modal modal-bg"
    :class="{'modal-bg--show': isActive}">
    <div class="modal-dialog modal-dialog-centered row pt-5">
      <div class="modal-content p-2">
        <div class="modal-header">
          Внимание!
        </div>
        <p>Вы уверены что хотите удалить статью?</p>
        <div class="form-block pt-2">
          <button class="btn btn-primary" @click="deleteConfirm()">Да</button>
          <button class="btn btn-danger float-right" @click="toogleState()">Отмена</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { EventBus } from '@/EventBus.ts';
import article from '@/store/modules/article';
@Component
export default class DeleteModal extends Vue {
  public isActive: boolean = false;
  private articleId: string = '';
  public mounted() {
    EventBus.$on('MODAL_DELETE', (payload: string) => {
    this.articleId = payload;
    this.toogleState();
    });
  }
  /**
   * deleteConfirm
   */
  public deleteConfirm(): void {
    article.deleteArticle(this.articleId);
    this.toogleState();
  }
  private toogleState() {
    this.isActive = !this.isActive;
  }
}
</script>

<style scoped>

</style>