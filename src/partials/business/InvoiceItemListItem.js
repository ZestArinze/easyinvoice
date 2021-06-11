export default function InvoiceItemListItem({ invoiceItem }) {
  return (
    <div>
      <div className='py-2'>
        {invoiceItem.name}
        {invoiceItem.unit_price}
        {invoiceItem.quantity}
        {invoiceItem.discount}
      </div>
      <hr />
    </div>
  );
}
