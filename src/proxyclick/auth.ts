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

/**
 * Returns the cached access token, or fetches a new one and verifies it.
 * Token is verified if the audience matches the client id
 * @returns {Promise<string>} access token
 */
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

  const result = await axios.post(`${BASE}/oauth/token`, body, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const audience = await verify_token(result.data.access_token);
  if (audience !== CLIENT_ID) {
    throw "Invalid token!";
  }

  if (result.data.access_token) {
    store("token", result.data.access_token);
  }
  return result.data.access_token;
}

/**
 * Fetches the audience
 * @param {string} token access token
 * @returns {Promise<string>} audience
 */
export async function verify_token(token): Promise<string> {
  const result = await axios.get(`${BASE}/oauth/verify?token=${token}`);
  return result.data.audience;
}
