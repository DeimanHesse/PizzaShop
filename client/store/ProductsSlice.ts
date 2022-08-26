import { IUser } from "../models/IUser";
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface ProductState {
    products: IUser[];
}

const initialState: UsState = {
    products: []
}

const ProductsSlice = createSlice({
    name: 'products',
    initialState: {
        pizzas: [],
        drinks: [],
        desserts: [],
        snacks: []
    },

    reducers: {

        //PIZZAS
        //3 эти функции можно заменить одной
        addPizzas(state, action) {
            state.pizzas = action.payload.pizzas;
            // return action.payload;
        }, 
        
        addOnePizza(state, action) {
            state.pizzas.push(action.payload)
            // return state;
        },

        redactPizza(state, action) {
            state.pizzas[action.payload.index] = action.payload.data[0];
            return state;
        },

        deletePizza(state, action) {
            state.pizzas = state.pizzas.filter(pizza => pizza.id !== action.payload)
            return state;
        },

        //DRINKS
        addDrinks(state, action) {
            state.drinks = action.payload.drinks;
        }, 
         //эти нужно продумать
        addOneDrink(state, action) {
            state.drinks.push(action.payload)
            // return state;
        },
        
        redactDrink(state, action) {
            state.drinks[action.payload.index] = action.payload.data[0];
            return state;
        },

        deleteDrink(state, action) {
            state.drinks = state.drinks.filter(drink => drink.id !== action.payload)
            return state;
        },

        //эти функции просто возвращают пэйлоад, который потом попадает в Hydrate
   

        //SNACKS
        addSnacks(state, action) {
           state.snacks = action.payload.snacks;
            // return action.payload;
        }, 

        addOneSnack(state, action) {
            state.snacks.push(action.payload)
            // return state;
        },

        redactSnack(state, action) {
            state.snacks[action.payload.index] = action.payload.data[0];
            return state;
        },

        deleteSnack(state, action) {
            state.snacks = state.snacks.filter(snack => snack.id !== action.payload)
            return state;
        },


        //DESSERTS
        addDesserts(state, action) {
           state.desserts = action.payload.desserts;
            // return action.payload;
        }, 

        addOneDessert(state, action) {
            state.desserts.push(action.payload)
            // return state;
        },

        redactDessert(state, action) {
            state.desserts[action.payload.index] = action.payload.data[0];
            return state;
        },

        deleteDessert(state, action) {
            state.desserts = state.desserts.filter(dessert => dessert.id !== action.payload)
            return state;
        },

},

    extraReducers: {
        //сюда поступает стейт и преобразованный функциями выше стейт
        [HYDRATE]: (state, action) => {

            // console.log('productsHydratePayload', action.payload)
            return action.payload.products
            // return {...action.payload.products};
            // return {...state,...action.payload.products};
            // return {...state, action.payload};
            // state = action.payload;
           
        }
      }
});

export const {
    addPizzas, redactPizza, deletePizza,addOnePizza,
    addDrinks, redactDrink, deleteDrink, addOneDrink,
    addSnacks, redactSnack, deleteSnack,addOneSnack,
    addDesserts, redactDessert, deleteDessert,addOneDessert,
} = ProductsSlice.actions;

export default ProductsSlice.reducer;