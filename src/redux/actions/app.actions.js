import { apiAction } from "./default.actions";
export const GET_BRANDS = "GET_BRANDS";
export const GET_LATEST_PRODUCTS = "GET_LATEST_PRODUCTS";
export const GET_POPULAR_PRODUCTS = "GET_POPULAR_PRODUCTS";
export const GET_SINGLE_PRODUCTS = "GET_SINGLE_PRODUCTS";
export const GET_UPCOMING_PRODUCTS = "GET_UPCOMING-PRODUCTS";
export const GET_TRENDING_PRODUCTS = "GET_TRENDING-PRODUCTS";
export const GET_PRODUCT_BY_BRAND = "GET_PRODUCT_BY_BRAND";
export const GET_POPULAR_COMPARISION = "GET_POPULAR_COMPARISION";
export const GET_COMPARE_TWO_PRODUCTS = " GET_COMPARE_TWO_PRODUCTS";
export const GET_COMPARE_THIS_PRODUCTS = " GET_COMPARE_THIS_PRODUCTS";
export const GET_COMPARE_TO_PRODUCTS = "GET_COMPARE_TO_PRODUCTS";
export const GET_ALL_PRODUCTS_LIST = "GET_ALL_PRODUCTS_LIST";
export const GET_FILTERS = "GET_FILTERS";
export const GET_BLOGS = "GET_BLOGS";
export const GET_SINGLE_BLOG = "GET_SINGLE_BLOG";
export const GET_SLIDER = "GET_SLIDER";
export const GET_MAX_COUNT_BLOG = "GET_MAX_COUNT_BLOG";
export const FILTER_MOBILES = "FILTER_MOBILES";
export const RESET_FILTER_MOBILES = "RESET_FILTER_MOBILES";
export const GET_ADVERTISEMENT = "GET_ADVERTISEMENT";
export const REGISTER = "REGISTER";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const POST_COMMENTS = "POST_COMMENTS";
export const GET_LIKE_DISLIKE_COMMENTS = "GET_LIKE_DISLIKE_COMMENTS";
export const PRICE_WISE_PRODUCTS = "PRICE_WISE_PRODUCTS";
export const GET_NOTIFICATION = "GET_NOTIFICATION";
export const GET_CURRENCY = "GET_CURRENCY";
export const GET_CHANGE_PRODUCTS_RATE = "GET_CHANGE_PRODUCTS_RATE";
export const SENT_CONTACT_US_MESSAGE = "SENT_CONTACT_US_MESSAGE";
export const GET_SEARCH_LIST = "GET_SEARCH_LIST";
export const GET_SEARCH_PRODUCT = "GET_SEARCH_PRODUCT";
export const SEND_NEWS_LATTER = "SEND_NEWS_LATTER";
export const RESET_LOGIN = "RESET_LOGIN";
export const RESET_LOGOUT = "RESET_LOGOUT";

export function getBrands() {
  return apiAction({
    path: "public/api/brands",
    label: GET_BRANDS,
  });
}

export function getLatestProducts() {
  return apiAction({
    path: "public/api/products",
    label: GET_LATEST_PRODUCTS,
  });
}

export function getPopularProducts() {
  return apiAction({
    path: "public/api/popular",
    label: GET_POPULAR_PRODUCTS,
  });
}

export function getSingleProducts(slug) {
  return apiAction({
    path: `public/api/product/${slug}`,
    label: GET_SINGLE_PRODUCTS,
  });
}

export function getUpcomingProducts() {
  return apiAction({
    path: `public/api/upcoming`,
    label: GET_UPCOMING_PRODUCTS,
  });
}

export function getTrendingProducts() {
  return apiAction({
    path: `public/api/trending`,
    label: GET_TRENDING_PRODUCTS,
  });
}

export function getProductByBrand(slug) {
  return apiAction({
    path: `public/api/brands/product/${slug}`,
    label: GET_PRODUCT_BY_BRAND,
  });
}

export function getPopularComparision() {
  return apiAction({
    path: `public/api/mulitple_products`,
    label: GET_POPULAR_COMPARISION,
  });
}

export function getCompareTwoProducts(slug, slug1) {
  return apiAction({
    path: `public/api/compare/${slug}/${slug1}`,
    label: GET_COMPARE_TWO_PRODUCTS,
  });
}

export function getCompareThisProducts(slug) {
  return apiAction({
    path: `public/api/compare_this/${slug}`,
    label: GET_COMPARE_THIS_PRODUCTS,
  });
}

export function getCompareToProducts(slug) {
  return apiAction({
    path: `public/api/compare_to/${slug}`,
    label: GET_COMPARE_TO_PRODUCTS,
  });
}

export function getAllProductsList() {
  return apiAction({
    path: `public/api/get_products`,
    label: GET_ALL_PRODUCTS_LIST,
  });
}

export function getFilters() {
  return apiAction({
    path: `public/api/filters`,
    label: GET_FILTERS,
  });
}

export function getBlogs() {
  return apiAction({
    path: `public/api/get_blogs`,
    label: GET_BLOGS,
  });
}

export function getSingleBlog(slug) {
  return apiAction({
    path: `public/api/blog/${slug}`,
    label: GET_SINGLE_BLOG,
  });
}

export function getSlider() {
  return apiAction({
    path: `public/api/slides`,
    label: GET_SLIDER,
  });
}

export function getMaxCountBlog() {
  return apiAction({
    path: `public/api/max_blogs`,
    label: GET_MAX_COUNT_BLOG,
  });
}

export function filterMobiles(data) {
  return apiAction({
    path: `public/api/phone_finder`,
    label: FILTER_MOBILES,
    method: "POST",
    data,
  });
}

export function resetFilterMobiles(data) {
  return {
    type: RESET_FILTER_MOBILES,
    data,
  };
}

export function resetLogin(data) {
  return {
    type: RESET_LOGIN,
    data
  }
}

export function resetLogot(data) {
  return {
    type: RESET_LOGOUT,
    data
  }
}

export function getAdvertisement(data) {
  return apiAction({
    path: `public/api/ads`,
    label: GET_ADVERTISEMENT,
  });
}

export function register(data) {
  return apiAction({
    path: `public/api/register`,
    label: REGISTER,
    method: "POST",
    data,
  });
}

export function login(data) {
  return apiAction({
    path: `public/api/login`,
    label: LOGIN,
    method: "POST",
    data,
  });
}

export function logout(data) {
  return apiAction({
    path: `public/api/logout`,
    label: LOGOUT,
    method: "POST",
    data,
  });
}

export function postComments(data) {
  return apiAction({
    path: `public/api/comments_save`,
    label: POST_COMMENTS,
    method: "POST",
    data,
  });
}
export function postBlogComments(data) {
  return apiAction({
    path: `public/api/comments_save`,
    label: POST_COMMENTS,
    method: "POST",
    data,
  });
}

export function getLikeDislikeComments(data) {
  return apiAction({
    path: `public/api/save-likedislike/${data.id}/${data.type}`,
    label: GET_LIKE_DISLIKE_COMMENTS,
  });
}

export function priceWiseProducts(data) {
  let path = `public/api/product_price_finder?from=${data?.from}&to=${data?.to}${data?.ram ? `&ram=${data?.ram}` : ''}`
  if (data?.filters) {
    path = `public/api/phone_finder`
  }
  if (data?.under) {
    path = `public/api/browse_budget/${data?.under}`
  }
  return apiAction({
    path,
    label: PRICE_WISE_PRODUCTS,
    method: data?.under ? "GET" : "POST",
    data,
  });
}

export function getNotification() {
  return apiAction({
    path: `public/api/notifications`,
    label: GET_NOTIFICATION,
  });
}

export function getCurrency() {
  return apiAction({
    path: `public/api/currency`,
    label: GET_CURRENCY,
  });
}

export function getChangeProductRate() {
  return apiAction({
    path: `public/api/currency_price/1`,
    label: GET_CHANGE_PRODUCTS_RATE,
  });
}

export function sentContactUsMessage(data) {
  return apiAction({
    path: `public/api/send_message`,
    label: SENT_CONTACT_US_MESSAGE,
    method: "POST",
    data,
  });
}

export function getSearchList() {
  return apiAction({
    path: `public/api/search_lists`,
    label: GET_SEARCH_LIST,
  });
}

export function getSearchProduct(data) {
  return apiAction({
    path: `public/api/product/search/${data?.search}`,
    label: GET_SEARCH_PRODUCT,
  });
}

export function sendNewsLatter(data) {
  return apiAction({
    path: `public/api/newslatter/store`,
    label: SEND_NEWS_LATTER,
    method: "POST",
    data,
  });
}
