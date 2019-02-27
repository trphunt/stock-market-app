const stocks = (state=[], action) => {
  switch(action.type) {
    case "LOAD_STOCKS":
      return [...action.stocks];
    case "ADD_STOCK":
      return [action.stock, ...state];
    default:
      return state;
  }
};

export default stocks;