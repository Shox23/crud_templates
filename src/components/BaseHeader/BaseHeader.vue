<template>
  <header class="header" v-if="route.fullPath === '/'">
    <div class="container">
      <div class="header__controls">
        <input
          v-model="searchIputValue"
          class="header__input"
          type="text"
          placeholder="Поиск"
        />
        <button @click="openModal" class="header__btn">Добавить Шаблон</button>
      </div>
      <TemplateTagList />
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import useModal from "../../composables/useModal";
import useTemplates from "../../composables/useTemplates";
import TemplateTagList from "../TemplateTagList/TemplateTagList.vue";

const { searchIputValue } = useTemplates();
const { openModal } = useModal();
const route = useRoute();
</script>

<style>
.header {
  padding: 16px;
  border-bottom: 2px solid #000;
}

.header__controls {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
