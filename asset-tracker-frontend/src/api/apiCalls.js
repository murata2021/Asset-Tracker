import axios from "axios";
import { store } from "../state/store";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

axios.interceptors.request.use((request) => {
  const { header } = store.getState();
  if (header) {
    request.headers["Authorization"] = header;
  }
  return request;
});

//ACCOUNT CREATION
export const signUp = (body) => {
  return axios.post(`${BASE_URL}/api/1.0/companies`, body);
};

//AUTH
export const login = (body) => {
  return axios.post("/api/1.0/auth", body);
};

//USER OPERATIONS
export const loadUsers = (companyId, page, search, size = 5) => {
  return axios.get(`/api/1.0/companies/${companyId}/users`, {
    params: { page, size, search },
  });
};

export const addUser = (body, companyId) => {
  return axios.post(`/api/1.0/companies/${companyId}/users`, body);
};
export const getUserById = (companyId, userId) => {
  return axios.get(`/api/1.0/companies/${companyId}/users/${userId}`);
};

export const updateUser = (companyId, userId, body) => {
  return axios.patch(`/api/1.0/companies/${companyId}/users/${userId}`, body);
};
export const deleteUser = (companyId, userId) => {
  return axios.delete(`/api/1.0/companies/${companyId}/users/${userId}`);
};

export const deactivateUser = (companyId, userId) => {
  return axios.patch(
    `/api/1.0/companies/${companyId}/users/${userId}/deactivate`
  );
};

export const updateUserPassword = (companyId, userId, body) => {
  return axios.patch(
    `/api/1.0/companies/${companyId}/users/${userId}/password`,
    body
  );
};

//VENDOR OPERATIONS

export const getVendors = (
  companyId,
  pagination = true,
  search = "",
  page,
  size = 5
) => {
  return axios.get(`/api/1.0/companies/${companyId}/vendors`, {
    params: { page, size, search, pagination },
  });
};

export const getVendorById = (companyId, vendorId) => {
  return axios.get(`/api/1.0/companies/${companyId}/vendors/${vendorId}`);
};

export const addVendor = (body, companyId) => {
  return axios.post(`/api/1.0/companies/${companyId}/vendors`, body);
};

export const updateVendor = (companyId, vendorId, body) => {
  return axios.patch(
    `/api/1.0/companies/${companyId}/vendors/${vendorId}`,
    body
  );
};

export const deleteVendor = (companyId, vendorId) => {
  return axios.delete(`/api/1.0/companies/${companyId}/vendors/${vendorId}`);
};

export const getVendorsAsset = (
  companyId,
  vendorId,
  search = "",
  page,
  size = 5
) => {
  return axios.get(
    `/api/1.0/companies/${companyId}/vendors/${vendorId}/assets`,
    {
      params: { page, size, search },
    }
  );
};

//ASSET GROUP OPERATIONS
export const addAssetGroup = (body, companyId) => {
  return axios.post(`/api/1.0/companies/${companyId}/asset-groups`, body);
};

export const getAssetGroups = (
  companyId,
  pagination = true,
  search = "",
  page,
  size = 5
) => {
  return axios.get(`/api/1.0/companies/${companyId}/asset-groups`, {
    params: { page, size, search, pagination },
  });
};

export const getAssetGroupById = (companyId, assetGroupId) => {
  return axios.get(
    `/api/1.0/companies/${companyId}/asset-groups/${assetGroupId}`
  );
};

export const updateAssetGroup = (companyId, assetGroupId, body) => {
  return axios.patch(
    `/api/1.0/companies/${companyId}/asset-groups/${assetGroupId}`,
    body
  );
};

export const deleteAssetGroup = (companyId, assetGroupId) => {
  return axios.delete(
    `/api/1.0/companies/${companyId}/asset-groups/${assetGroupId}`
  );
};

export const getAssetGroupsAsset = (
  companyId,
  assetGroupId,
  search = "",
  page,
  size = 5
) => {
  return axios.get(
    `/api/1.0/companies/${companyId}/asset-groups/${assetGroupId}/assets`,
    {
      params: { page, size, search },
    }
  );
};

//ASSET OPERATIONS
export const addAsset = (body, companyId) => {
  return axios.post(`/api/1.0/companies/${companyId}/assets`, body);
};

export const getAssets = (companyId, search = "", page, size = 5) => {
  return axios.get(`/api/1.0/companies/${companyId}/assets`, {
    params: { page, size, search },
  });
};

export const getAssetById = (companyId, assetId) => {
  return axios.get(`/api/1.0/companies/${companyId}/assets/${assetId}`);
};

export const updateAsset = (companyId, assetId, body) => {
  return axios.patch(`/api/1.0/companies/${companyId}/assets/${assetId}`, body);
};

export const deleteAsset = (companyId, assetId) => {
  return axios.delete(`/api/1.0/companies/${companyId}/assets/${assetId}`);
};

//ASSET STATUS OPERATIONS

export const getAsssetStatus = (companyId) => {
  return axios.get(`/api/1.0/companies/${companyId}/asset-status`);
};

export const getAssetsByStatus = (
  companyId,
  statusId,
  search = "",
  page,
  size = 5
) => {
  return axios.get(
    `/api/1.0/companies/${companyId}/asset-status/${statusId}/assets`,
    {
      params: { page, size, search },
    }
  );
};


//COMPANY OPERATIONS

export const getCompanyById = (companyId) => {
  return axios.get(`/api/1.0/companies/${companyId}`);
};

export const updateCompany=(companyId,body)=>{

  return axios.patch(`/api/1.0/companies/${companyId}`,body)
}

export const deleteCompany=(companyId)=>{

  return axios.delete(`/api/1.0/companies/${companyId}`)
}