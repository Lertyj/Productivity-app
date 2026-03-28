import React from "react";
import style from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import Header from "./Components/Header/Header";
import BoardList from "src/Components/Board/BoardList/BoardList";

function Home() {
  return (
    <div className={style.wrapper}>
      <BoardList />
    </div>
  );
}

export default Home;
