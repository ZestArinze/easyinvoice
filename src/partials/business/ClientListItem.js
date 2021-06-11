export default function ClientListItem({ client }) {
  return (
    <div className='py-2'>
      <p>
        {client.name} ({client.email})
      </p>
    </div>
  );
}
