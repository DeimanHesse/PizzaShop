import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { store } from "../store/store";

import { wrapper } from "../store/store";
import { FC, useEffect } from "react";


import { addUser} from "../store/UsersSlice";
import { useDispatch, useSelector } from "react-redux";

import jwtDecode from "jwt-decode";

import 'swiper/scss';
import 'swiper/css/navigation';

// import Router from 'next/router';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
   
    // console.log('process.env.HOSTNAME',process.env.HOST)
    const arr = [];
    const dispatch = useDispatch()

    const findUser = async () => {
        let user = await localStorage.getItem('user');
        if (user) {
            user = jwtDecode(user);
     

        //здесь пользователь либо будет попадать в стор, либо будет выводиться ошибка
        // "неверный логин или пароль"

        dispatch(addUser(user));
        }
        
    } 

    useEffect(() => {
        findUser();

    },[])
    
    

   
    return (
        <Layout>
           <Component {...pageProps} />
        </Layout>
    );
};

export default wrapper.withRedux(MyApp);

