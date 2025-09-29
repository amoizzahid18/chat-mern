import { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client"


const SocketContext = createContext();

export const SocketProvider = ({children}) => {

    const socket = useMemo( // so that it doesnt create new in each render, can also useRef
        () => io('http://localhost:4500', ),
        []
    );
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => useContext(SocketContext);
