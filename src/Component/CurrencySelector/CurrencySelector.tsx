import React, { useState, useEffect } from 'react';
import CurrencyCard from './CurrencyCard';
import { IoIosArrowRoundUp } from "react-icons/io";

interface Currency {
  name: string;
  symbol: string;
}

const CurrencySelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD-$');

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('https://api-staging.bitdelta.com/api/v1/public/fiat-currency', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCurrencies(data.data.currencies);
          //setSelectedCurrency(data.data.currencies.find((c: Currency) => c.default).name);
        } else {
          console.error('Failed to fetch currencies from the API');
        }
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    fetchCurrencies();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCurrencySelect = (currency: Currency) => {
    setIsOpen(false);
    setSelectedCurrency(`${currency.name}-${currency.symbol}`);
  };

  return (
    <div className="currency-selector">
      <button className="currency-button" onClick={toggleDropdown}>
        {selectedCurrency} <IoIosArrowRoundUp className={`Arrow ${isOpen ? 'up' : 'down'}`}/>
      </button>
      {isOpen && <CurrencyCard currencies={currencies} onSelectCurrency={handleCurrencySelect} toggleDropdown={toggleDropdown} />}
    </div>
  );
};

export default CurrencySelector;
