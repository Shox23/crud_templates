<template>
  <div class="current-template" v-if="currentTemplate">
    <form class="modal__form" @reset="cancelEdit" @submit.prevent="confirmEdit">
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
      <TemplateTagList
        :activeItems="currentTemplate.tags"
        @activate="collectTags"
      />
      <input @change="handleFileChange" type="file" placeholder="Картинка" />
      <div>
        <img
          class="modal__img-preview"
          :src="previewUrl ? previewUrl : currentTemplate.preview_image"
          alt="img"
        />
      </div>
      <div class="modal__controls">
        <button type="reset" class="modal__controls__btn">Отменить</button>
        <button type="submit" class="modal__controls__btn">
          Редактировать
        </button>
      </div>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import useForm from "../../../composables/useForm";
import useTemplates from "../../../composables/useTemplates";
import type { EditTemplateEmits } from "./interfaces";
import TemplateTagList from "../../../components/TemplateTagList/TemplateTagList.vue";

const emits = defineEmits<EditTemplateEmits>();
const { currentTemplate, editCurrentTemplate } = useTemplates();
const { clearCurrentTemplateForm, currentTemplateForm } = useForm();
import placeholderImage from "../../../assets/images/placeholder.webp";
const previewUrl = ref<string | null>(placeholderImage);

const collectTags = (data: string[]) => {
  if (currentTemplateForm.value) currentTemplateForm.value.tags = data;
};
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
  previewUrl.value = null;
  clearCurrentTemplateForm();
  emits("cancelEdit");
};
const confirmEdit = async () => {
  if (currentTemplate.value) {
    const { name, height, width } = currentTemplateForm.value;
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

    if (
      Array.isArray(currentTemplateForm.value.tags) &&
      currentTemplateForm.value.tags.length > 0
    ) {
      currentTemplateForm.value.tags.forEach((item, idx) => {
        formData.append(`tags[${idx}]`, item);
      });
    }
    Object.entries(currentTemplateForm.value).forEach(([key, value]) => {
      if (value !== null && value !== undefined && key !== "tags") {
        formData.append(key, value);
      }
    });

    await editCurrentTemplate(formData, currentTemplate.value.id);
    emits("cancelEdit");
  } else {
    alert("Что-то пошло не так");
  }
};

const initFormData = async () => {
  if (currentTemplate.value) {
    currentTemplateForm.value = {
      name: currentTemplate.value.name,
      height: currentTemplate.value.height,
      width: currentTemplate.value.width,
      description: currentTemplate.value.description,
      preview_image: "",
      tags: currentTemplate.value.tags,
    };
    previewUrl.value = currentTemplate.value.preview_image
      ? currentTemplate.value.preview_image
      : placeholderImage;
  }
};

onMounted(() => {
  if (currentTemplate.value) initFormData();
});
</script>
