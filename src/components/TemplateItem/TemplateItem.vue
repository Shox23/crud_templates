<template>
  <div class="template-item">
    <!-- Хотел размеры сделать соответствующими данным, но они непропорциональны и чересчур длинные :style="[{ width: `${data.width}px` }, { height: `${data.height}px` }]" -->
    <h3 class="template-item__title">{{ data.name }}</h3>
    <img
      class="template-item__img"
      loading="lazy"
      :src="data.preview_image ? data.preview_image : placeholderImage"
      alt="Not found"
    />
    <div class="template-item__controls">
      <RouterLink
        class="template-item__controls__link"
        :to="`/template/${data.id}`"
      >
        <button title="Перейти к странице элемента" class="template-item__btn">
          <img class="template-item__btn__icon" :src="OpenIcon" alt="icon" />
        </button>
      </RouterLink>
      <RouterLink
        class="template-item__controls__link"
        :to="`/template/${data.id}?edit=true`"
      >
        <button title="Редактировать" class="template-item__btn edit">
          <img class="template-item__btn__icon" :src="EditIcon" alt="icon" />
        </button>
      </RouterLink>
      <button
        @click="$emit('delete')"
        title="Удалить"
        class="template-item__btn delete"
      >
        <img class="template-item__btn__icon" :src="DeleteIcon" alt="icon" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TemplateItemEmits, TemplateItemProps } from "./interfaces.ts";
import placeholderImage from "../../assets/images/placeholder.webp";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import OpenIcon from "../../assets/icons/open.svg";

defineProps<TemplateItemProps>();
defineEmits<TemplateItemEmits>();
</script>

<style>
.template-item {
  border: 1px solid #000;
  padding: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.template-item__img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
}

.template-item__controls {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.template-item__btn {
  padding: 4px;
  border-radius: 4px;
  transition: 300ms;
  box-shadow: 2px 2px #000;
}

.template-item__btn.delete {
  background: red;
}

.template-item__btn.edit {
  background: limegreen;
}

.template-item__btn:hover {
  transform: scale(1);
  box-shadow: none;
}

.template-item__btn:active {
  box-shadow: none;
}
</style>
