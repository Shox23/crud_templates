export interface TemplateTaglistProps{
  activeItems?: string[]
}

export interface TemplateTaglistEmits {
  (e: "activate", value: string[]): void;
}