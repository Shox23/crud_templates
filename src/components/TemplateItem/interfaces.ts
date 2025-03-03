import type { TemplateType } from "../../types/TemplateType";

export interface TemplateItemProps {
  data: TemplateType;
}

export interface TemplateItemEmits {
  (e: "delete"): void;
  (e: "edit", value: number): void;
}
