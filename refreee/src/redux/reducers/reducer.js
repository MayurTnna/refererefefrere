import { FETCH_POST_START,FETCH_POST_SUCCESS,FETCH_POST_FAIL } from "../content";


const initialState={
    posts:[],
    loading:false,
    error:null
}

function reducer(state=initialState,action){
    switch(action.type){
        case FETCH_POST_START:
            return{
                ...state,
                loading:true,
                // posts:action.payload
            }
        case FETCH_POST_SUCCESS:
            // console.log(state.posts);
            return{
                ...state,
                loading:false,
                posts:action.payload
            }
        case FETCH_POST_FAIL:
            return{
                ...state,
                loading:false,
                posts:action.payload
            }
        default:
            return{...state}
    }

}

export default reducer