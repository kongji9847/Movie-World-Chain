<template>
  <div class="container-fluid">
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <form @submit.prevent="onSubmit">
          <div class="mb-3">
            <label for="reviewTitle" class="form-label">제목</label>
              <input v-model="newReview.title" type="text" class="form-control" id="reviewTitle">
          </div>
          <div class="mb-3">
            <label for="reviewContent" class="form-label">내용</label>
              <textarea v-model="newReview.content" class="form-control" id="reviewContent" rows="10"></textarea>
          </div>
          <div class="review-create-submit">
            <router-link :to="{ name: 'reviews' }">
              <button class="btn btn-outline-secondary">목록으로</button>
            </router-link>
            <button class="btn review-create-btn">Create</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

  export default {
    name: 'ReviewForm',
    props: {
      review: Object,
      action: String
    },
    data() {
      return {
        newReview: {
          title: this.review.title,
          content: this.review.content,
        }
      }
    },
    methods: {
      ...mapActions(['createReview', 'updateReview']),
      onSubmit() {
        if (this.action === 'create') {
          this.createReview(this.newReview)
        } else if (this.action === 'update') {
          const payload = {
            pk: this.review.id,
            ...this.newReview,
          }
          this.updateReview(payload)
        }
      },
    },
  }
</script>

<style scoped>

  #reviewContent {
    line-height: 2;
  }

  .review-create-submit {
    display: flex;
    justify-content: space-between;
  }

  .review-create-btn {
    color: white;
    background-color: #F8A111;
    display: flex;
    justify-content: flex-end;
  }

</style>