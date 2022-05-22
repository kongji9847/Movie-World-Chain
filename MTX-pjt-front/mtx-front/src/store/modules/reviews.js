import axios from 'axios'
import drf from '@/api/drf'

import _ from 'lodash'
import router from '@/router'

export default {
  state: {
    reviews: [],
    review: {},
    moviePk: null,
  },

  getters: {
    reviews: state => state.reviews,
    review: state => state.review,
    moviePk: state => state.moviePk,
    isReview: state => !_.isEmpty(state.review),
    isAuthor: (state, getters) => {
      return state.review.user?.username === getters.currentUser.username
      // return state.review.user === getters.currentUser.username
    },
  },

  mutations: {
    SET_REVIEWS: (state, reviews) => state.reviews = reviews,
    SET_REVIEW: (state, review) => state.review = review,
    SET_MOVIEPK: (state, moviePk) => state.moviePk = moviePk,
    SET_REVIEW_COMMENTS: (state, comments) => (state.review.comments = comments),
  },

  actions: {
    fetchReviews({ commit, getters }) {
      axios({
        url: drf.movies.reviews(),
        method: 'get',
        headers: getters.authHeader,
      })
      .then(res => commit('SET_REVIEWS', res.data))
      .catch(err => console.error(err.response))
    },

    fetchReview({ commit, getters }, reviewPk) {
      axios({
        url: drf.movies.review(reviewPk),
        method: 'get',
        headers: getters.authHeader,
      })
      .then(res => commit('SET_REVIEW', res.data))
      .catch(err => {
        console.error(err.response)
        if (err.response.status === 404) {
          router.push({ name: 'NotFound404' })
        }
      })
    },

    createReview({ commit, getters }, review) {
      axios({
        url: drf.movies.newReview(getters.moviePk),
        method: 'post',
        data: review,
        headers: getters.authHeader,
      })
      .then(res => {
        commit('SET_REVIEW', res.data)
        router.push({
          name: 'review',
          params: { reviewPk: getters.review.id }
        })
      })
      .catch(error => {
        alert(error.response.data)
      })
    },

    deleteReview({ commit, getters }, reviewPk) {
      if (confirm('정말 삭제하시겠습니까?')) {
        axios({
          url: drf.movies.review(reviewPk),
          method: 'delete',
          headers: getters.authHeader,
        })
        .then(() => {
          commit('SET_REVIEW', {})
          router.push({ name: 'reviews'})
        })
        .catch(err => console.error(err.response))
      }
    },

    updateReview({ commit, getters }, {pk, title, content, movie}) {
      axios({
        url: drf.movies.review(pk),
        method: 'put',
        data: { title, content, movie },
        headers: getters.authHeader,
      })
      .then(res => {
        commit('SET_REVIEW', res.data)
        router.push({
          name: 'review',
          params: { reviewPk: getters.review.pk}
        })
      })
    },

    movieChoice({ commit }, moviePk) {
      commit('SET_MOVIEPK', moviePk)
    }
  },
}