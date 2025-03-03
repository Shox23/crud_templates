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
      <div v-if="currentTemplate && !isLoading">
        <div class="current-template" v-if="isEditing">
          <form
            class="modal__form"
            @reset="cancelEdit"
            @submit.prevent="confirmEdit"
          >
            <input
              v-model="currentTemplateForm.name"
              type="text"
              placeholder="Название"
            />
            <textarea
              v-model="currentTemplateForm.description"
              placeholder="Описание"
              type="text"
            />
            <input
              v-model="currentTemplateForm.height"
              type="number"
              placeholder="Высота"
            />
            <input
              v-model="currentTemplateForm.width"
              type="number"
              placeholder="Ширина"
            />
            <TemplateTagList />
            <input
              @change="handleFileChange"
              type="file"
              placeholder="Картинка"
            />
            <div v-if="currentTemplateForm.preview_image">
              <img
                class="modal__img-preview"
                :src="previewUrl ? previewUrl : currentTemplate.preview_image"
                alt="img"
              />
            </div>
            <div class="modal__controls">
              <button type="reset" class="modal__controls__btn">
                Отменить
              </button>
              <button type="submit" class="modal__controls__btn">
                Добавить
              </button>
            </div>
          </form>
        </div>
        <div class="current-template" v-else>
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
      </div>
      <div v-else-if="isLoading">
        <h1>Загрузка...</h1>
      </div>
      <div v-else-if="errorMessage">
        <h1>{{ errorMessage }}</h1>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import useTemplates from "../composables/useTemplates";
import placeholderImage from "../assets/images/placeholder.webp";
import TemplateTagList from "../components/TemplateTagList/TemplateTagList.vue";
import useForm from "../composables/useForm";

const route = useRoute();
const router = useRouter();
const { clearCurrentTemplateForm, currentTemplateForm } = useForm();
const {
  getCurrentTemplate,
  currentTemplate,
  isLoading,
  errorMessage,
  editCurrentTemplate,
} = useTemplates();
const previewUrl = ref<string | null>(null);
const isEditing = ref(route.query.edit === "true");

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    currentTemplateForm.value.preview_image = target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      previewUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(currentTemplateForm.value.preview_image);
  }
};

const cancelEdit = () => {
  isEditing.value = false;
  previewUrl.value = null;
  clearCurrentTemplateForm();
};

const startEdit = () => {
  isEditing.value = true;
  initFormData();
};

const urlToFile = async (imageUrl: string, fileName = "image.jpg") => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return new File([blob], fileName, { type: blob.type });
};

const initFormData = async () => {
  if (currentTemplate.value) {
    currentTemplateForm.value = {
      name: currentTemplate.value.name,
      height: currentTemplate.value.height,
      width: currentTemplate.value.width,
      description: currentTemplate.value.description,
      preview_image: await urlToFile(currentTemplate.value.preview_image),
      tags: [],
    };
  }
};

const confirmEdit = async () => {
  if (currentTemplate.value) {
    if (!currentTemplateForm.value.name) {
      alert("Укажите имя шаблона!");
      return;
    }
    if (!currentTemplateForm.value.height) {
      alert("Укажите высоту шаблона!");
      return;
    }
    if (!currentTemplateForm.value.width) {
      alert("Укажите имя шаблона!");
      return;
    }
    const formData = new FormData();

    Object.keys(currentTemplateForm.value).forEach((item) => {
      let value = currentTemplateForm.value[item];
      if (Array.isArray(value)) {
        let stringifiedData = JSON.stringify(value);
        formData.append(item, stringifiedData);
      } else {
        if (value) formData.append(item, value);
      }
    });
    formData.append("tags", "");
    await editCurrentTemplate(formData, currentTemplate.value.id);
    isEditing.value = false;
    router.replace({ path: route.path });
  }
};

onMounted(async () => {
  let id = route.params.id as string;
  await getCurrentTemplate(id);
  if (isEditing.value) {
    initFormData();
  }
});
onUnmounted(() => {
  cancelEdit();
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
