import React, { useState, useEffect } from 'react';
import './CurrencyCard.css';
import { RxCross2 } from "react-icons/rx";

interface Currency {
  id: number;
  name: string;
  symbol: string;
}

interface Props {
  currencies: Currency[];
  onSelectCurrency: (currency: Currency) => void;
  toggleDropdown: () => void;
}

const CurrencyCard: React.FC<Props> = ({ currencies, onSelectCurrency, toggleDropdown }) => {
  const [columns, setColumns] = useState<Currency[][]>([]);
  const itemsPerColumn = 4;

  useEffect(() => {
    const columnsArray: Currency[][] = [];
    for (let i = 0; i < currencies.length; i += itemsPerColumn) {
      columnsArray.push(currencies.slice(i, i + itemsPerColumn));
    }
    setColumns(columnsArray);
  }, [currencies, itemsPerColumn]);

  const handleCurrencySelect = (currency: Currency) => {
    onSelectCurrency(currency);
  };

  return (
    <div className="currency-card">
      <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>Select Currency</span>
        <span style={{ marginLeft: 'auto' }} onClick={toggleDropdown}>
          <RxCross2 />
        </span>
      </h2>

      <div className="scrollable-card">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="currency-column">
            {column.map((currency) => (
              <div
                key={currency.id}
                className="currency-item"
                onClick={() => handleCurrencySelect(currency)}
              >
                {currency.name}-{currency.symbol}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrencyCard;
