import {Container, Pagination, Stack, PaginationItem} from '@mui/material'
import {useEffect, useState} from "react";
import {Link, useLocation, useSearchParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import css from './Users.module.css'
import {ordersAction} from "../../redux/slices/orders.slice";
import {User} from "../User/User";

const Users = () => {

     const location = useLocation();

    const [page, setPage] = useState(parseInt(location.search?.split('')[6] || 1));
    // const [page, setPage] = useState(1);

    const [pageQty, setPageQty] = useState(0);

    const dispatch = useDispatch()
    const {orders} = useSelector(state => state.orders)


    // const [searchParams, setSearchParams] = useSearchParams();
    // const postQuery = searchParams.get('name') || '';
    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //
    //   const form = e.target;
    //   const queryName = form.name.value;
    //   setSearchParams({page: page, name: queryName})
    //
    //
    // }
    // console.log(postQuery)

    useEffect(() => {

        dispatch(ordersAction.getAll({page}));

        setPageQty(orders.totalPages)

    }, [dispatch, orders.limit, orders.totalPages, page])
    console.log(orders);


    return (
        <div className={css.box}>
            <div className={css.usersBox}>
                <div className={css.pagin}>

                    <div className={css.headBoxSearch}>

                        {/*<form autoComplete='off' onSubmit={handleSubmit} action="">*/}
                        {/*    <input type="search" name={'name'}/>*/}
                        {/*    <input type="submit" value={'search'}/>*/}
                        {/*</form>*/}

                    </div>
                    <div >
                        <div className={css.headBox}>

                            <div className={css.all && css.id}>id</div>
                            <div className={css.all && css.name}>name</div>
                            <div className={css.all && css.surname}>surname</div>
                            <div className={css.all && css.email}>email</div>
                            <div className={css.all && css.phone}>phone</div>
                            <div className={css.all && css.age}>age</div>
                            <div className={css.all && css.surname}>course</div>
                            <div className={css.all && css.course_format}>course_format</div>
                            <div className={css.all && css.course_format}>course_type</div>
                            <div className={css.all && css.course_format}>status</div>
                            <div className={css.all && css.course_format}>sum</div>
                            <div className={css.all && css.course_format}>already_paid</div>
                            <div className={css.all && css.course_format}>group</div>
                            <div className={css.all && css.course_format}>created_at</div>
                            <div className={css.all}>manager</div>

                        </div>
                        {orders.data && orders.data
                        //     .filter(
                        //     // order=> order.name.includes(postQuery)
                        // )
                            .map(order => <User key={order.id} order={order}/>)}
                    </div>
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

            </div>
        </div>
    );
};

export {Users};