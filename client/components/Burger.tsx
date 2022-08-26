import { useState } from "react";
import Navbar from "./NavBar";

const Burger = () => {
const [headerState, setHeaderState] = useState(false)

    const changeHandler = () => {
        setHeaderState(!headerState);
    }

    return (
        <div className={headerState?  "menu" : "menu _active"}>
            <div onClick={changeHandler} className={headerState?  "burger" : "burger _active"}>
                        <span></span>
                        <span></span>
                        <span></span>
            </div>
            <div id="nav__list" className={headerState?  "menu__list" : "menu__list _active"}>
                <Navbar/>
            </div>
        </div>
    )
}

export default Burger;