<template>
  <section class="login">
    <form @submit.prevent="handleFormSubmit" class="login__form">
      <input v-model="loginForm.email" type="text" />
      <input v-model="loginForm.password" type="password" />
      <button type="submit">Submit</button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import useForm from "../composables/useForm.ts";

const router = useRouter();
const { loginForm, submitLoginForm } = useForm();

const handleFormSubmit = async () => {
  await submitLoginForm();
  if (localStorage.token) {
    router.push("/");
  }
};
</script>

<style>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 60px;
}

.login__form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
