import axiosInstance from "./axios";

export const getProperties = async (filters = {}) => {
  const response = await axiosInstance.get("/property/get-property", {
    params: filters,
  });
  return response.data.data;
};
export const getIndividualProperties = async (filters = {}) => {
  const response = await axiosInstance.get("/form/get-prop-byid", {
    params: filters,
  });
  return response.data.data;
};


export const postBookmark = async (payload) => {
  const response = await axiosInstance.post("/property/add-bookmark", payload);
  return response.data;
};
export const getBookmarkedProperties = async (filters = {}) => {
  const response = await axiosInstance.get("/property/get-bookmarks", {
    params: filters,
  });

  console.log(response.data.data)
  return response.data.data;
};

export const getNearByProperties = async (filters = {}) => {
  const response = await axiosInstance.get("/property/getNearbyProperties", {
    params: filters,
  });
  return response.data.data;
};
