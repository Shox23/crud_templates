import { ref } from "vue";
const isOpen = ref<boolean>(false);

function useModal() {
  const openModal = () => {
    isOpen.value = true;
  };

  const closeModal = () => {
    isOpen.value = false;
  };

  return {
    isOpen,
    closeModal,
    openModal,
  };
}

export default useModal;
