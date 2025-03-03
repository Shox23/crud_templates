<template>
  <form
    class="modal__form"
    @reset="closeCreateModal"
    @submit.prevent="confirmCreate"
  >
    <input v-model="templateForm.name" type="text" placeholder="Название" />
    <textarea
      v-model="templateForm.description"
      placeholder="Описание"
      type="text"
    />
    <input v-model="templateForm.height" type="number" placeholder="Высота" />
    <input v-model="templateForm.width" type="number" placeholder="Ширина" />
    <TemplateTagList @activate="collectTags" />
    <input @change="handleFileChange" type="file" placeholder="Картинка" />
    <div v-if="previewUrl">
      <img class="modal__img-preview" :src="previewUrl" alt="img" />
    </div>
    <div class="modal__controls">
      <button type="reset" class="modal__controls__btn">Отменить</button>
      <button type="submit" class="modal__controls__btn">Добавить</button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import useModal from "../../../composables/useModal";
import useForm from "../../../composables/useForm";
import useTemplates from "../../../composables/useTemplates";
import TemplateTagList from "../../TemplateTagList/TemplateTagList.vue";

const { createTemplate } = useTemplates();
const { templateForm, clearTemplateForm } = useForm();
const { closeModal } = useModal();
const previewUrl = ref<string | null>(null);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    templateForm.preview_image = target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      previewUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(templateForm.preview_image);
  }
};

const closeCreateModal = () => {
  clearTemplateForm();
  closeModal();
  previewUrl.value = null;
};

const collectTags = (data: string[]) => {
  templateForm.tags = data;
};

const confirmCreate = async () => {
  const { name, height, width } = templateForm;
  const validationErrors = {
    name: !name && "Укажите имя шаблона!",
    height: !height && "Укажите высоту шаблона!",
    width: !width && "Укажите ширину шаблона!",
  };
  for (const [_, error] of Object.entries(validationErrors)) {
    if (error) {
      alert(error);
      return;
    }
  }
  const formData = new FormData();
  if (Array.isArray(templateForm.tags) && templateForm.tags.length > 0) {
    templateForm.tags.forEach((item, idx) => {
      formData.append(`tags[${idx}]`, item);
    });
  }
  Object.entries(templateForm).forEach(([key, value]) => {
    if (value !== null && value !== undefined && key !== "tags") {
      formData.append(key, value);
    }
  });
  await createTemplate(formData);
  closeCreateModal();
};
</script>
