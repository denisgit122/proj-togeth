import {Navigate, Route, Routes} from "react-router-dom";

import {UserPage,AdminPanelPage, LoginPage,NotFoundPage} from "./pages";
import {HeaderLayots} from "./layouts/HeaderLayots/HeaderLayots";


function App() {
  return (
      <div className="App">
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
