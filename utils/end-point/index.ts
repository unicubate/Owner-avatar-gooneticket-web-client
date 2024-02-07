import axios from 'axios';
import { DELETE, GET, POST, PUT } from './consts';

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
  typeof window !== 'undefined'
    ? JSON.parse(
        String(
          localStorage.getItem(String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN)),
        ),
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
      url += '?';
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

  axios.defaults.headers.common['Authorization'] = user ?? {};
  const response = await axios.request({
    method: apiEndpoints[action]?.method,
    withCredentials: true,
    url: url,
    data: body,
  });

  return response;
};

const baseUrl = process.env.NEXT_PUBLIC_HOST_SERVER;

export const apiEndpoints: ClientApiMethods = {
  /****************** User route */
  loginUser: POST(`${baseUrl}/login`),
  loginGoogleUser: POST(`${baseUrl}/login-google-auth`),
  registerGoogleUser: POST(`${baseUrl}/register-google-auth`),
  registerUser: POST(`${baseUrl}/register`),
  passwordResetUser: POST(`${baseUrl}/password/reset`),
  resetPassword: PUT(`${baseUrl}/password/update/:token`),
  resendCode: GET(`${baseUrl}/resend/code/:userId`),
  validCode: POST(`${baseUrl}/valid/code`),
  getOneUserPrivate: GET(`${baseUrl}/users/show/:userId`),
  getOneUserPublic: GET(`${baseUrl}/users/view`),
  getUsers: GET(`${baseUrl}/users`),

  /****************** Profile route */
  updateOneProfileNextStep: PUT(`${baseUrl}/profile/update/:userId`),
  updateOneProfile: PUT(`${baseUrl}/users/update/profile/:profileId`),
  updateEnableProfile: PUT(`${baseUrl}/users/update/enable/:profileId`),
  getOneProfile: GET(`${baseUrl}/users/profile/show/:profileId`),

  /****************** Transaction route */
  getTransactions: GET(`${baseUrl}/transactions`),
  getStatisticsTransactions: GET(`${baseUrl}/transactions/statistics`),

  /****************** Cart route */
  getCarts: GET(`${baseUrl}/carts`),
  getOneCartOrder: GET(`${baseUrl}/cart-orders/view`),
  createOneCart: POST(`${baseUrl}/carts`),
  updateOneCart: PUT(`${baseUrl}/carts/:cartId`),
  deleteOneCart: DELETE(`${baseUrl}/carts/:cartId`),

  /****************** OrderItem route */
  getOrderItems: GET(`${baseUrl}/orders/order-items`),
  updateOneOrderItem: PUT(`${baseUrl}/orders/order-items/:orderItemId`),

  /****************** Currency or Countries route */
  getAllCurrencies: GET(`${baseUrl}/currencies`),
  getAllCounties: GET(`${baseUrl}/countries`),

  /****************** Follows route */
  getFollowers: GET(`${baseUrl}/follows/followers`),
  getFollowings: GET(`${baseUrl}/follows/followings`),
  createOneFollowers: POST(`${baseUrl}/follows/create/:followerId`),
  deleteOneFollowers: POST(`${baseUrl}/follows/delete/:followerId`),

  /****************** Like route */
  createOneLike: POST(`${baseUrl}/likes/:type/:likeableId`),
  deleteOneLike: DELETE(`${baseUrl}/likes/:type/:likeableId`),

  /****************** Comments route */
  getComments: GET(`${baseUrl}/comments`),
  getCommentsRepliesAPI: GET(`${baseUrl}/comments/replies`),
  createOneComment: POST(`${baseUrl}/comments`),
  createOneCommentReply: POST(`${baseUrl}/comments/replies`),
  updateOneComment: PUT(`${baseUrl}/comments/:commentId`),
  deleteOneComment: DELETE(`${baseUrl}/comments/:commentId`),

  /****************** Contributors route */
  getContributors: GET(`${baseUrl}/contributors`),
  createOneContributor: POST(`${baseUrl}/contributors`),
  deleteOneContributor: DELETE(`${baseUrl}/contributors/:contributorId`),

  /****************** Discounts route */
  getDiscountsUser: GET(`${baseUrl}/discounts/user`),
  getDiscounts: GET(`${baseUrl}/discounts`),
  createOneDiscount: POST(`${baseUrl}/discounts`),
  updateOneDiscount: PUT(`${baseUrl}/discounts/:discountId`),
  deleteOneDiscount: DELETE(`${baseUrl}/discounts/:discountId`),

  /****************** Categories route */
  getCategories: GET(`${baseUrl}/categories`),
  createOneCategory: POST(`${baseUrl}/categories`),
  updateOneCategory: PUT(`${baseUrl}/categories/:categoryId`),
  deleteOneCategory: DELETE(`${baseUrl}/categories/:categoryId`),

  /****************** Albums route */
  getAlbums: GET(`${baseUrl}/albums`),
  createOneAlbum: POST(`${baseUrl}/albums`),
  updateOneAlbum: PUT(`${baseUrl}/albums/:albumId`),
  deleteOneAlbum: DELETE(`${baseUrl}/albums/:albumId`),

  /****************** Donations route */
  getOneDonation: GET(`${baseUrl}/donations/show/:donationId`),
  updateOneDonation: PUT(`${baseUrl}/donations/:donationId`),

  /****************** Uploads route */
  getUploads: GET(`${baseUrl}/uploads`),
  updateOneUpload: PUT(`${baseUrl}/uploads/update`),

  /****************** Products route */
  getProducts: GET(`${baseUrl}/products`),
  createOneProduct: POST(`${baseUrl}/products`),
  updateOneProduct: PUT(`${baseUrl}/products/:productId`),
  getOneProduct: GET(`${baseUrl}/products/view`),
  deleteOneProduct: DELETE(`${baseUrl}/products/:productId`),

  /****************** Commissions route */
  getCommissions: GET(`${baseUrl}/commissions`),
  getOneCommission: GET(`${baseUrl}/commissions/view`),
  createOneCommission: POST(`${baseUrl}/commissions`),
  updateOneCommission: PUT(`${baseUrl}/commissions/:commissionId`),
  deleteOneCommission: DELETE(`${baseUrl}/commissions/:commissionId`),

  /****************** Memberships route */
  getMemberships: GET(`${baseUrl}/memberships`),
  getOneMembership: GET(`${baseUrl}/memberships/view`),
  createOneMembership: POST(`${baseUrl}/memberships`),
  updateOneMembership: PUT(`${baseUrl}/memberships/:membershipId`),
  deleteOneMembership: DELETE(`${baseUrl}/memberships/:membershipId`),

  /****************** Payments route */
  getPayments: GET(`${baseUrl}/payments`),
  createOnePaymentsPaypalSubscribe: POST(
    `${baseUrl}/payments/paypal/subscribe`,
  ),
  createOnePaymentsStripeSubscribe: POST(
    `${baseUrl}/payments/stripe/subscribe`,
  ),
  createOnePaymentsPaypalDonation: POST(`${baseUrl}/payments/paypal/donation`),
  createOnePaymentsStripeDonation: POST(`${baseUrl}/payments/stripe/donation`),
  createOnePaymentsPaypalShop: POST(`${baseUrl}/payments/paypal/shop`),
  createOnePaymentsCreate: POST(`${baseUrl}/payments/create`),
  resendVerifyCodeOnePaymentsCreate: POST(
    `${baseUrl}/payments/resend-code-verify-phone`,
  ),
  verifyCodeOnePaymentsCreate: POST(`${baseUrl}/payments/code-verify-phone`),
  deleteOnePayment: DELETE(`${baseUrl}/payments/:paymentId`),

  /****************** Posts route */
  createOnePostGallery: POST(`${baseUrl}/posts/galleries`),
  createOnePost: POST(`${baseUrl}/posts`),
  createOnUploadPost: POST(`${baseUrl}/posts/upload`),
  getOnePost: GET(`${baseUrl}/posts/view`),
  getFollowsPosts: GET(`${baseUrl}/posts/follows`),
  updateOnePost: PUT(`${baseUrl}/posts/:postId`),
  deleteOnePost: DELETE(`${baseUrl}/posts/:postId`),
  getPosts: GET(`${baseUrl}/posts`),
};
