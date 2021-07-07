import React from "react";
import Logo from "../../assets/icon.png";
import { FcSearch, FcSettings, FcPlus } from "react-icons/fc";
import { AiFillFolder } from "react-icons/ai";

import "./style.css";

const Home = ({ login }) => {
  return (
    <div className="home">
      <div className="header">
        <div className="header__logo">
          <img src={Logo} />
        </div>
        <div className="header__pesquisa">
          <FcSearch />
          <input placeholder="Pesquisar no Drive" type="text" />
          <FcSettings />
        </div>
        <div className="header__user">
          <img src={login.imagem} />
        </div>
      </div>

      <div className="main">
        <div className="main__sidebar">
          <form>
            <label className="main__btnFileSelect" htmlFor="arquivo">
              <FcPlus />
              NOVO
            </label>
            <input
              type="file"
              id="arquivo"
              name="arquivo"
              className="header-input"
            />
          </form>
          <div className="main__folders">
            <div className="main__folderMeuDriver">
              <AiFillFolder /> <span>Meu Drive</span>
            </div>
          </div>
        </div>
        <div className="main__content">
          <div className="mainTopoText">
            <h2>Meu Drive</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
