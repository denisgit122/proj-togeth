import {Routes, Route, Navigate} from 'react-router-dom'

import {AdminPanelPage, LoginPage, NotFoundPage, UserPage} from "./pages";
import {HeaderLayots} from "./layouts/HeaderLayots/HeaderLayots";

function App() {

    return (
        <div >
            <Routes>

                <Route path={'/'}>
                    <Route index element={<Navigate to={'/login'}/> }/>
                    <Route path={'/login'} element={<LoginPage/>}/>

                </Route>



                <Route element={<HeaderLayots/>}>
                    <Route path={"/orders"} element={<UserPage/>}/>
                    <Route path={"/adminPanel"} element={<AdminPanelPage/>}/>

                </Route>

                <Route path={'*'} element={<NotFoundPage/>}/>

            </Routes>
        </div>


    );
}

export default App;

