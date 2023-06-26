import { initialState } from "../../components/utils";
import { GET_BRANDS, GET_NOTIFICATION } from "../actions/app.actions";
import { GET_LATEST_PRODUCTS } from "../actions/app.actions";
import { GET_POPULAR_PRODUCTS } from "../actions/app.actions";
import { GET_SINGLE_PRODUCTS } from "../actions/app.actions";
import { GET_UPCOMING_PRODUCTS } from "../actions/app.actions";
import { GET_TRENDING_PRODUCTS } from "../actions/app.actions";
import { GET_PRODUCT_BY_BRAND } from "../actions/app.actions";
import { GET_POPULAR_COMPARISION } from "../actions/app.actions";
import { GET_COMPARE_TWO_PRODUCTS } from "../actions/app.actions";
import { GET_COMPARE_THIS_PRODUCTS } from "../actions/app.actions";
import { GET_COMPARE_TO_PRODUCTS } from "../actions/app.actions";
import { GET_ALL_PRODUCTS_LIST } from "../actions/app.actions";
import { GET_FILTERS } from "../actions/app.actions";
import { GET_BLOGS } from "../actions/app.actions";
import { GET_SINGLE_BLOG } from "../actions/app.actions";
import { GET_SLIDER } from "../actions/app.actions";
import {
  GET_MAX_COUNT_BLOG,
  FILTER_MOBILES,
  RESET_FILTER_MOBILES,
  RESET_LOGIN,
  RESET_LOGOUT
} from "../actions/app.actions";
import { GET_ADVERTISEMENT } from "../actions/app.actions";
import { REGISTER } from "../actions/app.actions";
import { LOGIN } from "../actions/app.actions";
import { LOGOUT } from "../actions/app.actions";
import { POST_COMMENTS } from "../actions/app.actions";
import { GET_LIKE_DISLIKE_COMMENTS } from "../actions/app.actions";
import { PRICE_WISE_PRODUCTS } from "../actions/app.actions";
import { GET_CURRENCY } from "../actions/app.actions";
import { GET_CHANGE_PRODUCTS_RATE } from "../actions/app.actions";
import { SENT_CONTACT_US_MESSAGE } from "../actions/app.actions";
import { GET_SEARCH_LIST } from "../actions/app.actions";
import { GET_SEARCH_PRODUCT } from "../actions/app.actions";
import { SEND_NEWS_LATTER } from "../actions/app.actions";

export let appState = {
  brands: { ...initialState },
  latestProducts: { ...initialState },
  popularProducts: { ...initialState },
  singleProducts: { ...initialState },
  upcomingProducts: { ...initialState },
  trendingProducts: { ...initialState },
  productByBrand: { ...initialState },
  popularComparision: { ...initialState },
  compareTwoProducts: { ...initialState },
  compareThisProducts: { ...initialState },
  compareToProducts: { ...initialState },
  allProductsList: { ...initialState },
  filters: { ...initialState },
  blogs: { ...initialState },
  singleBlog: { ...initialState },
  slider: { ...initialState },
  maxCountBlog: { ...initialState },
  filterMobilesResponse: { ...initialState },
  advertisement: { ...initialState },
  registerResponse: { ...initialState },
  loginResponse: { ...initialState },
  logoutResponse: { ...initialState },
  commentsResponse: { ...initialState },
  likeDislikeComments: { ...initialState },
  priceWiseProductsResponse: { ...initialState },
  notification: { ...initialState },
  currency: { ...initialState },
  changeProductsRate: { ...initialState },
  sentContactUsMessageResponse: { ...initialState },
  searchList: { ...initialState },
  searchProduct: { ...initialState },
  sendNewsLatterResponse: { ...initialState },
};

export default function appReducer(state = appState, action) {
  const setData = (key, allData) => {
    const { ld, er, dt } = allData;
    const loading = ld ? ld : false;
    const error = er ? er : false;
    const data = dt ? dt : false;
    state = {
      ...state,
      [key]: { ...state[key], loading, error, data },
    };
    return state;
  };

  const resetData = (key, allData) => {
    const { loading, error, data } = allData;
    let setNewData = {};
    setNewData.loading = loading !== "NO_RESET" ? loading : state[key].loading;
    setNewData.error = error !== "NO_RESET" ? error : state[key].error;
    setNewData.data = data !== "NO_RESET" ? data : state[key].data;
    state = {
      ...state,
      [key]: setNewData,
    };
    return state;
  };

  switch (action.type) {
    // SET DATA
    case GET_BRANDS:
      return setData("brands", { ...action?.response });
    case GET_LATEST_PRODUCTS:
      return setData("latestProducts", { ...action?.response });
    case GET_POPULAR_PRODUCTS:
      return setData("popularProducts", { ...action?.response });
    case GET_SINGLE_PRODUCTS:
      return setData("singleProducts", { ...action?.response });
    case GET_UPCOMING_PRODUCTS:
      return setData("upcomingProducts", { ...action?.response });
    case GET_TRENDING_PRODUCTS:
      return setData("trendingProducts", { ...action?.response });
    case GET_PRODUCT_BY_BRAND:
      return setData("productByBrand", { ...action?.response });
    case GET_POPULAR_COMPARISION:
      return setData("popularComparision", { ...action?.response });
    case GET_COMPARE_TWO_PRODUCTS:
      return setData("compareTwoProducts", { ...action?.response });
    case GET_COMPARE_THIS_PRODUCTS:
      return setData("compareThisProducts", { ...action?.response });
    case GET_COMPARE_TO_PRODUCTS:
      return setData("compareToProducts", { ...action?.response });
    case GET_ALL_PRODUCTS_LIST:
      return setData("allProductsList", { ...action?.response });
    case GET_FILTERS:
      return setData("filters", { ...action?.response });
    case GET_BLOGS:
      return setData("blogs", { ...action?.response });
    case GET_SINGLE_BLOG:
      return setData("singleBlog", { ...action?.response });
    case GET_SLIDER:
      return setData("slider", { ...action?.response });
    case GET_MAX_COUNT_BLOG:
      return setData("maxCountBlog", { ...action?.response });
    case FILTER_MOBILES:
      return setData("filterMobilesResponse", { ...action?.response });
    case RESET_FILTER_MOBILES:
      return resetData("filterMobilesResponse", action.data);
    case GET_ADVERTISEMENT:
      return setData("advertisement", { ...action?.response });
    case REGISTER:
      return setData("registerResponse", { ...action?.response });
    case LOGIN:
      return setData("loginResponse", { ...action?.response });
    case LOGOUT:
      return setData("logoutResponse", { ...action?.response });
    case POST_COMMENTS:
      return setData("commentsResponse", { ...action?.response });
    case GET_LIKE_DISLIKE_COMMENTS:
      return setData("likeDislikeComments", { ...action?.response });
    case PRICE_WISE_PRODUCTS:
      return setData("priceWiseProductsResponse", { ...action?.response });
    case GET_NOTIFICATION:
      return setData("notification", { ...action?.response });
    case GET_CURRENCY:
      return setData("currency", { ...action?.response });
    case SENT_CONTACT_US_MESSAGE:
      return setData("sentContactUsMessageResponse", { ...action?.response });
    case GET_SEARCH_LIST:
      return setData("searchList", { ...action?.response });
    case GET_SEARCH_PRODUCT:
      return setData("searchProduct", { ...action?.response });
    case SEND_NEWS_LATTER:
      return setData("sendNewsLatterResponse", { ...action?.response });
    case RESET_LOGIN:
      return resetData("loginResponse", action.data);
    case RESET_LOGOUT:
      return resetData("logoutResponse", action.data);
    default:
      return state;
  }
}
