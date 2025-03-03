<template>
  <div class="current-template" v-if="currentTemplate">
    <img
      class="current-template__image"
      :src="
        currentTemplate.preview_image
          ? currentTemplate.preview_image
          : placeholderImage
      "
      alt="image"
    />
    <h1 class="current-template__title">{{ currentTemplate.name }}</h1>
    <h4>Теги:</h4>
    <ul class="current-template__tags">
      <li v-for="item in currentTemplate.tags" :key="item">{{ item }}</li>
    </ul>
    <div class="current-template__trailing">
      <div>Автор:</div>
      <div>{{ currentTemplate.created_by }}</div>
    </div>
    <div class="current-template__trailing">
      <div>Дата создания:</div>
      <div>
        {{ new Date(currentTemplate.created_at).toLocaleDateString() }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useTemplates from "../../../composables/useTemplates";
import placeholderImage from "../../../assets/images/placeholder.webp";

const { currentTemplate } = useTemplates();
</script>
