import api from "./axios";

export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/login/", { email, password });
  const { access, refresh } = res.data;
  console.log("ok till the function ");

  // ✅ Save tokens in localStorage
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);

  return res.data;
};

export const signupUser = async (email: string, password: string) => {
  const res = await api.post("/signup/", { email, password });
  const { access, refresh } = res.data;

  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);

  return res.data;
};

export const logoutUser = async () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const getUserProfile = async () => {
  const res = await api.get("/user/profile/"); // when your friend adds it
  return res.data;
};
