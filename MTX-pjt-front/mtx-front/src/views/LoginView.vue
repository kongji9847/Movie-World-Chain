<template>
  <div>
    <br>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-12 col-md-9">
          <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0 my-3">
              <div class="row">
                <div class="col-lg-6 d-none d-lg-block bg-login-image my-auto">
                  <div class="trainAnimation">
                    <div class="content" id="train-content">
                      <div class="buildings"></div>
                      <div class="windows"></div>
                      <div class="bridge"></div>
                      <div class="train">
                        <div class="carOne"></div>
                        <div class="carTwo"></div>
                        <div class="carThree"></div>
                      </div>
                      <div class="moon"></div>
                      <div class="stars"></div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="p-5">
                    <div class="text-center">
                        <h1 class="h4 text-gray-900 mb-4 login-title" id="login-title">Welcome Back!</h1>
                    </div>
                    <account-error-list v-if="authError"></account-error-list>
                    <form @submit.prevent="login(credentials)" class="user">
                        <div class="form-group">
                          <label for="usernameInput" class="form-label" id="login-font">Username</label>
                          <input v-model="credentials.username" type="text" class="form-control form-control-user"
                              id="inputUsername" placeholder="Enter Your Username...">
                        </div>
                        <br>
                        <div class="form-group">
                          <label for="inputPassword" class="form-label" id="login-font">Password</label>
                          <input v-model="credentials.password" type="password" class="form-control form-control-user"
                              id="inputPassword" placeholder="Password">
                        </div>
                        <br>
                        <button type="submit" class="btn btn-primary">Login</button>
                    </form>
                    <hr>
                    <div class="text-center">
                      <router-link :to=" { name: 'signup' }" >Create an Account!</router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AccountErrorList from '@/components/AccountErrorList.vue'

  export default {
    name: 'LoginView',
    components: {
      AccountErrorList,
    },
    data() {
      return {
        credentials: {
          username: '',
          password: '',
        }
      }
    },
    computed: {
      ...mapGetters(['authError'])
    },
    methods: {
      ...mapActions(['login'])
    },
    created() {
      this.$store.dispatch('setUrl', 'chain')
    }
  }
</script>

<style scoped>

#login-title {
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
  color: #041C2D;
}

#login-font {
  font-family: 'Open Sans', sans-serif;
  color: #041C2D;
}

#train-content {
  width: 350px;
  height: 350px;
}
</style>