import apiInstance from "../instance";

export const fetchTemplateTags = async () => {
  const response = await apiInstance.get("/canvas_templates/tags/list");
  return response;
};
