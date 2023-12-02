const initialState = {
    user: null,
    prices: null,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_USER':
        return { ...state, user: action.payload };
      case 'UPDATE_PRICES':
        return { ...state, prices: action.payload };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  