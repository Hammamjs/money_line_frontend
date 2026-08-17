import { useState } from 'react';

export const useOrderUi = () => {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  return {
    filter,
    setFilter,
    search,
    setSearch,
  };
};
