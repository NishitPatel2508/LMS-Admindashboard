import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Comman = ({ isSidebar, setIsSidebar }) => {
  //   const [isSidebar, setIsSidebar] = useState(true);
  // const [loading, setLoading] = useState(false);
  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
      </main>
    </div>
  );
};

export default Comman;
