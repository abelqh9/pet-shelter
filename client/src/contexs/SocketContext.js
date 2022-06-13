import React, { useState } from 'react';
import io from 'socket.io-client'

export const socketContext = React.createContext();

export function SocketProvider({ children }) {

    const [socket] = useState(io(':8000'));

    return <socketContext.Provider value={{socket}}>
        {children}
    </socketContext.Provider>
}