import React, { useEffect, useState } from "react";
import "../Components/Styles/pagination.css";

const renderData = (CurrencyData) => {
    
    const symbol =(itemSymbol)=>{
        var coin = itemSymbol.toLowerCase();
        var urlhead="https://assets.coincap.io/assets/icons/"
        var urltail ="@2x.png"
        var url = urlhead+coin+urltail;
        return url
    }
    ///table data rendering ...
  return (
    <table className="striped-table">
        <thead>
          <tr className="th">
            <td> </td>
            <td>Rank</td>
            <td className="table-logo-column"></td>
            <td className="table-name-column">Name</td>
            <td>Price</td>
            <td>Market Cap</td>
            <td>VWAP(24Hr)</td>
            <td>Supply</td>
            <td>Volume(24Hr)</td>
            <td>Change(24Hr)</td>
          </tr>
        </thead>
        <tbody>
          {CurrencyData && CurrencyData.length > 0
            ? CurrencyData.map((item) => {
                return (
                  <tr className="td" key={item.rank}>
                    <td> </td>
                    <td>{item.rank}</td>
                    <td className="table-logo-column">
                            <img className="coinLogo"
                            src={symbol(item.symbol)}
                            alt="coinLogo"
                            />
                    </td>
                       
                    <td className="table-name-column">
                        <span id="content1" style={{fontSize:'10.0pt'}}>{item.name}</span>
                        <span id="content2" style={{fontSize:'8.0pt',color:' rgb(97, 100, 103)'}}>
                        {item.symbol}
                        </span>
                    </td>
                    <td>${(item.priceUsd / 1).toFixed(2)}</td>
                    <td>${(item.marketCapUsd / 1000000000).toFixed(2)}b</td>
                    <td>${(item.vwap24Hr / 1).toFixed(2)}</td>
                    <td>{(item.supply / 1000000).toFixed(2)}m</td>
                    <td>${(item.volumeUsd24Hr / 1000000000).toFixed(2)}b</td>
                    <td>{(item.changePercent24Hr / 1).toFixed(2)}%</td>
                  </tr>
                );
              }
              ) : "Currency Data Not Found"}
        </tbody>
      </table>
  );
};

/////// 

function Pagination() {
  const [currencyData, setCurrencyData] = useState([]);

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  // page navigation
  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(currencyData.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currencyData.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });


  const fetchData = () => {
    return fetch("https://api.coincap.io/v2/assets")
      .then((response) => response.json())
      .then((json) => setCurrencyData(json.data));
  };
  useEffect(() => {
    fetchData();
  }, []);


  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  return (
    <div>
      {renderData(currentItems)}
      <ul className="pageNumbers">
        <li>
          <button className="prev"
            onClick={handlePrevbtn}
            disabled={currentPage === pages[0] ? true : false}
          >
            Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}

        <li>
          <button className="next"
            onClick={handleNextbtn}
            disabled={currentPage === pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination