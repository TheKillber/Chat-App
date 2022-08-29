import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "../contexts/ContactsProvider";
import { ConversationProvider } from "../contexts/ConversationProvider";
import { SocketProvider } from "../contexts/SocketProvider";

const App = () => {
   const [id, setId] = useLocalStorage("id");
   const dashboard = (
      <SocketProvider id={id}>
         <ContactsProvider>
            <ConversationProvider id={id}>
               <Dashboard id={id} />
            </ConversationProvider>
         </ContactsProvider>
      </SocketProvider>
   );

   return id ? dashboard : <Login onIdSubmit={setId} />;
};

export default App;
