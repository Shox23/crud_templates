import { reactive, ref } from "vue";
import useAuth from "./useAuth";
import type { LoginData } from "../api/auth";
import type { TemplateTypeForm } from "../types/TemplateType";

const { login } = useAuth();
const useForm = () => {
  const initialTemplateForm = {
    name: "",
    description: "",
    height: "",
    width: "",
    tags: [],
    preview_image: "",
  };
  const currentTemplateForm = ref<TemplateTypeForm>({
    name: "",
    description: "",
    height: "",
    width: "",
    tags: [],
    preview_image: "",
  });
  const templateForm = reactive<TemplateTypeForm>({
    name: "",
    description: "",
    height: "",
    width: "",
    tags: [],
    preview_image: "",
  });
  const loginForm = reactive<LoginData>({
    email: "hello@aiscreen.io",
    password: "Demo!1234",
  });

  const clearCurrentTemplateForm = () => {
    Object.assign(currentTemplateForm, initialTemplateForm);
  };

  const clearTemplateForm = () => {
    Object.assign(templateForm, initialTemplateForm);
  };

  const submitLoginForm = () => {
    if (
      loginForm.email.trim().length == 0 ||
      loginForm.password.trim().length == 0
    ) {
      alert("fill the inputs");
    } else {
      login(loginForm);
    }
  };

  return {
    loginForm,
    submitLoginForm,
    templateForm,
    clearTemplateForm,
    currentTemplateForm,
    clearCurrentTemplateForm,
  };
};

export default useForm;
