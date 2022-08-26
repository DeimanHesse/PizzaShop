import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/UsersSlice";
import jwtDecode from "jwt-decode";

import { wrapper } from "../store/store";

import Router from "next/router";

import { checkSlider } from "../store/UsersSlice";
import styles from "../styles/Auth.module.scss";

import type { NextPage } from "next";

import Modal from "../components/modal/Modal";

const Auth: NextPage = ({hostname}) => {
    //авторизация будет по номеру телефона и паролю
    //при регистрации также нужно указать и имя


    const [activeProductModal, setActiveProductModal] = useState(false);
    const user = useSelector((state) => state.user);

   
    const sel = useSelector((state) => state);
    const dispatch = useDispatch();

    const inputHandler = (e) => {
        setState({ ...state, [e.target.id]: e.target.value });
    };

    if (user?.user?.auth) {
        Router.push("/pizzas");
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);

    const send2 = async (data) => {
        try {
            const res = await axios.post(`${hostname}/auth/login`, data);
            localStorage.setItem("user", res.data.token);
        const user = jwtDecode(res.data.token);
        //здесь пользователь либо будет попадать в стор, либо будет выводиться ошибка
        // "неверный логин или пароль"

        dispatch(addUser(user));
        } catch (error) {
            setActiveProductModal(true)
           
        }

        
       
        
    };

    const normalizeCardNumber = (value) => {
        // return value.replace(/\s/g, "").match(/^[0-9]+$/)?.join(" ").match(/(\d{1,4})(\d{0,4})(\d{0,4})(\d{0,4})/)?.join(" ").substr(0, 19) || ""
        return (
            value
                .replace(/\s/g, "")
                .match(/^[0-9]+$/)
                ?.join(" ")
                .match(/.{1,3}/g)
                ?.join(" ")
                .substr(0, 15) || ""
        );
    };

    const pagesSlider = useSelector((state) => state?.user?.pagesSlider);
   

    //ПРОВЕРКА СЛАЙДЕРА
    const checkPagesSlider = () => {
        const e = Router.pathname;
    
        if (e === "/auth") {
            dispatch(checkSlider(false));
        } else if (e === "/reg") {
            dispatch(checkSlider(false));
        } else {
            dispatch(checkSlider(true));
        }
    };

    useEffect(() => {
        checkPagesSlider();
    }, []);

    return (
        <div className={styles.auth}>
            <Modal active={activeProductModal} setActive={setActiveProductModal}>
                <div className={styles.error}>
                    <h2>Некорректный емэйл или пароль</h2>
                </div>
            </Modal>
            <form className={styles.form} onSubmit={handleSubmit(send2)}>
                <div className={styles.form__title}>Авторизация</div>
                <div className={styles.form__item}>
                    <label htmlFor="name" className={styles.form__label}>
                        Номер телефона
                    </label>
                    <input
                        className={styles.form__input}
                        maxLength="13"
                        placeholder="+ 375 29 777 5 777"
                        id="phoneNumber"
                        // inputMode="numeric"
                        // autoComplete="cc-number"
                        type="text"
                        {...register("phoneNumber", {
                            required: "Поле обязательно для заполнения",
                            minLength: {
                                value: 13,
                                message: "должно быть 10 символов",
                            },
                            maxLength: {
                                value: 13,
                                message: "должно быть 10 символов",
                            },
                            // onChange: (e) => {
                            //     const {value} = e.target
                            //     e.target.value = normalizeCardNumber(value)

                            // },
                        })}
                    />

                    <div className={styles.form__errors}>
                        {errors?.phoneNumber && (
                            <h4>{errors?.phoneNumber?.message}</h4>
                        )}
                    </div>
                </div>

                <div className={styles.form__item}>
                    <label htmlFor="password" className={styles.form__label}>
                        Пароль
                    </label>
                    <input
                        placeholder="password"
                        className={styles.form__input}
                        {...register("password", {
                            required: "Поле обязательно для заполнения",
                        })}
                        id="password"
                        type="text"
                    />
                    <div className={styles.form__errors}>
                        {errors?.password && (
                            <h4>{errors?.password?.message}</h4>
                        )}
                    </div>
                </div>

                <button className={styles.form__button} type="submit">
                    Войти
                </button>
            </form>
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        return {
            props: {
                hostname: process.env.NEXT_PUBLIC_HOST,
            }
        }
    }
);

export default Auth;


