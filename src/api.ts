import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const uploadFile = async (
  file: File,
  chunking_method: string,
  chunking_mode: string
) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("chunking_method", chunking_method);
  formData.append("chunking_mode", chunking_mode);

  return axios.post(`${API_BASE_URL}/upload/file`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const getContextOutput = async ({ query }: { query: string }) => {
  return axios.post(`${API_BASE_URL}/get/context-output`, { query });
};

export const verifyCitation = async ({ query }: { query: string }) => {
  return axios.post(`${API_BASE_URL}/get/docs-citations`, { query });
};

export const getAllDocs = async () => {
  const res = await axios.get(`${API_BASE_URL}/get/all/docs`)
  return res.data
}
