export const api = "http://localhost:3001/api"

export const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
}

export function authHeaders(token) {
    if (token) {
        return {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": token
        }
    } else {
      return headers
    }
  }