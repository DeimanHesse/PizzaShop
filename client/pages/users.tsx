import Head from "next/head";
import Link from "next/link";
import Heading from "../../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { type } from "os";
import { useEffect, useState } from "react";
import React from 'react';
// import Image from 'next/image'
// import { AppState, wrapper } from '../../store/store';
import type { NextPage } from 'next';

const Users: NextPage = ({}) => { 
    const [usersState, setUsersState] = useState([])
    const getUsers = async () => {
        const token = localStorage.getItem('user')
            const res = await axios.get('http://localhost:5000/users',
                // {
                //     headers: {
                //     'Authorization': `Bearer ${token}` 
                //     }
                // }
            );     
            console.log(res.data)
            res.data.sort
            setUsersState(res.data);
    } 

   useEffect(() => {
        getUsers();
    }, [])

    const ordersSum = (arr) => {
        const ordersSum = arr.reduce(function(sum, elem) {
            //если статус заказа "завершён", то пересчитываем
           
            if (elem?.status === 'done') {
                return sum +  Number(elem?.sum);
            }
           //Когда вы ничего не возвращаете из функции reduce, она возвращает undefined и undefined + 1 === NaN .
            return sum + 0;
        }, 0);   
        console.log('ordersSu', ordersSum)
        return ordersSum;
    }
    

    return (
        <>
            <Head>
                <title>Drinks</title>
            </Head>
            <div style={{width: '100%'}} className="wrapper">
            <div className="_container">
                <h1>Рейтинг пользователей</h1>
                <div className="users">
                {usersState.map((item, index) => (
                      <div key={index} className="user" style={{display:'flex', justifyContent:'space-around'}}>
                        <div className="name">{item.name}</div>
                        <div className="name">{item.phoneNumber}</div>
                        <div className="countOfOrders">{item.orders.length}</div>
                        <div className="name">{item.roles[0].value}</div>
                        <div className="sum"> {ordersSum(item.orders)} Руб</div>
                      </div>
                     ))}
                </div>
            </div>
               
            </div>
        </>
    );
};
  

// export const getServerSideProps = wrapper.getServerSideProps(store => async(context) => {
    // const res = await axios.get('http://localhost:5000/products/drinks');
    // // console.log('serverSide')
    // const drinks = {
    //     drinks: [...res.data]
    // };
    // await store.dispatch(addDrinks(drinks));
    // await store.dispatch(addDrinks2(drinks));
// });

export default Users;
