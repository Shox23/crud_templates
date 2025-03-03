import apiInstance from "../instance";

export const fetchTemplates = async () => {
  const response = await apiInstance.get("/canvas_templates");
  return response;
};

export const createNewTemplate = async (data: FormData) => {
  const response = await apiInstance.post("/canvas_templates", data);
  return response;
};

export const editTemplate = async (data: FormData, id: number) => {
  for (var pair of data.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }
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
