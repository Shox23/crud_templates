import { ref, watch } from "vue";
import {
  createNewTemplate,
  deleteChosenTemplate,
  editTemplate,
  fetchCurrentTemplate,
  fetchTemplates,
} from "../api/templates";
import type { TemplateType } from "../types/TemplateType";

const chosenTemplate = ref<TemplateType | null>(null);
const templates = ref<TemplateType[]>([]);
const currentTemplate = ref<TemplateType | null>(null);

const useTemplates = () => {
  const isLoading = ref<boolean>(false);
  const errorMessage = ref<string>("");
  const searchIputValue = ref<string>("");
  const filteredTemplates = ref<TemplateType[]>([]);
  let debounceTimer: number | null = null;;

  const getTemplates = async (params?: string) => {
    try {
      isLoading.value = true;
      const response = await fetchTemplates(params);
      if (response.data) {
        templates.value = response.data;
      } else {
        errorMessage.value = "Что-то пошло не так";
      }
    } catch (error) {
      errorMessage.value = "Что-то пошло не так";
    } finally {
      isLoading.value = false;
    }
  };

  // TODO
  const editCurrentTemplate = async (data: FormData, id: number) => {
    try {
      const response = await editTemplate(data, id);
      if (response.data) {
        currentTemplate.value = response.data;
        let idx = templates.value.findIndex((item) => item.id == id);
        templates.value[idx] = response.data;
      } else {
        alert("Что-то пошло не так");
      }
    } catch (error) {
      alert("Что-то пошло не так");
    }
  };

  const createTemplate = async (data: FormData) => {
    try {
      const response = await createNewTemplate(data);
      console.log(response);
      if (response.data) {
        templates.value.push(response.data);
      }
    } catch (error) {
      alert("Что-то пошло не так");
    }
  };

  const getCurrentTemplate = async (id: string) => {
    if (!currentTemplate.value || currentTemplate.value.id.toString() !== id) {
      try {
        isLoading.value = true;
        const response = await fetchCurrentTemplate(id);
        console.log(response);
        if (response.data) {
          currentTemplate.value = response.data;
        } else {
          currentTemplate.value = null;
          errorMessage.value = "Что-то пошло не так";
        }
      } catch (error) {
        errorMessage.value = "Что-то пошло не так";
      } finally {
        isLoading.value = false;
      }
    }
  };

  const deleteTemplate = async () => {
    if (chosenTemplate.value !== null) {
      try {
        const response = await deleteChosenTemplate(chosenTemplate.value.id);
        if (response.status == 204) {
          templates.value = templates.value.filter(
            (item) => item.id !== chosenTemplate.value?.id
          );
          console.log(templates.value);
        }
      } catch (error) {
        errorMessage.value = "Что-то пошло не так";
      }
    }
  };

  watch(searchIputValue, (newValue) => {
    if (debounceTimer !== null) {
      clearTimeout(debounceTimer);
    };
    debounceTimer = setTimeout(() => {
      getTemplates(newValue);
    }, 500);
  });

  return {
    isLoading,
    templates,
    errorMessage,
    getTemplates,
    createTemplate,
    getCurrentTemplate,
    currentTemplate,
    filteredTemplates,
    searchIputValue,
    chosenTemplate,
    deleteTemplate,
    editCurrentTemplate,
  };
};

export default useTemplates;
