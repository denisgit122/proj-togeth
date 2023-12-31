import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";

import css from './AddPasswordPage.module.css'
import {passwordValidator} from "../../validators";
import {useState} from "react";
import {managerAction} from "../../redux/slices/manager.slice";
import {Loader} from "../../components";

const AddPasswordPage = () => {
    const {handleSubmit, register, reset, formState:{errors, isValid} } = useForm(
        {mode:"onTouched", resolver: joiResolver(passwordValidator)}
    )

    const {id} = useParams();

    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loader, setLoader] = useState(false);

    const addPassword = async (cred) => {

        try {
            if (cred.password === cred.RepPassword){

                dispatch(managerAction.updateManager({id, manager:{password: cred.password}}));
                setLoader(true);

                setTimeout(()=>{
                    localStorage.removeItem('refresh');
                    localStorage.removeItem('access');
                    navigate("/");
                    setLoader(false);

                    reset();
                }, 1000)

            }else {
                setError('Passwords are not the same')
            }


        }catch (e) {
            if (e.response.status === 401){
                setError(e.response.data.message);
            }

        }

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

export {AddPasswordPage};