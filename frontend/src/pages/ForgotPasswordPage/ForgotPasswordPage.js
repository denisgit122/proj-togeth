import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";

import css from './AddPasswordPage.module.css'
import {passwordValidator} from "../../validators";
import {Loader} from "../../components";
import {authAction} from "../../redux/slices/auth.slice";

const ForgotPasswordPage = () => {
    const {handleSubmit, register, reset, formState:{errors, isValid} } = useForm(
        {mode:"onTouched", resolver: joiResolver(passwordValidator)}
    )

    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [loader, setLoader] = useState(false);
    const location = useLocation();
    const token = location.search?.split("=")[1];

    const addPassword = async (cred) => {

        try {
            if (cred.password === cred.RepPassword){

                dispatch(authAction.forgotPasswordPut( {token, password: cred.password}));
                setLoader(true);

                setTimeout(()=>{

                    navigate("/");
                    setLoader(false);
                    reset();

                }, 1000)

            }else {
                setError('Passwords are not the same')
            }


        }catch (e) {}
    }

    return (
        <div className={css.box}>
            {
                loader
                    ? <div className={css.loader}><Loader/></div>
                    : <div className={css.loginBox}>
                        {error
                            ? <h2>{error}</h2>
                            :<h2>Password Form</h2>
                        }


                        <form onSubmit={handleSubmit(addPassword)}>
                            <div className={css.userBox}>
                                <input type="text" {...register("RepPassword")}/>

                                {error ?
                                    <label>Invalid email </label>
                                    : errors.RepPassword ? <span>{errors.RepPassword.message}</span> : <label>RepPassword</label>
                                }
                            </div>
                            <div className={css.userBox}>
                                <input type="text" {...register("password")}/>

                                {error ?
                                    <label>Invalid password </label>
                                    : errors.password ? <span>{errors.password.message}</span> : <label>password</label>
                                }

                            </div>

                            {isValid ?
                                <button className={css.a}>Add Password</button> :
                                <button className={css.button}>
                                    <p>is not valid!</p>
                                </button>}

                        </form>

                    </div>
            }


        </div>

    );
};

export {ForgotPasswordPage};