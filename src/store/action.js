export const loginUser = (userData) => ({
    type: 'LOGIN_USER',
    payload: userData,
  });
  
  export const updatePrices = (newPrices) => ({
    type: 'UPDATE_PRICES',
    payload: newPrices,
  })