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

const baseUrl = process.env.NEXT_PUBLIC_HOST_SERVER;
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
  getOneUserPrivate: {
    endpoint: `${baseUrl}/users/show/:userId`,
    method: GET,
  },
  getOneUserPublic: {
    endpoint: `${baseUrl}/users/view`,
    method: GET,
  },

  /****************** Profile route */
  updateOneProfileNextStep: {
    endpoint: `${baseUrl}/profile/update/:userId`,
    method: PUT,
  },
  updateOneProfile: {
    endpoint: `${baseUrl}/users/update/profile/:profileId`,
    method: PUT,
  },
  getOneProfile: {
    endpoint: `${baseUrl}/users/profile/show/:profileId`,
    method: GET,
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

  /****************** Categories route */
  getCategories: {
    endpoint: `${baseUrl}/categories`,
    method: GET,
  },

  /****************** Galleries route */
  createOneGallery: {
    endpoint: `${baseUrl}/galleries`,
    method: POST,
  },
  updateOneGallery: {
    endpoint: `${baseUrl}/galleries/:galleryId`,
    method: PUT,
  },
  deleteOneGallery: {
    endpoint: `${baseUrl}/galleries/:galleryId`,
    method: DELETE,
  },
  getGalleries: {
    endpoint: `${baseUrl}/galleries`,
    method: GET,
  },

  /****************** Posts route */
  createOnePost: {
    endpoint: `${baseUrl}/posts`,
    method: POST,
  },
  createOnUploadPost: {
    endpoint: `${baseUrl}/posts/upload`,
    method: POST,
  },
  getOnePost: {
    endpoint: `${baseUrl}/posts/show/:postId`,
    method: GET,
  },
  updateOnePost: {
    endpoint: `${baseUrl}/posts/:postId`,
    method: PUT,
  },
  deleteOnePost: {
    endpoint: `${baseUrl}/posts/:postId`,
    method: DELETE,
  },
  getPosts: {
    endpoint: `${baseUrl}/posts`,
    method: GET,
  },
};
