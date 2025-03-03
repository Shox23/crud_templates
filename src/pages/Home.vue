<template>
  <section>
    <div class="container">
      <ul class="item-list" v-if="templates.length && !isLoading">
        <li v-for="item in templates" :key="item.id">
          <TemplateItem
            @delete="() => handleDeleteTemplate(item)"
            @edit="handleEditTemplate"
            :data="item"
          />
        </li>
      </ul>
      <div v-else-if="isLoading && !errorMessage">
        <h1>Загрузка...</h1>
      </div>
      <div v-else-if="errorMessage && !isLoading">
        <h1>{{ errorMessage }}</h1>
      </div>
    </div>
    <ModalWindow />
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import useTemplates from "../composables/useTemplates.ts";
import TemplateItem from "../components/TemplateItem/TemplateItem.vue";
import ModalWindow from "../components/ModalWindow/ModalWindow.vue";
import type { TemplateType } from "../types/TemplateType.ts";
import useModal from "../composables/useModal.ts";
import { useRouter } from "vue-router";

const router = useRouter();
const { openModal } = useModal();
const {
  templates,
  getTemplates,
  chosenTemplate,
  isLoading,
  errorMessage,
  isCurrentTemplateEditing,
} = useTemplates();
const handleDeleteTemplate = (item: TemplateType) => {
  chosenTemplate.value = item;
  openModal();
};
const handleEditTemplate = (id: number) => {
  isCurrentTemplateEditing.value = true;
  router.push(`/template/${id}`);
};
onMounted(() => {
  if (!templates.value.length) getTemplates();
});
</script>

<style>
.item-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
</style>
