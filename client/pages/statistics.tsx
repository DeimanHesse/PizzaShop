import Head from "next/head";
import Link from "next/link";
import type { NextPage } from 'next';
import Heading from "../../components/Heading";
import { useAppDispatch } from "../../store/hooks";
import { useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDrinks, addOneDrink } from "../../store/ProductsSlice";
import axios from "axios";
import { type } from "os";
import { useEffect } from "react";
import React from 'react';

import { deleteDrink } from "../../store/ProductsSlice";
// import Image from 'next/image'

// import { AppState, wrapper } from '../../store/store';

import Product from "../../components/Products/Product";
import AddForm from "../../components/AddForm";
import Modal from "../../components/modal/Modal";

  const Statistics: NextPage = () => { 


    const [pageState, setPageState] = useState({
      common: true,
      users: false
    });
    
    const [usersState, setUsersState] = useState([])
  
    const [state, setState] = useState([]);
      useEffect(() => {
        getOrders2();
      }, [])


      //статистика за ден или вся?
      const [statState, setStatState] = useState({
        sumAll: '',
        sumDay: '',
        sumWeek: '',
        sumMonth: '',
        countAll:''

      })

      const getOrders2 = async () => {
          const token = localStorage.getItem('user')
          const resOrders = await axios.get('http://localhost:5000/orders/archive',
            {
                headers: {
                'Authorization': `Bearer ${token}` 
                }
            });
          // const resOrders = await axios.get('http://localhost:5000/users')
          setState(resOrders.data)

          console.log('resOrders', resOrders.data)
          const sumAll = await resOrders.data.reduce(function(sum, elem) {
              return sum + Number(elem.sum);
          }, 0);

          console.log('suAll',sumAll)
          const countAll = await resOrders.data.length;
          
          // reduce(function(sum, elem) {
          //     return sum + Number(elem.sum);
          // }, 0);
          setStatState({...statState, sumAll: sumAll, countAll: countAll });
      }
   
    
       
        
      




    return (
        <>
            <Head>
                <title>Statistics</title>
            </Head>
    
            <div style={{width: '100%'}} className="wrapper">
            <div className="_container">
                <div className="users">
                </div>
                <div className="common">
                  <div className="ordersAll">
                      <div className="ordersAll__count">Количество заказов за всё время: {statState.countAll}</div>
                      <div className="ordersAll__sum">Сумма выручки за всё время: {statState.sumAll} Р</div>
                    </div>
                    <div className="ordersDay">
                      <div className="ordersDay__count">Количество заказов за день</div>
                      <div className="ordersDay__sum">Сумма выручки за день:</div>
                    </div>
                    <div className="ordersWeek">
                      <div className="ordersWeek__count">Количество заказов за неделю:</div>
                      <div className="ordersWeek__sum">Сумма выручки за неделю:</div>
                    </div>
                    <div className="ordersMonth">
                      <div className="ordersMonth__count">Количество заказов за месяц</div>
                      <div className="ordersMonth__sum">Сумма выручки за месяц:</div>
                    </div>
                </div>
            </div>

            
              
              
            </div>
        </>
    );
};
  

// export const getServerSideProps = wrapper.getServerSideProps(store => async(context) => {
//     const res = await axios.get('http://localhost:5000/products/drinks');
//     // console.log('serverSide')
//     const drinks = {
//         drinks: [...res.data]
//     };
//     // await store.dispatch(addDrinks(drinks));
// });

export default Statistics;
