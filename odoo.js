import axios from "axios";

export const odooAPI = axios.create({
  baseURL: "http://ventura:8019/",
  headers: { "Content-Type": "application/json" }
});

export async function authenticate() {
  const response = await odooAPI.post("/web/session/authenticate", {
    jsonrpc: "2.0",
    params: {
      db: "odoo19-test",
      login: "admin@gmail.com",
      password: "admin@123"
    }
  });

  const rawCookie = response.headers["set-cookie"];
  const sessionId = rawCookie[0].split(";")[0];
  return sessionId;
}
