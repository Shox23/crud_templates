<template>
  <ul class="tag-list">
    <li
      v-for="item in templateTags"
      :key="item"
      @click="() => handleTagActivate(item)"
    >
      <div
        v-if="item"
        :class="`tag-list__item ${activeTags.includes(item) ? 'active' : ''}`"
      >
        {{ item }}
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import useTemplateTags from "../../composables/useTemplateTags";
import type { TemplateTaglistEmits, TemplateTaglistProps } from "./interfaces";

const props = defineProps<TemplateTaglistProps>();
const emits = defineEmits<TemplateTaglistEmits>();
const { templateTags, getTemplateTags, chooseActiveTag, activeTags } =
  useTemplateTags();

const handleTagActivate = (value: string) => {
  chooseActiveTag(value);
  emits("activate", activeTags);
};

onMounted(() => {
  if (!templateTags.length) getTemplateTags();
  if (props.activeItems) {
    activeTags.push(...props.activeItems);
  }
});
</script>

<style>
.tag-list {
  display: flex;
  align-items: center;
  gap: 12px;
}

.tag-list__item {
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 0 4px;
  transition: 300ms;
  box-shadow: 2px 2px #000;
}

.tag-list__item.active {
  background: #000;
  border: 1px solid #000;
  color: aliceblue;
  box-shadow: 2px 2px #ccc;
}

.tag-list__item:hover {
  box-shadow: none;
}
</style>
