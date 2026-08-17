import React from 'react';
import { Order } from '../types';
import { EmptyFilters } from './empty-filters';
import { OrdersList } from './orders-list';

type Props = {
  filter: string;
  filtered: Order[];
  setSelected: React.Dispatch<React.SetStateAction<Order | null>>;
};

export const FilteredOrdersContent = ({
  filter,
  filtered,
  setSelected,
}: Props) => {
  return filtered.length === 0 ? (
    <EmptyFilters filter={filter} />
  ) : (
    <OrdersList filtered={filtered} setSelected={setSelected} />
  );
};
