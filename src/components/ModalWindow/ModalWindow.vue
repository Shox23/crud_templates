<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" @click="closeInitialModal" class="modal">
        <div class="modal__content" @click.stop>
          <DeleteTemplate v-if="chosenTemplate" />
          <CreateTemplate v-else />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import useModal from "../../composables/useModal";
import useTemplates from "../../composables/useTemplates";
import DeleteTemplate from "./views/DeleteTemplate.vue";
import CreateTemplate from "./views/CreateTemplate.vue";
import useForm from "../../composables/useForm";

const { chosenTemplate } = useTemplates();
const { isOpen, closeModal } = useModal();
const { clearTemplateForm } = useForm();

const closeInitialModal = () => {
  chosenTemplate.value = null;
  clearTemplateForm();
  closeModal();
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
