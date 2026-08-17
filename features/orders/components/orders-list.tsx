import React from 'react';
import { type Order as OrderType } from '../types';
import { Order } from './order';

type Props = {
  filtered: OrderType[];
  setSelected: React.Dispatch<React.SetStateAction<OrderType | null>>;
};

export const OrdersList = ({ setSelected, filtered }: Props) => {
  return (
    <div className="grid gap-3">
      {filtered.map((order, i) => (
        <Order i={i} order={order} setSelected={setSelected} key={order.id} />
      ))}
    </div>
  );
};
