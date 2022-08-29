import React from "react";
import { useConversations } from "../contexts/ConversationProvider";
import OpenConversation from "./OpenConversation";
import Sidebar from "./Sidebar";

const Dashboard = ({ id }) => {
   const { selectedConversation } = useConversations();

   return (
      <div className="d-flex vh-100">
         <Sidebar id={id} />
         {selectedConversation && <OpenConversation />}
      </div>
   );
};

export default Dashboard;
