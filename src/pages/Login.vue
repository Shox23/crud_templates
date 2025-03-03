<template>
  <section>
    <form @submit.prevent="submitLoginForm">
      <input v-model="loginForm.email" type="text" />
      <input v-model="loginForm.password" type="password" />
      <button type="submit">Submit</button>
    </form>
  </section>
</template>

<script setup lang="ts">
import useForm from "../composables/useForm.ts";

const { loginForm, submitLoginForm } = useForm();
</script>
