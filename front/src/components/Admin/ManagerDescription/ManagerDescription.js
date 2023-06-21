import css from "../../AdminPanel/AdminPanel.module.css";

const ManagerDescription = ({manager}) => {
    const {email, name, surname, is_active, last_login} = manager;

    return (
        <div>
            <div className={css.desc}>

                <div className={css.span}>email: {email}</div>
                <div className={css.span}>name: {name}</div>
                <div className={css.span}>surname: {surname}</div>
                <div className={css.span}>is_active: {is_active}</div>
                <div className={css.span}>last_login: {last_login}</div>

            </div>
        </div>
    );
};

export {ManagerDescription};