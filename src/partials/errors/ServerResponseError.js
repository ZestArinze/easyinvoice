function ServerResponseError({ error }) {
  return (
    <div>
      {Array.isArray(error) &&
        error.map((err, index) => (
          <p key={index}>
            <span className='text-red-500'>{err.field}</span> &raquo;{' '}
            {err.message}!
          </p>
        ))}
    </div>
  );
}

export default ServerResponseError;
