import React, { useState, useEffect } from "react";
import Logo from "../../assets/icon.png";
import { FcSearch, FcSettings, FcPlus } from "react-icons/fc";
import { AiFillFolder } from "react-icons/ai";
import { db, storage } from "../../database/firebase";
import Switch from "react-switch";
import { BsMoon, BsSun } from "react-icons/bs";

import "./style.css";

const Home = ({ login }) => {
  const [progress, setProgress] = useState(0);
  const [arquivos, setArquivos] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    db.collection("drive")
      .doc(login.uid)
      .collection("files")
      .onSnapshot((snapshot) => {
        setArquivos(snapshot.docs.map((files) => files.data()));
      });
    console.log(arquivos);
  }, []);

  const handleCheck = (val) => {
    setChecked(val);
    let body = document.querySelector("body");
    if (!checked) {
      body.style.background = "#000";
      body.style.color = "#fff";
    } else {
      body.style.background = "#fff";
      body.style.color = "#000";
    }
  };

  const fazerUploadArquivo = () => {
    let arquivo = document.querySelector("[name=arquivo]").files[0];
    const uploadTesk = storage.ref("drive/" + arquivo.name).put(arquivo);
    uploadTesk.on(
      "state_changed",
      (snapshot) => {
        const progressTemp =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progressTemp);
        setProgress(progressTemp);
      },
      function (error) {
        console.log(error);
      },
      function () {
        storage
          .ref("drive/" + arquivo.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("drive").doc(login.uid).collection("files").add({
              arquivoUrl: url,
              tipo_arqivo: arquivo.type,
              nome: arquivo.name,
            });
          });
        alert("Upload realizado com sucesso");
        setProgress(0);
      }
    );
  };

  return (
    <div className="home">
      <div className="switch">
        <Switch
          onChange={(val) => handleCheck(val)}
          checked={checked}
          uncheckedIcon={<BsMoon />}
          checkedIcon={<BsSun />}
          onColor="#7FFFD4"
        />
      </div>
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
              onChange={() => fazerUploadArquivo()}
            />
          </form>
          <div className="main__folders">
            <div className="main__folderMeuDriver">
              <AiFillFolder /> <span>Meu Drive</span>
            </div>
            {progress > 0 ? (
              <div>
                <label htmlFor="file">
                  Dowload progress: {Math.floor(progress)} %
                </label>
                <progress id="file" value={progress} max="100">
                  {progress} %
                </progress>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
        <div className="main__content">
          <div className="mainTopoText">
            <h2>Meu Drive</h2>
          </div>
          <div className="conteudo">
            {arquivos.map((arquivo) => (
              <>
                <div key={arquivo.arquivoUrl} className="conteudo_arquivo">
                  <a href={arquivo.arquivoUrl}>Nome: {arquivo.nome}</a>
                  <p>Tipo: {arquivo.tipo_arqivo}</p>
                  {arquivo.tipo_arqivo === "image/jpeg" ||
                  arquivo.tipo_arqivo === "image/png" ||
                  arquivo.tipo_arqivo === "image/jpg" ? (
                    // eslint-disable-next-line jsx-a11y/alt-text
                    <img src={arquivo.arquivoUrl} />
                  ) : null}

                  {arquivo.tipo_arqivo === "video/mp4" ? (
                    <video width="320" height="240" controls>
                      <source src={arquivo.arquivoUrl}></source>
                    </video>
                  ) : null}

                  {arquivo.tipo_arqivo === "application/pdf" ? (
                    // eslint-disable-next-line jsx-a11y/iframe-has-title
                    <iframe
                      src={arquivo.arquivoUrl}
                      width="500"
                      height="300"
                    ></iframe>
                  ) : null}
                </div>
                <hr />
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
