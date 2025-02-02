import axios from 'axios';
import axiosRetry from 'axios-retry';
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
  axiosRetry(axios, { retries: 3 });
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
  authGoogleUser: POST(`${baseUrl}/auth-google-auth`),
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

  /****************** Profile route */
  updateOneProfileNextStep: PUT(`${baseUrl}/profile/update/:userId`),
  updateOneProfile: PUT(`${baseUrl}/users/update/profile`),
  updateEnableProfile: PUT(`${baseUrl}/users/update/enable/:profileId`),
  updateUpdatePassword: PUT(`${baseUrl}/users/update-password`),
  getOneProfile: GET(`${baseUrl}/users/profile/show/:profileId`),

  /****************** Transaction route */
  getTransactions: GET(`${baseUrl}/transactions`),
  getOneBuyerTransaction: GET(`${baseUrl}/transactions/:transactionId/buyer`),
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
  getOrders: GET(`${baseUrl}/orders`),
  getOrderItems: GET(`${baseUrl}/orders/order-items`),
  getOneOrderItem: GET(`${baseUrl}/orders/order-items/view`),
  getOneOrderItemPublic: GET(`${baseUrl}/orders/order-items/public`),
  updateOneOrderItem: PUT(`${baseUrl}/orders/order-items/:orderItemId`),

  /****************** Currency or Countries route */
  getAllCurrencies: GET(`${baseUrl}/currencies`),
  getAllCounties: GET(`${baseUrl}/countries`),

  /****************** Affiliations route */
  getOneAffiliation: GET(`${baseUrl}/affiliations/view`),
  getAffiliations: GET(`${baseUrl}/affiliations`),
  getAffiliationsActivities: GET(`${baseUrl}/affiliations/activity`),

  /****************** Follows route */
  getFollowers: GET(`${baseUrl}/follows/followers`),
  getFollowings: GET(`${baseUrl}/follows/followings`),
  createOneFollowers: POST(`${baseUrl}/follows/create/:followerId`),
  deleteOneFollowers: POST(`${baseUrl}/follows/delete/:followerId`),

  /****************** Comments route */
  getComments: GET(`${baseUrl}/comments`),
  getCommentsRepliesAPI: GET(`${baseUrl}/comments/replies`),
  createOneComment: POST(`${baseUrl}/comments`),
  createOneCommentReply: POST(`${baseUrl}/comments/replies`),
  updateOneComment: PUT(`${baseUrl}/comments/:commentId`),
  deleteOneComment: DELETE(`${baseUrl}/comments/:commentId`),

  /****************** Conversations route */
  getConversations: GET(`${baseUrl}/conversations`),
  getOneConversation: GET(`${baseUrl}/conversations/:fkConversationId`),
  getConversationsMessages: GET(
    `${baseUrl}/conversations/messages/:fkConversationId`,
  ),
  createOneConversationMessage: POST(`${baseUrl}/conversations/messages`),
  createOneConversation: POST(`${baseUrl}/conversations`),
  readOneConversation: PUT(`${baseUrl}/conversations/:fkConversationId/readAt`),

  /****************** UserAddress route */
  getOneUserAddress: GET(`${baseUrl}/user-address`),
  createOneUserAddress: POST(`${baseUrl}/user-address`),
  updateOneUserAddress: PUT(`${baseUrl}/user-address/:userAddressId`),
  deleteOneUserAddress: DELETE(`${baseUrl}/user-address/:userAddressId`),

  /****************** ContactUs route */
  createOneContact: POST(`${baseUrl}/contacts`),

  /****************** Uploads route */
  getUploads: GET(`${baseUrl}/uploads`),
  updateOneUpload: PUT(`${baseUrl}/uploads/update`),
  downloadOneUploads: GET(`${baseUrl}/uploads/download/:folder/:fileName`),

  /****************** Products route */
  getProducts: GET(`${baseUrl}/products`),
  getFollowsProducts: GET(`${baseUrl}/products/follows`),
  getOneProduct: GET(`${baseUrl}/products/view`),

  /****************** Events route */
  getEvents: GET(`${baseUrl}/events`),
  getFollowsEvents: GET(`${baseUrl}/events/follows`),
  getOneEvent: GET(`${baseUrl}/events/view/:slugOrId`),

  /****************** Ticket route */
  getTickets: GET(`${baseUrl}/tickets`),

  /****************** EventDate route */
  getEventDates: GET(`${baseUrl}/event-dates`),
  getOneEventDate: GET(`${baseUrl}/event-dates/view/:id`),

  /****************** Statistic route */
  getStatisticsAffiliationsActivities: GET(
    `${baseUrl}/statistics/affiliation-activities`,
  ),

  /****************** Payments route */
  getOnePaymentsStripeClientSecret: GET(
    `${baseUrl}/payments/stripe/client-secret`,
  ),
  getPayments: GET(`${baseUrl}/payments`),
  getPaymentsPayoutSetup: GET(`${baseUrl}/payments/payout-setup`),
  createOnePaymentsPaypalShop: POST(`${baseUrl}/payments/paypal/shop`),
  createOnePaymentsStripeShop: POST(`${baseUrl}/payments/stripe/shop`),
  createOnePaymentsStripeCheckoutSessionEvent: POST(
    `${baseUrl}/payments/stripe/checkout-session/event`,
  ),
  confirmPaymentsStripeCheckoutSessionEvent: POST(
    `${baseUrl}/payments/stripe/confirm-checkout-session/event/:token`,
  ),
  createOnePaymentsPaypalEvent: POST(`${baseUrl}/payments/paypal/event`),
  createOnePaymentsStripeEvent: POST(`${baseUrl}/payments/stripe/event`),
  createOnePaymentsFreeEvent: POST(`${baseUrl}/payments/free/event`),
  createOnePaymentsBookingEvent: POST(`${baseUrl}/payments/booking/event`),
  createOnePaymentsCreate: POST(`${baseUrl}/payments/create`),
  deleteOnePayment: DELETE(`${baseUrl}/payments/:paymentId`),
  createOnePaymentsSellerWithdrawals: POST(`${baseUrl}/payments/withdrawals`),
  getPaymentsWithdrawals: GET(`${baseUrl}/withdrawals`),
};
