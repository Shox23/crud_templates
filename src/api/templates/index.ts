import apiInstance from "../instance";

export const fetchTemplates = async (params?: string) => {
  const response = await apiInstance.get(
    `/canvas_templates${params ? `?filter[name]=${params}` : ""}`
  );
  return response;
};

export const createNewTemplate = async (data: FormData) => {
  const response = await apiInstance.post("/canvas_templates", data);
  return response;
};

export const editTemplate = async (data: FormData, id: number) => {
  const response = await apiInstance.post(
    `/canvas_templates/${id}?_method=PATCH`,
    data
  );
  return response;
};

export const fetchCurrentTemplate = async (id: string) => {
  const response = await apiInstance.get(`/canvas_templates/${id}`);
  return response;
};

export const deleteChosenTemplate = async (id: number) => {
  const response = await apiInstance.delete(`/canvas_templates?id=${id}`);
  return response;
};
