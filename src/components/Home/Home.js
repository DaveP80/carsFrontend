import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logo } from "../../assets";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const navigate = useNavigate()

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    navigate('/')
  };

  useEffect(() => {
    if (modalOpen) {
      setTimeout(() => {document.getElementById("gsc-i-id1").value = "ford pinto green"; document.getElementById("gsc-i-id1").style.background = "";
    let b = document.getElementById('___gcse_0').getElementsByTagName('button'); for (let a of b) {
      a.click();
      break;
    }
    setTimeout(() => {
      let c = document.getElementsByClassName('gsc-wrapper')[0];
      let imgs = c.getElementsByTagName('img')
      for (let im of imgs) {
        navigator.clipboard.writeText(im.src);
        break;
      }
      const text = navigator.clipboard.readText();
      text.then(res => {setShowImg(res);});
    }, 800)
  
  }, 1500)
    }
  }, [modalOpen])
  return (
    <div className="container-fluid min-vh-100">
      <div className="mt-5 text-center">
        <div className="py-5 text-center">
          <img className="img-fluid" src={logo} alt="main logo" />
        </div>
        <div className="w-50 text-center mx-auto">
          <h4 className="text-warning">
            Class Car database and comment on your favorite car.
          </h4>
          <h4 className="text-warning">
            Search for cars by make an model.
            <Link className="" to="/cars">
              here
            </Link>{" "}
          </h4>
          <h4 className="text-warning">
            Find a car you are really interested in.
          </h4>
        </div>
      </div>
      <div>
        {showImg && <img src={showImg} alt='img'/>}
      <button onClick={handleOpenModal}>Open Search Modal</button>
      {modalOpen && (
        <div className="">
          <div className="">
            <button className="close-button" onClick={handleCloseModal}>
              Close
            </button>
            <Helmet>
              <script async src="https://cse.google.com/cse.js?cx=1559144145c1f40b9"></script>
            </Helmet>
            <div className="gcse-search"></div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default Home;
