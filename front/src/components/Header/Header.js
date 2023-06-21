import Headroom from 'react-headroom'
import {NavLink} from "react-router-dom";
import {CiLogout} from 'react-icons/ci'
import {ImCogs} from 'react-icons/im'
import {useDispatch} from "react-redux";

import css from './Header.module.css';
import img from '../img/img.png'

const Header = () => {
    const dispatch = useDispatch()

    const logOut = () => {

    }
    return (
        <div className={css.headBox}>
            <Headroom className={css.headroom}>
                <header className={css.header}>
                    <NavLink to={'/'}>
                        <img className={css.logo} src={img} alt="Logo"/>
                    </NavLink>
                    <div>
                        <NavLink to={'/adminPanel'}>
                            <ImCogs className={css.cogs}/>
                        </NavLink>

                        <CiLogout onClick={logOut} className={css.logout}/>

                    </div>

                </header>
            </Headroom>
        </div>


    );
};

export {Header};