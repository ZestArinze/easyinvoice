export default function BusinessListItem({ business }) {
  return (
    <div className='py-2'>
      <p>
        {business.business_name} ({business.email})
      </p>
    </div>
  );
}
