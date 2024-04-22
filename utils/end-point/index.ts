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

// const userToken =
//   typeof window !== 'undefined'
//     ? Cookies.get(String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN))
//     : null;

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

  //   async request(req: Request<M>) {
  //   const m = this._methods[req.action];

  // axios.defaults.headers.common['Authorization'] = `${userToken}` ?? {};
  const response = await axios.request({
    method: apiEndpoints[action]?.method,
    url: url,
    data: body,
    withCredentials: true,
  });

  return response;
};

const baseUrl = process.env.NEXT_PUBLIC_HOST_SERVER;

export const apiEndpoints: ClientApiMethods = {
  /****************** User route */
  loginUser: POST(`${baseUrl}/login`),
  loginPhoneUser: POST(`${baseUrl}/login-phone`),
  loginCheckEmailOrPhoneUser: POST(`${baseUrl}/login/check-email-or-phone`),
  registerCheckEmailOrPhoneUser: POST(
    `${baseUrl}/register/check-email-or-phone`,
  ),
  sendCodePhoneUser: GET(`${baseUrl}/send-code-phone/:phone`),
  sendCodeEmailUser: GET(`${baseUrl}/send-code-email/:email`),
  ipLocation: GET(`${baseUrl}/ip-location`),
  verifyTokenUser: GET(`${baseUrl}/verify-token`),
  loginGoogleUser: POST(`${baseUrl}/login-google-auth`),
  registerGoogleUser: POST(`${baseUrl}/register-google-auth`),
  registerUser: POST(`${baseUrl}/register`),
  logoutUsers: GET(`${baseUrl}/logout`),
  passwordResetUser: POST(`${baseUrl}/password/reset`),
  resetPassword: PUT(`${baseUrl}/password/update/:token`),
  resendCode: GET(`${baseUrl}/resend/code`),
  validCode: POST(`${baseUrl}/valid/code`),
  getOneUserPrivate: GET(`${baseUrl}/users/show/:userId`),
  deleteOneUser: DELETE(`${baseUrl}/users/:userId`),
  getOneUserPublic: GET(`${baseUrl}/users/view`),
  getOneUserMe: GET(`${baseUrl}/users/me`),
  getUsers: GET(`${baseUrl}/users`),

  /****************** Profile route */
  updateOneProfileNextStep: PUT(`${baseUrl}/profile/update/:userId`),
  updateOneProfile: PUT(`${baseUrl}/users/update/profile`),
  updateEnableProfile: PUT(`${baseUrl}/users/update/enable/:profileId`),
  updateUpdatePassword: PUT(`${baseUrl}/users/update-password`),
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

  /****************** Order route */
  getOneOrder: GET(`${baseUrl}/orders/:orderId`),

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
  updateOneContributor: PUT(`${baseUrl}/contributors/:contributorId`),
  createOneContributorInvited: GET(`${baseUrl}/contributors/invited/:userId`),
  confirmOneContributor: PUT(`${baseUrl}/contributors/confirm/:token`),
  deleteOneContributor: DELETE(`${baseUrl}/contributors/:contributorId`),

  /****************** Discounts route */
  getDiscountsUser: GET(`${baseUrl}/discounts/user`),
  getDiscounts: GET(`${baseUrl}/discounts`),
  createOneDiscount: POST(`${baseUrl}/discounts`),
  updateOneDiscount: PUT(`${baseUrl}/discounts/:discountId`),
  deleteOneDiscount: DELETE(`${baseUrl}/discounts/:discountId`),

  /****************** Affiliations route */
  getAffiliations: GET(`${baseUrl}/affiliations`),
  createOneAffiliation: POST(`${baseUrl}/affiliations`),
  updateOneAffiliation: PUT(`${baseUrl}/affiliations/:affiliationId`),
  deleteOneAffiliation: DELETE(`${baseUrl}/affiliations/:affiliationId`),

  /****************** Categories route */
  getCategories: GET(`${baseUrl}/categories`),
  createOneCategory: POST(`${baseUrl}/categories`),
  updateOneCategory: PUT(`${baseUrl}/categories/:categoryId`),
  deleteOneCategory: DELETE(`${baseUrl}/categories/:categoryId`),

  /****************** Conversations route */
  getConversations: GET(`${baseUrl}/conversations`),
  getOneConversation: GET(`${baseUrl}/conversations/:fkConversationId`),
  getConversationsMessages: GET(
    `${baseUrl}/conversations/messages/:fkConversationId`,
  ),
  createOneConversationMessage: POST(`${baseUrl}/conversations/messages`),
  createOneConversation: POST(`${baseUrl}/conversations`),
  readOneConversation: PUT(`${baseUrl}/conversations/:fkConversationId/readAt`),
  // deleteOneCategory: DELETE(`${baseUrl}/categories/:categoryId`),

  /****************** Albums route */
  getAlbums: GET(`${baseUrl}/albums`),
  createOneAlbum: POST(`${baseUrl}/albums`),
  updateOneAlbum: PUT(`${baseUrl}/albums/:albumId`),
  deleteOneAlbum: DELETE(`${baseUrl}/albums/:albumId`),

  /****************** UserAddress route */
  getOneUserAddress: GET(`${baseUrl}/user-address`),
  createOneUserAddress: POST(`${baseUrl}/user-address`),
  updateOneUserAddress: PUT(`${baseUrl}/user-address/:userAddressId`),
  deleteOneUserAddress: DELETE(`${baseUrl}/user-address/:userAddressId`),

  /****************** Donations route */
  getOneDonation: GET(`${baseUrl}/donations/show/:donationId`),
  updateOneDonation: PUT(`${baseUrl}/donations/:donationId`),

  /****************** ContactUs route */
  createOneContact: POST(`${baseUrl}/contacts`),

  /****************** Uploads route */
  getUploads: GET(`${baseUrl}/uploads`),
  updateOneUpload: PUT(`${baseUrl}/uploads/update`),

  /****************** Products route */
  getProducts: GET(`${baseUrl}/products`),
  createOneProduct: POST(`${baseUrl}/products`),
  updateOneProduct: PUT(`${baseUrl}/products/:productId`),
  getOneProduct: GET(`${baseUrl}/products/view`),
  deleteOneProduct: DELETE(`${baseUrl}/products/:productId`),

  /****************** Memberships route */
  getMemberships: GET(`${baseUrl}/memberships`),
  getOneMembership: GET(`${baseUrl}/memberships/view`),
  createOneMembership: POST(`${baseUrl}/memberships`),
  updateOneMembership: PUT(`${baseUrl}/memberships/:membershipId`),
  deleteOneMembership: DELETE(`${baseUrl}/memberships/:membershipId`),

  /****************** Payments route */
  getOnePaymentsStripeClientSecret: GET(
    `${baseUrl}/payments/stripe/client-secret`,
  ),
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
  createOnePaymentsStripeShop: POST(`${baseUrl}/payments/stripe/shop`),
  createOnePaymentsPaypalCommission: POST(
    `${baseUrl}/payments/paypal/commission`,
  ),
  createOnePaymentsStripeCommission: POST(
    `${baseUrl}/payments/stripe/commission`,
  ),
  createOnePaymentsCreate: POST(`${baseUrl}/payments/create`),
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
