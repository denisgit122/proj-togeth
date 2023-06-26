import {useEffect, useState} from "react";

import css from './Comment.module.css'
import {Comment} from "../Comment/Comment";
import {ordersService} from "../../services/ordersService";
import {useForm} from "react-hook-form";

const Comments = ({id}) => {

    const [comments, setComments] = useState('');
    const {reset, handleSubmit, register} = useForm();

    useEffect(() => {
        ordersService.getAllComments(id).then(({data})=> setComments(data))
    },[id])


    const submit = (data) => {
        console.log(data);
        reset();
    }

    return (
  <div className={css.headBoxComment}>
      <div className={css.commentBox}>

          {Array.isArray(comments) && comments.map(comment=><Comment key={comment.id} comment={comment}/>)}


      </div>
      <div className={css.form}>
          <form onSubmit={handleSubmit(submit)}>
              <input className={css.input} type="text" placeholder={'comment'} required={true} {...register('comment')}/>
              <button className={css.a}>Submit</button>
          </form>
      </div>
      <button className={css.edit}>EDIT</button>
  </div>
);
};

export {Comments};