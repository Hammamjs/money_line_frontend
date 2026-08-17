type Props = { colSpan?: number; message?: string };

export const EmptyOrders = ({
  colSpan = 5,
  message = 'No orders found',
}: Props) => {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="px-6 py-12 text-center text-muted-foreground"
      >
        {message}
      </td>
    </tr>
  );
};
