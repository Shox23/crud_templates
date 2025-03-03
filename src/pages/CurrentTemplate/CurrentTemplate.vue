<template>
  <section>
    <div class="container">
      <div class="current-template__header">
        <RouterLink to="/">Назад</RouterLink>
        <button
          v-if="!isEditing && currentTemplate"
          @click="startEdit"
          class="modal__controls__btn"
        >
          Редактировать
        </button>
      </div>
      <div v-if="isLoading">
        <h1>Загрузка...</h1>
      </div>
      <div v-else-if="errorMessage">
        <h1>{{ errorMessage }}</h1>
      </div>
      <div v-else-if="currentTemplate">
        <EditTemplate v-if="isEditing" @cancel-edit="handleCancelEdit" />
        <ReadTemplate v-else />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import useTemplates from "../../composables/useTemplates";
import EditTemplate from "./components/EditTemplate.vue";
import ReadTemplate from "./components/ReadTemplate.vue";

const route = useRoute();
const router = useRouter();
const { getCurrentTemplate, currentTemplate, isLoading, errorMessage } =
  useTemplates();
const isEditing = ref(route.query.edit === "true");

const handleCancelEdit = () => {
  isEditing.value = false;
  router.replace({ path: route.path });
};

const startEdit = () => {
  isEditing.value = true;
};

onMounted(async () => {
  let id = route.params.id as string;
  await getCurrentTemplate(id);
});
onUnmounted(() => {
  handleCancelEdit();
});
</script>

<style>
.current-template {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.current-template__header {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.current-template__image {
  width: 50%;
  aspect-ratio: 1/1;
  object-fit: cover;
}

.current-template__title {
  font-size: 32px;
}

.current-template__trailing {
  display: flex;
  align-items: center;
  gap: 16px;
}

.current-template__tags {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
