import * as types from "./actionType";
import axios from "axios";

const getMensData = (params) => (dispatch) => {
  dispatch({ type: types.GET_MENS_DATA_R });

  return axios
    .get(
      "https://pbl-6-2nd-shop-k348.vercel.app/product/getByCate?category=apparel"
    )
    .then((res) => {
      dispatch({ type: types.GET_MENS_DATA_S, payload: res.data });
    })
    .then((err) => {
      dispatch({ type: types.GET_MENS_DATA_F });
    });
};

const getWomensData = (params) => (dispatch) => {
  dispatch({ type: types.GET_MENS_DATA_R });

  return axios
    .get(
      "https://pbl-6-2nd-shop-k348.vercel.app/product/getByCate?category=accessories"
    )
    .then((res) => {
      dispatch({ type: types.GET_WOMENS_DATA_S, payload: res.data });
    })
    .then((err) => {
      dispatch({ type: types.GET_MENS_DATA_F });
    });
};
const getShoesData = (params) => (dispatch) => {
  dispatch({ type: types.GET_MENS_DATA_R });
  return axios
    .get("https://pbl-6-2nd-shop-k348.vercel.app/product/getByCate?category=footwear")
    .then((res) => {
      dispatch({ type: types.GET_SHOES_DATA_S, payload: res.data });
    })
    .then((err) => {
      dispatch({ type: types.GET_MENS_DATA_F });
    });
};

// const getHomeData = () => (dispatch) => {
//   dispatch({ type: types.GET_MENS_DATA_R });

//   return axios
//     .get("https://nareshrajput-sportsk.up.railway.app/Homepage")
//     .then((res) => {
//       dispatch({ type: types.GET_HOMEDATA_S, payload: res.data });
//     })
//     .then((err) => {
//       dispatch({ type: types.GET_MENS_DATA_F });
//     });
// };

const getRecommend = (params) => (dispatch) => {
  dispatch({ type: types.GET_MENS_DATA_R });
  console.log("axios:", params);
  return axios
    .post(
      "http://localhost:5000/recommend", params
    )
    .then((res) => {
      console.log("axios recommend: ",res.data, res);
      dispatch({ type: types.GET_REC_DATA_S, payload: res.data });
    })
    .then((err) => {
      dispatch({ type: types.GET_MENS_DATA_F });
    });
};

export { getWomensData, getMensData, getShoesData, getRecommend };