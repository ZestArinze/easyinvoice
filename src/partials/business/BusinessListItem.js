export default function BusinessListItem({ business }) {
  return (
    <div className='py-2'>
      <h3>{business.business_name}</h3>
      <p>{business.email}</p>
    </div>
  );
}
