<template>
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
</template>
<script lang="ts" setup>
import useModal from '../../../composables/useModal';
import useTemplates from '../../../composables/useTemplates';

const { chosenTemplate, deleteTemplate } = useTemplates();
const { closeModal } = useModal();

const closeDeleteModal = () => {
  chosenTemplate.value = null;
  closeModal();
};

const comnfirmDelete = async () => {
  await deleteTemplate();
  closeDeleteModal();
};
</script>
