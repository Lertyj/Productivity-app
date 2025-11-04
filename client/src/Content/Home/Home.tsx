import React from "react";
import style from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import Header from "./Components/Header/Header";
import CreateBoardForm from "src/Components/Board/CreateBoardForm";

function Home() {
  return (
    <div>
      <CreateBoardForm />
    </div>
  );
}

export default Home;
