import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Coin from "./components/Coin";
import {FaSearch} from "react-icons/fa";

function App() {
  const [searchWord, setSearchWord] = useState("");
  const [listOfCoins, setListOfCoins] = useState([]);

  useEffect(()=>{
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
      (response)=>{
        setListOfCoins(response.data.coins);
        // console.log(response);
      }
    );
  },[]);

  const filteredCoins = listOfCoins.filter((coin)=>{
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  });

  return (
    <div className="App">
      <div className="cryptoHeader">
        <FaSearch
          style={{
            color:"white",
            marginRight: "10px",
            height: "25px",
            width: "25px"
          }}
        />
        <input
          type="text"
          placeholder="Search..." 
          onChange={(e)=>{
            setSearchWord(e.target.value);
          }}
        />
      </div>
      <div className="cryptoDisplay">
          {filteredCoins.map((coin)=>{
            return(
              <Coin 
                name={coin.name}
                icon={coin.icon}
                price={coin.price}
                symbol={coin.symbol}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
