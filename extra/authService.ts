// services/authService.js
// import Cookies from "js-cookie";
import axios from "axios";
const config = require("../../../../appsettings.json");

// const API_URL = "http://localhost:3000";
//const API_URL = process.env.NEXT_PUBLIC_API_URL;

const API_URL = config.NEXT_PUBLIC_API_URL;

// Login API Call
export const authService = {
  login: async (email: any, password: any) => {
    try {
      const result = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      if (result.data.token) {
        localStorage.setItem("token", result.data.token);
        return { success: true, user: result.data.user };
      }

      //Cookies.set("token", result.data.token, { expires: 7 }); // Save token in cookies

      // return { success: result.data.success, token: result.data.token }; // ✅ Return JSON instead of `redirect()`
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        //   console.log(error.response?.data.error);
        //   console.error("Axios Error:", error.response?.data);
        //   console.error("Status Code:", error.response?.status);
        return { success: false, error: error.response?.data.error };
      } else {
        console.error("Unexpected Error:", error.response?.error);
        return { success: false, error: error };
      }
    }
  },
  // // Logout API Call
  // export const logout = () => {
  //   Cookies.remove("token"); // Remove token from cookies
  // };

  getUser: async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const res = await axios.get(`${API_URL}/api/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.user;
    } catch {
      return null;
    }
  },

  getMenuItems: async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const res = await axios.get(`${API_URL}/api/menu`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.groupedMenu;
    } catch {
      return null;
    }
  },
  getDataAreaId: async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const res = await axios.get(`${API_URL}/api/dynamics?type=company`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.result;
    } catch {
      return null;
    }
  },
  getsitesbyuserid: async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const res = await axios.get(
        `${API_URL}/api/dynamics?type=getsitesbyuserid`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data.result;
    } catch {
      return null;
    }
  },
  getAllRole: async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const res = await axios.get(`${API_URL}/api/dynamics?type=getAllRole`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.result;
    } catch {
      return null;
    }
  },

  getSites: async (id: any) => {
    const token = localStorage.getItem("token");
    const sites = "sites";
    if (!token) return null;

    try {
      const res = await axios.post(
        `${API_URL}/api/dynamics`,
        { id, type: sites },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data.result;
    } catch {
      return null;
    }
  },

  getWarehouses: async (compnayId: any, siteId: any) => {
    const token = localStorage.getItem("token");
    const wahrehouse = "wahrehouse";
    if (!token) return null;

    try {
      const res = await axios.post(
        `${API_URL}/api/dynamics`,
        { compnayId, siteId, type: wahrehouse },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data.result;
    } catch {
      return null;
    }
  },

  fetchUser: async (id: any) => {
    const token = localStorage.getItem("token");
    const fetchUser = "fetchUser";
    if (!token) return null;

    try {
      const res = await axios.post(
        `${API_URL}/api/dynamics`,
        { id, type: fetchUser },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data.result;
    } catch {
      return null;
    }
  },

  getUserAccesssitesByuserid: async (id: any) => {
    const token = localStorage.getItem("token");
    const getsitesbyuserid = "getsitesbyuserid";
    if (!token) return null;

    try {
      const res = await axios.post(
        `${API_URL}/api/dynamics`,
        { id, type: getsitesbyuserid },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data.result;
    } catch {
      return null;
    }
  },
};

// // Get User Data
// export const getUser = async () => {
//   const token = Cookies.get("token");
//   if (!token) return null;

//   try {
//     const response = await fetch("http://localhost:3000/api/user", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) return null;

//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     return null;
//   }
// };
