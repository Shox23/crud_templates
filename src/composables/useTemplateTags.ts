import { reactive } from "vue";
import { fetchTemplateTags } from "../api/templateTags";

const templateTags = reactive<string[]>([]);
const useTemplateTags = () => {
  const activeTags = reactive<string[]>([]);

  const getTemplateTags = async () => {
    const response = await fetchTemplateTags();
    if (response.data) {
      templateTags.push(...response.data);
      console.log(response);
    }
  };

  const chooseActiveTag = (value: string) => {
    let chosenTag = templateTags.find((item) => item === value);
    if (chosenTag) {
      if (activeTags.includes(chosenTag)) {
        let index = activeTags.findIndex((item) => item == chosenTag);
        activeTags.splice(index, 1);
      } else {
        activeTags.push(chosenTag);
      }
    }
  };

  return {
    getTemplateTags,
    templateTags,
    activeTags,
    chooseActiveTag,
  };
};

export default useTemplateTags;
