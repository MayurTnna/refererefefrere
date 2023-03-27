
import { fetchData } from "../../api/api";
import { FETCH_POST_START, FETCH_POST_SUCCESS, FETCH_POST_FAIL } from "../content";

export const fetchPostStart = () => ({
    type: FETCH_POST_START
})

export const fetchPostSuccess = (posts) => ({
    type: FETCH_POST_SUCCESS,
    payload: posts

})

export const fetchPostFail = (error) => ({
    type: FETCH_POST_FAIL,
    payload: error
})


export function fetchposts(skip=0) {
    return function (dispatch) {
        dispatch(fetchPostStart())
            fetchData(skip)
            .then((responce) => {
                const posts = responce.data
                dispatch(fetchPostSuccess(posts))
            })
            .catch((error) => {
                dispatch(fetchPostFail(error.message));
            })

    }
}