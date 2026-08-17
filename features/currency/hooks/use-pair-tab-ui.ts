import { useState } from 'react';
import { CurrencyReponse } from '../types';

export const usePairTabUi = () => {
  const [pairs, setPairs] = useState<CurrencyReponse[]>([]);
  const [currencies, setCurrencies] = useState<CurrencyReponse[]>([]);
  const [newFrom, setNewFrom] = useState('');
  const [newTo, setNewTo] = useState('');
  const [newRate, setNewRate] = useState('');
  const [newLabel, setNewLabel] = useState('');

  return {
    pairs,
    setPairs,
    currencies,
    setCurrencies,
    newFrom,
    setNewFrom,
    newTo,
    setNewTo,
    newRate,
    setNewRate,
    newLabel,
    setNewLabel,
  };
};
