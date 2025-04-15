
import Axios from "./Axios";

export const fetchUser = async () => {
  try {
    const res = await Axios.get("/me");
    return res.data.data;
  } catch (err) {
    console.log("User fetch failed:", err);
    return null;
  }
};

export const refreshAccessToken = async () => {
  try {
    const res = await Axios.post("/auth/refresh-token");
    const token = res.data.accessToken;
    return token;
  } catch (err) {
    console.log("Refresh token failed:", err);
    return null;
  }
};
