import {Container, Pagination, Stack, PaginationItem} from '@mui/material'
import {useEffect, useState} from "react";
import {Link, useLocation, useSearchParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {BiReset} from 'react-icons/bi'

import css from './Users.module.css'
import {ordersAction} from "../../redux/slices/orders.slice";
import {User} from "../User/User";
import {BlogFilter} from "../BlogFilter/BlogFilter";

const Users = () => {

     const location = useLocation();

    const [page, setPage] = useState(parseInt(location.search?.split('')[6] || 1));
    const [name, setName] = useState( location.search?.split('=')[2]?.split('+') || null)

    const [order, setOrder] = useState([])

    const [pageQty, setPageQty] = useState(0);

    const dispatch = useDispatch();
    const {orders} = useSelector(state => state.orders);

    const [searchByName, setSearchByName] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const nameQuery = searchParams.get('name') || '';
    const surnameQuery = searchParams.get('surname') || '';
    const emailQuery = searchParams.get('email') || '';
    const phoneQuery = searchParams.get('phone') || '';
    const ageQuery = searchParams.get('age') || '';
    const courseQuery = searchParams.get('course') || '';
    const course_formatQuery = searchParams.get('course_format') || '';
    const course_typeQuery = searchParams.get('course_type') || '';
    const statusQuery = searchParams.get('status') || '';
    const groupsQuery = searchParams.get('groups') || '';


    useEffect(() => {
        dispatch(ordersAction.getAll({page}));

        setPageQty(orders.totalPages)

        if (name !== null){
            if (name[1]==='asc' || name[1]==='desc'){
                console.log(name)

                dispatch(ordersAction.getAll({page, query: `${name[0]}:${name[1]}` }));
            }

        }

    }, [dispatch, orders.limit, orders.totalPages, page])

    console.log(order);
    console.log(order.length<1);
    const sortByName = async (word) => {

        if (!searchByName){

        setOrder([])

            setSearchByName(true)

            dispatch(ordersAction.getAll({page, query: `${word}:asc` }));
            setSearchParams({page: page, sortBy: `${word} asc` });

        }else {

            setSearchParams({page: page, sortBy: `${word} desc`});
            dispatch(ordersAction.getAll({page, query: `${word}:desc` }));

            setSearchByName(false);
            setOrder([]);

        }

    }

    const reset = async () => {
        setOrder([]);
        setSearchParams({page});

       await dispatch(ordersAction.getAll({page }));

    }

    return (
        <div className={css.box}>
            <div className={css.usersBox}>
                <div className={css.pagin}>

                    <div className={css.boxBiReset} onClick={()=>reset()}><BiReset className={css.BiReset}/></div>

                    <div className={css.headBoxSearch}>
                        <BlogFilter page={page}
                                    setOrder={setOrder}
                                    nameQuery={nameQuery}
                                    setSearchParams={setSearchParams}
                                    surnameQuery={surnameQuery}
                                    emailQuery={emailQuery}
                                    phoneQuery={phoneQuery}
                                    ageQuery={ageQuery}
                                    courseQuery={courseQuery}
                                    course_formatQuery={course_formatQuery}
                                    course_typeQuery={course_typeQuery}
                                    statusQuery={statusQuery}
                                    groupsQuery={groupsQuery}

                        />

                    </div>
                    <div >
                        <div className={css.headBox}>

                            <div onClick={()=>sortByName('id')} className={css.all && css.id}>id</div>
                            <div onClick={()=>sortByName('name')} className={css.all && css.name}>name</div>
                            <div onClick={()=>sortByName('surname')} className={css.all && css.surname}>surname</div>
                            <div onClick={()=>sortByName('email')} className={css.all && css.email}>email</div>
                            <div onClick={()=>sortByName('phone')} className={css.all && css.phone}>phone</div>
                            <div onClick={()=>sortByName('age')} className={css.all && css.age}>age</div>
                            <div onClick={()=>sortByName('course')} className={css.all && css.surname}>course</div>
                            <div onClick={()=>sortByName('course_format')} className={css.all && css.course_format}>course_format</div>
                            <div onClick={()=>sortByName('course_type')} className={css.all && css.course_format}>course_type</div>
                            <div onClick={()=>sortByName('status')} className={css.all && css.course_format}>status</div>
                            <div onClick={()=>sortByName('sum')} className={css.all && css.course_format}>sum</div>
                            <div onClick={()=>sortByName('already_paid')} className={css.all && css.course_format}>already_paid</div>
                            <div onClick={()=>sortByName('group')} className={css.all && css.course_format}>group</div>
                            <div onClick={()=>sortByName('created_at')} className={css.all && css.course_format}>created_at</div>
                            <div onClick={()=>sortByName('manager')} className={css.all}>manager</div>

                        </div>
                        {order.length<1 ? orders.data && orders.data.map(order => <User key={order.id} order={order}/>)
                        //     .filter(order =>
                        //     order.name.includes(nameQuery)
                        //     && order.surname.includes(surnameQuery)
                        //     && order.email.includes(emailQuery)
                        //     && order.phone.includes(phoneQuery)
                        //     && order.course.includes(courseQuery)
                        //     && order.course_format.includes(course_formatQuery)
                        //     && order.course_type.includes(course_typeQuery)
                        //         // eslint-disable-next-line no-mixed-operators
                        //     && !ageQuery.length || order.age === +ageQuery && order.name.includes(nameQuery) && order.surname.includes(surnameQuery) && order.email.includes(emailQuery) && order.phone.includes(phoneQuery) && order.course.includes(courseQuery) && order.course_format.includes(course_formatQuery)
                        //
                        // )
                            :order.length>=1 && order.map(orde => <User key={orde.id} order={orde}/>)}
                    </div>
                    {order.length<1
                        ? <div className={css.conteiner}>
                            <Container>
                                <Stack spacing={2}>
                                    {
                                        !!pageQty && (<Pagination
                                            sx={{marginY:3, marginX: "auto"}}
                                            count={pageQty}
                                            page={page}
                                            showFirstButton
                                            showLastButton
                                            onChange={(_, num) => setPage(num)}
                                            renderItem={
                                                (item) =>(
                                                    <PaginationItem
                                                        component={Link}

                                                        to={`/orders?page=${item.page}`}
                                                        {...item}
                                                    />
                                                )
                                            }
                                        />)
                                    }

                                </Stack>
                            </Container>
                        </div>

                    :
                         <div></div>}



                </div>

            </div>
        </div>
    );
};

export {Users};