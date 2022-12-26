import * as types from "./actionType";
import axios from "axios";
const getData = () => (dispatch) => {
  dispatch({ type: types.GET_DATA_R });
  return axios
    .get("https://pbl-6-2nd-shop-k348.vercel.app/product/allProd")
    .then((res) => {
      console.log(res.data);
      dispatch({ type: types.GET_DATA_S, payload: res.data });
    })
    .then((err) => {
      dispatch({ type: types.GET_DATA_F });
    });
};
// const updateData = (id, payload) => (dispatch) => {
//   dispatch({ type: types.UPDATE_DATA_R });
//   return axios
//     .patch(`https://nareshrajput-sportsk.up.railway.app/allproducts/${id}`, payload)
//     .then((res) => {
//       dispatch({ type: types.UPDATE_DATA_S });
//     })
//     .catch((err) => {
//       dispatch({ type: types.UPDATE_DATA_F });
//     });
// };
const deleteData = (id) => (dispatch) => {
  dispatch({ type: types.DELETE_DATA_R });
  return axios
    .delete(`https://pbl-6-2nd-shop-k348.vercel.app/product/delProd/${id}`)
    .then((res) => {
      dispatch({ type: types.DELETE_DATA_S });
    })
    .catch((err) => {
      dispatch({ type: types.DELETE_DATA_F });
    });
};
export { getData, deleteData };
//https://desktime-tanner-redux.herokuapp.com/allproducts
