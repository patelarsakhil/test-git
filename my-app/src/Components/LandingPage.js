import React from "react";
import { FaSearch, FaCog } from "react-icons/fa";
import coincap from "../Components/images/coincap.png";
import footer from "../Components/images/footer.png"
import "../Components/Styles/landingPage.css";
import Pagination from "./Pagination";

function LandingPage() {
  
  
  return (
    <div>
      <div className="nav">
        <h7 className="coins">Coins </h7>
        <h7 className="exchange">Exchanges</h7>
        <h7 className="swap">Swap</h7>
        <img src={coincap} alt="" className="coin-map"></img>
        <FaSearch className="search" />
        <FaCog className="setting">setting</FaCog>
        <button className="connect-wallet">connect Wallet</button>
      </div>

      <section className="header-section">
        <h5 className="market-cap">
          <span id="content1">MARKET CAP</span>
          <span id="content2" style={{fontSize:'15.0pt'}}>
            $1.14T
          </span>
        </h5>
        <h5 className="exchange-volume">
          <span id="content1">EXCHANGE VOL</span>
          <span id="content2" style={{fontSize:'15.0pt'}}>
            $34.09B
          </span>
        </h5>
        <h5 className="assets">
          <span id="content1">ASSETS</span>
          <span id="content2" style={{fontSize:'15.0pt'}}>
            2,295
          </span>
        </h5>
        <h5 className="exchanges">
          <span id="content1">EXCHANGES</span>
          <span id="content2" style={{fontSize:'15.0pt'}}>
            73
          </span>
        </h5>
        <h5 className="markets">
          <span id="content1">MARKETS</span>
          <span id="content2" style={{fontSize:'15.0pt'}}>
            14,092
          </span>
        </h5>
        <h5 className="dom-index">
          <span id="content1">BTC DOM INDEX</span>
          <span id="content2" style={{fontSize:'15.0pt'}}>
            32.0%
          </span>
        </h5>
      </section>

      <Pagination/>

      <footer className="footer">
          <img src={footer} alt="footer" className="footer-image"></img>
      </footer>
    </div>
  );
}

export default LandingPage;
