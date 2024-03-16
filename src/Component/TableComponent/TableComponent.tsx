import React, { useState, useEffect } from 'react';
import "./TableComponent.css"
import TableLineChart from "./TableLineChart"

interface CoinData {
  keywords: string;
  last: number;
  change: number;
  volume: number;
  high: number;
  low: number;
  pricing: number[];
}

interface TableComponentProps {
  theme: string;
}

const TableComponent: React.FC<TableComponentProps> = ({ theme }) => {
  const [coinData, setCoinData] = useState<CoinData[]>([]);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch('https://api-staging.bitdelta.com/api/v1/market/pairs', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': 'BitdeltaExchange',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCoinData(data.data.spot);
        } else {
          console.error('Failed to fetch coin data');
        }
      } catch (error) {
        console.error('Error fetching coin data:', error);
      }
    };

    fetchCoinData();

    const intervalId = setInterval(fetchCoinData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="table-container">
      <h2 className={`${theme === 'dark' ? 'white-text' : ''}`}>Coin Price Table</h2>
      <div className="scrollable-table">
        <table className="coin-price-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Change</th>
              <th>Volume</th>
              <th>High</th>
              <th>Low</th>
              <th>Last 7 days</th>
            </tr>
          </thead>
          <tbody>
            {coinData.map((coin, index) => (
              <tr key={index}>
                <td>{coin.keywords}</td>
                <td style={{ color: coin.change < 1 ? 'red' : 'green' }}>${coin.last.toFixed(2)}</td>
                <td style={{ color: coin.change < 1 ? 'red' : 'green' }}>
                  {coin.change < 1 ? '↓' : '↑'}{coin.change.toFixed(2)}%
                </td>
                <td>${coin.volume.toFixed(2)}</td>
                <td>${coin.high.toFixed(2)}</td>
                <td>${coin.low.toFixed(2)}</td>
                <td className='chart'><TableLineChart change={coin.change} pricing={coin.pricing} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
