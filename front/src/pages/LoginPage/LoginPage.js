import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {joiResolver} from "@hookform/resolvers/joi";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import css from './Login.module.css'
import {useNavigate} from "react-router-dom";
import {loginValidator} from "../../validators";
import {useState} from "react";
import {authService} from "../../services";

const LoginPage = () => {
    const {handleSubmit, register, reset, formState:{errors, isValid} } = useForm(
        {mode:"onTouched", resolver: joiResolver(loginValidator)}
    )

    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const login = async (cred) => {
        try {
            await authService.login(cred);
            navigate("/orders")
        }catch (e) {
            if (e.response.status === 401){
                setError(e.response.data.message);
            }

        }
        reset()

    }

    return (
        <div className={css.box}>
            <div className={css.loginBox}>
                {error
                    ? <h2>{error}</h2>
                    :<h2>Login Form</h2>
                }


                <form onSubmit={handleSubmit(login)}>
                    <div className={css.userBox}>
                        <input type="text" {...register("email")}/>

                        {error ?
                            <label>Invalid email </label>
                            : errors.email ? <span>{errors.email.message}</span> : <label>email</label>
                        }
                    </div>
                    <div className={css.userBox}>
                        <input type="text" {...register("password")}/>

                        {error ?
                            <label>Invalid password </label>
                            : errors.password ? <span>{errors.password.message}</span> : <label>password</label>
                        }

                    </div>

                    {isValid ? <button className={css.a}>Login</button> :
                        <button className={css.button}>
                            <p>is not valid!</p>
                        </button>}

                </form>

            </div>
        </div>

    );
};

export {LoginPage};