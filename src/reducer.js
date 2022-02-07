export const initialState = {
  basket: [],
  user: null,
};
export const getBasketTotal = (basket) =>
  JSON.parse(localStorage.getItem("basket"))?.reduce(
    (amount, item) => item.price + amount,
    0
  );

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      localStorage.setItem(
        "basket",
        JSON.stringify([...state.basket, action.item])
      );
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_FROM_BASKET":
      const index = JSON.parse(localStorage.getItem("basket")).findIndex(
        (e) => e.id == action.id
      );
      let newBasket = [...JSON.parse(localStorage.getItem("basket"))];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`can't remove product (id: ${action.id}) as
            it's not in the basket`);
      }
      localStorage.setItem("basket", JSON.stringify(newBasket));
      return { ...state, basket: newBasket };
      case "REMOVE_ALL":
        return{
          ...state,basket:[]
        }
        
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
export default reducer;

/*reducer: we use it to push the data from product component after action(add to cart) to the datalayer
and then from the datalayer to the cart
*/
