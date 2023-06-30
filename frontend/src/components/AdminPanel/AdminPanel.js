import css from './AdminPanel.module.css';
import {useState} from "react";
import {ManagerDescription} from "../Admin/ManagerDescription/ManagerDescription";
import {ButtonAdmin} from "../Admin/ButtonAdmin/ButtonAdmin";

const AdminPanel = ({manager}) => {

    const [active, setActive] = useState(true);
    const [cop, setCoty] = useState(false);

    const copy = () => {
        navigator.clipboard.writeText('http://bigbird.space/activate/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWN0aXZhdGUiLCJleHAiOjE2ODU1NjIwNjksImlhdCI6MTY4NTU2MTQ2OSwianRpIjoiNWM3NDJlNzk2ODFlNDRjNDg1MDk1NzdmOGViMTY5NjAiLCJ1c2VyX2lkIjoxMDB9.1w6anikxTnVBzeYwaXIV9p1wGlmQcPcrjMcHdZcAZzY')
            .then(()=> setCoty(true))
    }

    if (cop){
        setTimeout(args =>{
            setCoty(false)
        }, 3000)
    }

    return (
        <div className={css.headBox}>
            {active
                ?
                <div className={css.box }>
                    <ManagerDescription manager={manager}/>
                    <div className={css.lie}></div>
                    <ButtonAdmin active={active} setActive={setActive} word={'Learn more...'}/>

                </div>
                :
                <div className={css.boxFalse}>
                    <ManagerDescription manager={manager}/>
                    <div className={css.lieFalse}></div>

                    <div className={css.boxButton}>
                        <button onClick={event => copy()} className={css.button}>RECOVERY PASSWORD</button>
                        {cop ? <span className={css.copied}>copied successfully</span> : <></>}
                        <button className={css.button}>BAN</button>
                        <button className={css.button}>ANBUN</button>
                    </div>

                    <div className={css.lie && css.lieFalse2}></div>
                    <ButtonAdmin active={active} setActive={setActive} word={'skip'}/>

                </div>
            }
        </div>

    );
};

export {AdminPanel};