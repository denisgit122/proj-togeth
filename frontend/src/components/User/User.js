import css from './User.module.css'
import {useState} from "react";

const User = ({order}) => {
    const
        {id,name, surname, email, phone, age, course, course_format, course_type, status, sum, already_paid,
         group, created_at, manager} = order;

    const [active, setActive] = useState(true);

    const comment = () => {
        active?
            setActive(false)
            :
            setActive(true)
        console.log(active)
    }

  let strings = '';
  let creatCar = '';
  let creatCarDay = '';
  let _id = '';

  if (order){
    strings = created_at.split('-').slice(0,2);

    creatCar = created_at.split('-').slice(0,3);
    const arr = creatCar.splice(2,1);
    creatCarDay = arr[0].split('').splice(0,2)
    const arrId = id.split('')
    _id = arrId.splice(arrId.length-4, 4);
  }

  return (
      <div>
          <div onClick={event => comment()} className={css.headBox}>
              <div className={css.id}>{_id[0]}{_id[1]}{_id[2]}{_id[3]}</div>
              <div className={css.name}>{ name? name : 'null'}</div>
              <div className={css.surname}>{surname? surname : 'null'}</div>
              <div className={css.email}>{email ? email : 'null'}</div>
              <div className={css.phone}>{phone ? phone : 'null'}</div>
              <div className={css.id}>{age ? age : 'null'}</div>
              <div className={css.course}>{course ? course : 'null'}</div>
              <div className={css.course_format}>{course_format ? course_format : 'null'}</div>
              <div className={css.course_format}>{course_type ? course_type : 'null'}</div>
              <div className={css.status}>{status ? status : 'null'}</div>
              <div className={css.id}>{sum ? sum : 'null'}</div>
              <div className={css.already_paid}>{already_paid ? already_paid : 'null'}</div>
              <div className={css.id}>{group ? group : 'null'}</div>
              <div className={css.id}>{ created_at ? `${strings[0]}-${strings[1]}-${creatCarDay[1]}${creatCarDay[0]}` : 'null'}</div>
              <div className={css.manager}>{manager ? manager : 'null'}</div>
          </div>
          {
              active
                  ?<div></div>
                  : <div className={css.commentBox}></div>
          }
      </div>

);
};

export {User};