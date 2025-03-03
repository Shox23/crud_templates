<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" @click="closeInitialModal" class="modal">
        <div class="modal__content" @click.stop>
          <!-- По хорошему стоило бы добавить отдельные компоненты внутреннего содержания модалки, и в composable useModal переменную исходя из которой подставлялся бы нужный компонент через slot, так можно было бы изолировать логику добавления/удаления -->
          <div v-if="chosenTemplate">
            <h3>Вы хотите удалить шаблон {{ chosenTemplate.name }}?</h3>
            <div class="modal__controls">
              <button @click="closeDeleteModal" class="modal__controls__btn">
                Отменить
              </button>
              <button @click="comnfirmDelete" class="modal__controls__btn">
                Удалить
              </button>
            </div>
          </div>
          <div v-else>
            <form
              class="modal__form"
              @reset="closeCreateModal"
              @submit.prevent="confirmCreate"
            >
              <input
                v-model="templateForm.name"
                type="text"
                placeholder="Название"
              />
              <textarea
                v-model="templateForm.description"
                placeholder="Описание"
                type="text"
              />
              <input
                v-model="templateForm.height"
                type="number"
                placeholder="Высота"
              />
              <input
                v-model="templateForm.width"
                type="number"
                placeholder="Ширина"
              />
              <TemplateTagList />
              <input
                @change="handleFileChange"
                type="file"
                placeholder="Картинка"
              />
              <div v-if="previewUrl">
                <img class="modal__img-preview" :src="previewUrl" alt="img" />
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
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import useForm from "../../composables/useForm";
import useModal from "../../composables/useModal";
import useTemplates from "../../composables/useTemplates";
import TemplateTagList from "../TemplateTagList/TemplateTagList.vue";

const { templateForm, clearTemplateForm } = useForm();
const { chosenTemplate, deleteTemplate, createTemplate } = useTemplates();
const { isOpen, closeModal } = useModal();
const previewUrl = ref<string | null>(null);

const closeInitialModal = () => {
  chosenTemplate.value = null;
  clearTemplateForm();
  closeModal();
};

const closeDeleteModal = () => {
  chosenTemplate.value = null;
  closeModal();
};

const comnfirmDelete = async () => {
  await deleteTemplate();
  closeDeleteModal();
};

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

const confirmCreate = async () => {
  if (!templateForm.name) {
    alert("Укажите имя шаблона!");
    return;
  }
  if (!templateForm.height) {
    alert("Укажите высоту шаблона!");
    return;
  }
  if (!templateForm.width) {
    alert("Укажите имя шаблона!");
    return;
  }
  const formData = new FormData();
  console.log(templateForm);

  Object.keys(templateForm).forEach((item) => {
    let value = templateForm[item];
    if (Array.isArray(value)) {
      let stringifiedData = JSON.stringify(value);
      formData.append(item, stringifiedData);
    } else {
      if (value) formData.append(item, value);
    }
  });
  formData.append("tags", "");
  await createTemplate(formData);
  closeCreateModal();
};
</script>

<style>
.modal {
  z-index: 99;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal__content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 16px;
  padding: 16px;
  background: #fff;
}

.modal__controls {
  display: flex;
  align-items: center;
  gap: 20px;
  align-self: flex-end;
}

.modal__controls__btn {
  padding: 6px 12px;
  color: #fff;
  border-radius: 6px;
}

.modal__form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modal__img-preview {
  margin: 0 auto;
  width: 240px;
  height: 240px;
  object-fit: cover;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
