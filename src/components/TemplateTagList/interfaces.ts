export interface TemplateTaglistProps{
  activeItems?: string[]
  disabled?: boolean
}

export interface TemplateTaglistEmits {
  (e: "activate", value: string[]): void;
}