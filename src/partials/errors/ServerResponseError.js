function ServerResponseError({ error }) {
  return (
    <div>
      {Array.isArray(error) &&
        error.map((err, index) => (
          <p key={index}>
            &raquo; <span className='text-red-500'>{err.message}</span>
          </p>
        ))}
    </div>
  );
}

export default ServerResponseError;
