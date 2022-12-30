
import { createContext, useState } from "react";

export const DrawerContext =createContext({
    show:"",
    openDrawer : () => {}
})

function SidebarContextProvider ({children}) {
    const [show,setShow]=useState(false);

    function openDrawer (data){
        setShow(!show);   //true means close
    }

    const value = {
        show:show,
        openDrawer:openDrawer

    }

    return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
}
export default SidebarContextProvider;