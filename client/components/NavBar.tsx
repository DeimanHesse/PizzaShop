import styles from "../styles/NavBar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { exit } from "../store/UsersSlice";
import Router from "next/router";
import logo from "../public/logo.png";

const Navbar: FC = ({ changeHandler }) => {
    const dispatch = useDispatch();
    const { pathname } = useRouter();
    const auth = useSelector((state) => state.user?.user?.auth);
    const role = useSelector((state) => state.user?.user?.role);
    const userState = useSelector((state) => state.user);

    let navigation = [];
    if (auth && role === "admin") {
        navigation = [
            // { id: 1, title: 'Главная', path: '/', role: "user" },
            { id: 2, title: "Пиццы", path: "/pizzas", role: "user" },
            { id: 3, title: "Напитки", path: "/drinks", role: "user" },
            { id: 5, title: "Закуски", path: "/snacks", role: "user" },
            { id: 4, title: "Дессерты", path: "/desserts", role: "user" },
           
            { id: 9, title: "Активные заказы", path: "/orders/active" },
            { id: 10, title: "Архив заказов", path: "/orders/archive" },
            // { id: 11, title: "Статистика", path: "/statistics" },
            // { id: 12, title: "Пользователи", path: "/users" },
        ];
    } else if (auth === true) {
        navigation = [
            // { id: 1, title: 'Главная', path: '/', role: "user" },
            { id: 2, title: "Пиццы", path: "/pizzas", role: "user" },
            { id: 3, title: "Напитки", path: "/drinks", role: "user" },
            { id: 5, title: "Закуски", path: "/snacks", role: "user" },
            { id: 4, title: "Дессерты", path: "/desserts", role: "user" },
           
            { id: 8, title: "Корзина", path: "/cart" },
        ];
    } else {
        navigation = [
            // { id: 1, title: 'Главная', path: '/', role: "user" },
            { id: 2, title: "Пиццы", path: "/pizzas", role: "user" },
            { id: 3, title: "Напитки", path: "/drinks", role: "user" },
            { id: 5, title: "Закуски", path: "/snacks", role: "user" },
            { id: 4, title: "Дессерты", path: "/desserts", role: "user" },
         
            { id: 6, title: "Авторизация", path: "/auth", role: "user" },
            { id: 7, title: "Регистация", path: "/reg" },
            { id: 8, title: "Корзина", path: "/cart" },
        ];
    }

    const showLocalStor = () => {
        const cart = localStorage.getItem("cart");
        cart = JSON.parse(cart);
        console.log("cart", cart);
    };

    const exitHandler = () => {
        localStorage.removeItem("user");
        dispatch(exit(false));
        Router.push("/pizzas");
    };

    return (
        <nav className={styles.nav}>
            <div className="nav__title">
                <Image
                    src={logo}
                    height="85"
                    width="300"
                    alt="GFG logo imported from public directory"
                />
            </div>
            <div className={styles.links}>
                {navigation.map(({ id, title, path }) => (
                    <Link
                        style={{ backgroundColor: "green" }}
                        key={id}
                        href={path}
                    >
                        <a
                            onClick={changeHandler}
                            className={pathname === path ? styles.active : null}
                        >
                            {title}
                        </a>
                    </Link>
                ))}
            </div>
            {/* <button onClick={() => localStorage.clear()}>clearLocal</button> */}
            {/* <button onClick={() =>console.log("state", userState)}>userState</button> */}
            {auth ? (
                <button onClick={exitHandler} className="exitButton">
                    Exit
                </button>
            ) : (
                <div className=""></div>
            )}
        </nav>
    );
};

export default Navbar;
