import { create } from "zustand";

const useAuth = create<{
  getUser: () => object | null;
  signIn: (arg0: { email: string; password: string }) => void;
  signOut: () => void;
}>()(() => ({
  getUser: () => {
    const item = localStorage.getItem("user");
    if (!item || item === "undefined") {
      return null;
    }
    const parsed = JSON.parse(item);
    return parsed;
  },
  signIn: async (data: { email: string; password: string }) => {
    try {
      // const res = await logIn(data);
      // localStorage.setItem("user", JSON.stringify(res.user));
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem("user", JSON.stringify({ email: data.email }));
      localStorage.setItem("token", "randomToken");
    } catch (err) {
      throw new Error();
    }
  },
  signOut: () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      console.log("logout success");
      location.replace("/signIn");
    } catch (e) {
      console.log(e);
    }
  },
}));

export default useAuth;
