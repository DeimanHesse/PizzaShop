import { IUser } from "../models/IUser";
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface ProductState {
    products: IUser[];
}

const initialState: UsState = {
    user: []
}

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            // name: 'D',
            // role: '',
            // userId: '',
            // auth: false,
        },
        pagesSlider: true,
        hostname:''
        
    },

    reducers: {

        //эти функции просто возвращают пэйлоад, который потом попадает в Hydrate
        addUser(state, action, type) {
      
        console.log('userPayload', action.payload)
        // state.user.auth = true;
        // return action.payload;    
        console.log('state', state) 
        state = {...state, user:{
            name: action.payload.name, 
            auth : true, 
            role: action.payload.roles[0].value,
            userId: action.payload.id,
            phoneNumber: action.payload.phoneNumber
        }};
        // return user;     
        console.log('state', state)   
        return state;
        }, 


        exit(state, action) {
            // console.log('drinksPayload', action.payload)
            // state.drinks = [...action.payload.drinks];
            // return state;
            const r = {...state.user, ...{auth : action.payload}};
            return r; 
        }, 
        checkSlider(state, action) {
            console.log('payloadSlider', action.payload)
            state.pagesSlider = action.payload;
        },

        addEnv(state, action) {
         
            state.hostname = action.payload;
        },



    
    },

    //сюда в качестве payload попадает стейт...точнее то, что возвращаетс из функций выше
    extraReducers: {
        //сюда поступает стейт и преобразованный функциями выше стейт
        [HYDRATE]: (state, action) => {
            // console.log('userHydratePayload', action.payload)
            // return{...state, ...{user : {name: action.payload.name, auth: false, role: action.payload.role}}};
            // return {...action.payload.user};
        }
      }
});

export const {addUser, addEnv, exit, checkSlider} = UserSlice.actions;

export default UserSlice.reducer;