import { useEffect, useState } from 'react';
import Navbar from './Component/Navbar/Navbar';
import Banner from './Component/Banner/Banner';
import CardComponent from './Component/CardComponent/CardComponent';
import TableComponent from './Component/TableComponent/TableComponent';
import NewsLetter from './Component/NewsLetter/NewsLetter';
import Footer from './Component/Footer/Footer';
import "./App.css";
import { FaBitcoin } from "react-icons/fa6";
import { FaEthereum } from "react-icons/fa";
import { SiRipple } from "react-icons/si";
import { SiBinance } from "react-icons/si";


function App() {
    const currentTheme = localStorage.getItem("current_theme");
    const [theme, setTheme] = useState<string>(currentTheme ? currentTheme : "light");

    useEffect(() => {
        localStorage.setItem("current_theme", theme);
    }, [theme]);

    return (
        <div className={`container ${theme}`}>
            <Navbar theme={theme} setTheme={setTheme} />
            <br />
            <br />
            <Banner />
           <div className="card-container">
                <CardComponent  pairSymbol="BTCUSDT" symbol={<FaBitcoin />} color="#778899" />
                <CardComponent  pairSymbol="ETHUSDT" symbol={<FaEthereum />} color="#C0C0C0" />
                <CardComponent  pairSymbol="XRPUSDT" symbol={<SiRipple />} color="#CEE6FD" />
                <CardComponent  pairSymbol="BNBUSDT" symbol={<SiBinance />} color="#D1CEFD" />
            </div>
          
            <TableComponent theme={theme} />
            <br />
            <br />
            <br />
            
            <NewsLetter theme={theme} />
            <br />
            <br />
            
    <Footer /> 
        </div>
    );
}

export default App;
