import { FC } from "react";
import Heading from "./Heading";
import Navbar from "./NavBar";
import Burger from "./burger";
import { useState } from "react";


import { exit } from "../store/UsersSlice";
import Router from 'next/router';
import { useSelector,useDispatch } from "react-redux";

const Header: FC = () => {
    const [headerState, setHeaderState] = useState(false)


    const dispatch = useDispatch();
    // const { pathname } = useRouter();
    const auth = useSelector(state => state.user?.user?.auth);
    const role = useSelector(state => state.user?.user?.role);

    const changeHandler = () => {
        setHeaderState(!headerState);
    }


    const exitHandler = () => {
        localStorage.removeItem('user');
        dispatch(exit(false))
        Router.push('http://localhost:3000/')
    }
    

    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <div className="openNav">
                        
                        <Navbar/>
                    </div>

                    <div onClick={changeHandler} className={!headerState ?  "burger" : "burger _active"}>
                                <span></span>
                                <span></span>
                                <span></span>
                    </div>

                    {/* <div>Домашняя пицца</div> */}
                    <div className={!headerState ?  "menu__list" : "menu__list _active"}>
                        <Navbar changeHandler={changeHandler}/>
                    </div>

                    {/* {auth 
                        ?
                        <button onClick={exitHandler} className="exitButton">Exit</button>
                        : 
                        <div className=""></div> 
                    }  */}
                
                   
                </div>
            </div>
           
           
                
        </header>
    )
}

export default Header;