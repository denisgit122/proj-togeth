import {Outlet} from "react-router-dom";
import {Header} from "../../components";

const HeaderLayots = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
};

export {HeaderLayots};