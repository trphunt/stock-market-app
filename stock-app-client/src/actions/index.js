/*global fetch Headers*/
export const userLogout = () => ({
  type: "USER_LOGOUT"
});

export const authenticateUser = currentUser => ({
  type: "AUTHENTICATE_USER",
  currentUser
});

const authRequest = (authInfo, url) => {
  return fetch(url, {
    method: "post",
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(authInfo)
  })
    .then(resp => {
      if (!resp.ok) {
        if (resp.status >= 400 && resp.status < 500) {
          return resp.json().then(data => {
            let err = {authErrorMessage: data.message};
            throw err;
          });
        } else {
          let err = {authErrorMessage: "Please try again later.  Server not responding."};
          throw err;
        }
      }
      return resp.json();
    });
};

export const signUp = (authInfo) => (
  (dispatch, getState) => (
    authRequest(authInfo, '/api/auth/signup')
      .then(currentUser => dispatch(authenticateUser(currentUser)))
  )
);

export const signIn = (authInfo) => (
  (dispatch, getState) => (
    authRequest(authInfo, '/api/auth/signin')
      .then(currentUser => dispatch(authenticateUser(currentUser)))
  )
);

export const loadStocks = (stocks) => ({
  type: "LOAD_STOCKS",
  stocks
});


/*export const fetchPrice = (stock) => {
  
  alpha.data.intraday(stock.symbol).then(data => {
  return data["Time Series (1min)"][data["Meta Data"]["3. Last Refreshed"]]["4. close"];
  }).then(price => {
    
  });
};

export const fetchPrices = () => (
  dispatch => (
    alpha.data.intrastock(stock.symbol)
    alpha.data["Time Series (1min)"][data["Meta Data"]["3. Last Refreshed"]]["4. close"]
      .then()
  )  
)*/

export const FETCH_PRICE = 'FETCH_PRICE';

export const fetchPrice = (stock) => {
  const alpha = require('alphavantage')({key: 'ILFTJ1P130K0UMMN'});
  const request = alpha.data.intraday(stock.symbol);
  console.log(request);
  
  return {
    type: FETCH_PRICE,
    payload: request
  };
};

export const fetchStocks = () => (
  dispatch => (
    fetch(`/api/stocks`)
      .then(data => data.json())
      .then(s => {
        let stocks = s.map(s => {
          return {
            id: s._id,
            createdAt: s.createdAt,
            symbol: s.symbol
          };
        });
        return dispatch(loadStocks(stocks));
      })
  )
);

export const addStock = stock => ({
  type: "ADD_STOCK",
  stock
});

export const postNewStock = (symbol) => (
  (dispatch, getState) => {
    let {currentUser} = getState();
    if (!currentUser) { return Promise.resolve(); }

    const {userId, token} = currentUser;
    const url = `/api/users/${userId}/stocks`;
    return fetch(url, {
      method: "post",
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      body: JSON.stringify({symbol})
    })
      .then(resp => {
        if (!resp.ok) {
          if (resp.status >= 400 && resp.status < 500) {
            return resp.json().then(data => {
              let err = {errorMessage: data.message};
              throw err;
            });
          } else {
            let err = {errorMessage: "Please try again later.  Server not responding."};
            throw err;
          }
        }
        return resp.json();
      })
      .then(s => {
        let stock = {
          id: s._id,
          createdAt: s.createdAt,
          symbol: s.symbol,
          username: s.userId.username
        };
        return dispatch(addStock(stock));
      });
  }

);
