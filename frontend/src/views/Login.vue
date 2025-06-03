<template>
  <div class="auth-form">
    <h2>Login </h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p>
      Don't have an account?
      <router-link to="/signup">Sign up here</router-link>
    </p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async handleLogin() {
      this.error = ''
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          email: this.email,
          password: this.password
        })
        localStorage.setItem('token', res.data.token)
        alert('Login successful! ')
        this.$router.push('/chargers') 
      } catch (err) {
        this.error = err.response?.data?.message || 'Login failed. Try again.'
      }
    }
  }
}
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 3rem auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 10px #ddd;
}
input {
  display: block;
  margin-bottom: 1rem;
  width: 100%;
  padding: 0.6rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}
button {
  background-color: #42b983;
  color: white;
  padding: 0.75rem 1.2rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background-color: #369870;
}
.error {
  color: #d9534f;
  margin-top: 1rem;
}
</style>
