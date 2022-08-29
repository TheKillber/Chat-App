import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

export const useSocket = () => {
   return useContext(SocketContext);
};

export const SocketProvider = ({ children, id }) => {
   const [socket, setSocket] = useState();
   useEffect(() => {
      const newSocket = io("/", {
         query: { id },
      });
      setSocket(newSocket);

      return () => newSocket.close();
   }, [id]);

   return (
      <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
   );
};
