import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { Action } from 'redux';

import DessertsReducer from './DessertsSlice';
import DrinksReducer from './DrinksSlice';
import ProductReducer from './ProductsSlice'; 
import UserReducer from './UsersSlice'; 

import OrdersReducer from './OrdersSlice'
import UsersSlice from './UsersSlice';



const makeStore = () => configureStore({
    reducer: {
        user: UserReducer,
        products: ProductReducer,
        orders: OrdersReducer
       
    },
  
});

// const makeStore = () => configureStore({
//     reducer: {
//         // user: UsersSlice,
//         user: UserReducer,
//         desserts: DessertsReducer,
//         drinks: DrinksReducer
//     },
  
// });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);
