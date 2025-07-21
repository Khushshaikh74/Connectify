import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const res = await axiosInstance.post("/auth/signup", signupData);
  return res.data;
}

export const login = async (userData) => {
  const res = await axiosInstance.post('/auth/signin', userData)
  return res.data
}

export const logout = async () => {
  try {
    const res = await axiosInstance.get('/auth/logout');
    return res.data;
  } catch (error) {
    console.error("Logout failed:", error?.response?.data || error.message);
    return null;
  }
}

export const authUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    //console.log("Error in getAuthUser:", error);
    return null;
  }
}

export const completeOnboard = async (userData) => {
  const res = await axiosInstance.post('/auth/onboarding', userData)
  return res.data;
}

export const getUserFriends = async () => {
  const res = await axiosInstance.get('/user/friends')
  return res.data
}

export const getRecommendedUsers = async () => {
  const res = await axiosInstance.get('/user')
  return res.data
}

export const getOutgoingFriendReqs = async () => {
  //console.log("Fetching outgoing friend requests")
  const res = await axiosInstance.get('/user/outgoing-friend-requests')
  return res.data
}

export const sendFriendRequest = async (userId) => {
  const res = await axiosInstance.post(`/user/friend-requests/${userId}`)
  return res.data
}

export const getFriendRequests = async () => {
  const res = await axiosInstance.get(`/user/friend-requests`)
  return res.data
}

export const acceptFriendRequest = async (reqId) => {
  const res = await axiosInstance.put(`/user/friend-requests/${reqId}/accept`)
  return res.data
}

export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}