import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['email','password'],
  loginSuccess: ['payload'],
  loginFailure: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  email:'',
  password:'',
  successT:false,
  errorMsg:'Wrong',
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const LoginSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state = INITIAL_STATE, { email,password }) => {

    const { errorMsg } = "Invalid Credentials";
    if(email==='Shardul710@gmail.com' && password==="123@abc"){
      console.tron.log('hey')
      return state.merge({ successT:true,errorMsg:'Correct'})      
    }else{
      return state.merge({ successT:false,errorMsg:'Wrong'})
    }
    //state.merge({ fetching: true, data, payload: null })
}

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })



/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure
})
