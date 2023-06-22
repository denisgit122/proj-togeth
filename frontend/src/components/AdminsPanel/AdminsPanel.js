import css from './AdminPanel.module.css'
import {AdminPanel} from "../AdminPanel/AdminPanel";
import {useEffect, useState} from "react";
import {ModalCreate} from "../ModalCreate/ModalCreate";

const AdminsPanel = () => {
    const arr = [
        {id: 99,
            email: 'lika@kika.com',
            name: 'Gogol',
            surname: 'Mogol',
            is_active: 'true',
            last_login: null
        },
        {id: 98,
            email: 'lika@kika.com',
            name: 'Gogol',
            surname: 'Mogol',
            is_active: 'true',
            last_login: null
        },
        {id: 97,
            email: 'lika@kika.com',
            name: 'Gogol',
            surname: 'Mogol',
            is_active: 'true',
            last_login: null
        },
        {id: 96,
            email: 'lika@kika.com',
            name: 'Gogol',
            surname: 'Mogol',
            is_active: 'true',
            last_login: null
        },
        {id: 95,
            email: 'lika@kika.com',
            name: 'Gogol',
            surname: 'Mogol',
            is_active: 'true',
            last_login: null
        },
    ];
    const [length, setLength] = useState(0);
    const [modalActive, setModalActive] = useState(false);

    useEffect(() => {
        setLength(arr.length)
    }, [arr])

    return (
        <div className={css.box}>
            <div className={css.adminPanelBox}>
                <div className={css.ordersBox}>
                    <h3 className={css.order}>Orders statistic</h3>
                </div>

                <div  className={css.totalBox}>
                    <div onClick={() => setModalActive(true)} className={css.create}>
                        <div>create</div>
                    </div>

                    <div className={css.totalBox}>
                        <div className={css.total}>total:{length}</div>
                        <div className={css.total}>In work:{length}</div>
                        <div className={css.total}>null:{length}</div>
                        <div className={css.total}>Agree:{length}</div>
                        <div className={css.total}>Disagree:{length}</div>
                    </div>

                </div>

                <ModalCreate active={modalActive} setModalActive={setModalActive}/>

                <div>
                    {arr.map((manager )=> <AdminPanel  key={manager.id} arr={arr} length={length} manager={manager}/>)}
                </div>

            </div>
        </div>

    );
};

export {AdminsPanel};