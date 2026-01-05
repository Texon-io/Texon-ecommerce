import {useLocation} from "react-router";
import {useEffect} from "react";

function ScrollToTop() {

    const {pathname} = useLocation();

    useEffect(() => {
        scrollTo(0,0)
    }, [pathname]);
    return null
}

export default ScrollToTop;
