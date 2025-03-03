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
      <div v-else>
        <h1 v-if="isLoading">Загрузка...</h1>
        <h1 v-else-if="errorMessage">{{ errorMessage }}</h1>
        <h1 v-else>По данному запросу нет шаблонов</h1>
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
} = useTemplates();
const handleDeleteTemplate = (item: TemplateType) => {
  chosenTemplate.value = item;
  openModal();
};
const handleEditTemplate = (id: number) => {
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
