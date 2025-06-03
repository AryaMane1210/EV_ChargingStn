<template>
  <div class="auth-form">
    <h2>Sign Up </h2>
    <form @submit.prevent="handleSignup">
      
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Create Account</button>
    </form>
    <p>
      Already have an account?
      <router-link to="/login">Login here</router-link>
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
    async handleSignup() {
      this.error = ''
      try {
        const response = await axios.post('http://localhost:5000/api/auth/signup', {
          email: this.email,
          password: this.password
        })
        alert('Signup successful! Please login.')
        this.$router.push('/login')
      } catch (err) {
        this.error = err.response?.data?.message || 'Signup failed. Try again.'
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
