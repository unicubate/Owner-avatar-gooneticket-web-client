import axios from "axios";

const user =
  typeof window !== "undefined"
    ? JSON.parse(
        String(
          localStorage.getItem(String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN))
        )
      )
    : null;
export default axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_HOST_SERVER}`,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
    Authorization: `${user && user ? user : {}}`,
    withCredentials: true,
  },
});
