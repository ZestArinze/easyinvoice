export default function InvoiceListItem({ invoice }) {
  return (
    <>
      <div className='py-2'>
        <h3>
          {invoice.invoice_number} ({invoice.total})
        </h3>
      </div>
    </>
  );
}
