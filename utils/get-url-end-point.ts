import axios from "axios";

export interface ClientApiMethods {
  [key: string]: {
    endpoint: string;
    method: string;
  };
}

export type IntegrationApiCall = {
  action: string;
  body?: Object;
  urlParams?: Object;
  queryParams?: Object;
};

const user =
  typeof window !== "undefined"
    ? JSON.parse(
        String(
          localStorage.getItem(String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN))
        )
      )
    : null;

export const makeApiCall = async ({
  action,
  body,
  urlParams = {},
  queryParams = {},
}: IntegrationApiCall): Promise<any> => {
  const getURLEndpoint = (options: {
    endpoint: string;
    urlParams: any;
    queryParams: any;
  }) => {
    const { endpoint, urlParams, queryParams } = options;

    //replace params in url
    let url = endpoint;
    if (urlParams) {
      Object.keys(urlParams).forEach((key: string) => {
        url = url.replace(`:${key}`, urlParams[key]);
      });
    }

    //add query params
    if (queryParams) {
      url += "?";
      Object.keys(queryParams).forEach((key: string) => {
        if (queryParams[key]) {
          url += `${key}=${queryParams[key]}&`;
        }
      });
      url = url.slice(0, -1);
    }

    return url;
  };

  const url = getURLEndpoint({
    endpoint: apiEndpoints[action].endpoint,
    urlParams: urlParams,
    queryParams: queryParams,
  });

  axios.defaults.headers.common["Authorization"] = user ?? {};
  const response = await axios.request({
    method: apiEndpoints[action].method,
    withCredentials: true,
    url: url,
    data: body,
  });

  return response;
};

const POST = "post";
const GET = "get";
const DELETE = "delete";
const PUT = "put";

const baseUrl = process.env.NEXT_PUBLIC_HOST;
export const apiEndpoints: ClientApiMethods = {
  /****************** User route */
  loginUser: {
    endpoint: `${baseUrl}/login`,
    method: POST,
  },
  registerUser: {
    endpoint: `${baseUrl}/register`,
    method: POST,
  },
  passwordResetUser: {
    endpoint: `${baseUrl}/password/reset`,
    method: POST,
  },
  resetPassword: {
    endpoint: `${baseUrl}/password/update/:token`,
    method: PUT,
  },
  resendCode: {
    endpoint: `${baseUrl}/resend/code/:userId`,
    method: GET,
  },
  validCode: {
    endpoint: `${baseUrl}/valid/code`,
    method: POST,
  },
  getOneUser: {
    endpoint: `${baseUrl}/users/show/:userId`,
    method: GET,
  },
  /****************** Profile route */
  updateOneProfileNextStep: {
    endpoint: `${baseUrl}/profile/update/:userId`,
    method: PUT,
  },
  /****************** Currency or Countries route */
  getAllCurrencies: {
    endpoint: `${baseUrl}/currencies`,
    method: GET,
  },
  getAllCounties: {
    endpoint: `${baseUrl}/countries`,
    method: GET,
  },
};
