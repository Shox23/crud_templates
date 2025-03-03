export interface TemplateType {
  id: number;
  name: string;
  description: string;
  width: string;
  height: string;
  objects: null;
  tags: string[];
  preview_image: string;
  created_by: string;
  created_at: Date;
}

export interface TemplateTypeForm {
  name: string;
  description?: string;
  width?: string;
  height?: string;
  preview_image?: string | File;
  tags?: string[] | null;
}
