export default function InvoiceItemListItem({ invoiceItem }) {
  return (
    <tr>
      <td className='border border-green-600'>{invoiceItem.item}</td>
      <td className='border border-green-600'>{invoiceItem.unit_price}</td>
      <td className='border border-green-600'>{invoiceItem.quantity}</td>
      <td className='border border-green-600'>{invoiceItem.discount}</td>
      <td className='border border-green-600'>{invoiceItem.amount}</td>
    </tr>
  );
}
