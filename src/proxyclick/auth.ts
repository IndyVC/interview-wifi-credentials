import axios from "axios";
import { store, exists, fetch } from "../cache/cache";
import {
  BASE,
  CLIENT_ID,
  CLIENT_SECRET,
  PASSWORD,
  USERNAME,
  GRANT_TYPE,
} from "../config/config";

export interface Auth {
  data: {
    access_token: string;
    token_type: string;
  };
}
export interface Verify {
  data: {
    audience: string;
  };
}

export async function access_token(): Promise<string> {
  if (exists("token")) {
    return fetch("token");
  }

  const body = new URLSearchParams();
  body.append("client_id", CLIENT_ID);
  body.append("client_secret", CLIENT_SECRET);
  body.append("password", PASSWORD);
  body.append("username", USERNAME);
  body.append("grant_type", GRANT_TYPE);
  const result: Auth = await axios.post(`${BASE}/oauth/token`, body, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  if (result.data.access_token) {
    store("token", result.data.access_token);
  }
  return result.data.access_token;
}

export async function verify_token(token): Promise<string> {
  const result: Verify = await axios.get(
    `${BASE}//oauth/revoke?token=${token}`
  );
  return result.data.audience;
}
