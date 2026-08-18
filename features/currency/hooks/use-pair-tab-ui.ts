import { useState } from 'react';
import { Currency } from '../types';

export const usePairTabUi = () => {
  const [pairs, setPairs] = useState<Currency[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
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
