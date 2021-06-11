export default function ClientListItem({ client }) {
  return (
    <div className='py-2'>
      <h3>{client.name}</h3>
      <p>{client.email}</p>
    </div>
  );
}
