import { IUser } from "../models/IUser";
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface ProductState {
    products: IUser[];
}

const initialState: UsState = {
    products: [],
    archive: []
}

const OrdersSlice = createSlice({
    name: 'orders',
    initialState: {
        active: [],
        archive: [],
        
    },

    reducers: {
        addOrdersActive(state, action) {
            state.active = action.payload;
        }, 

        updateOrdersActive(state, action) {
            console.log('AAAAAAAA', action.payload)
            if (action.payload.status === "done") {
                state.active = state.active.filter((item) => item.id !== action.payload.id);
                // console.log("storeinstore", arr)
            } else {
                let arr = state.active.forEach((item) => {
                    if (item.id === action.payload.id) {
                        item.status = action.payload.status;
                    }
                });
            }
          
        },
         //эти нужно продумать
        addOrdersArchive(state, action) {
            state.archive = action.payload;
        },
    },

    extraReducers: {
        //сюда поступает стейт и преобразованный функциями выше стейт
        [HYDRATE]: (state, action) => {

           
        }
      }
});

export const {addOrdersActive, addOrdersArchive, updateOrdersActive} = OrdersSlice.actions;

export default OrdersSlice.reducer;