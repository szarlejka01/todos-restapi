import { useState, useEffect } from "react";

function Todos() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos`)
      .then((response) => {
        if (response.ok) return response.json();
        else {
          throw new Error(`HTTP error, status: ${response.status}`);
        }
      })
      .then((data) => {
        setData(data);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="todos">
      {loading && <h3>Loading ... </h3>}
      {error && <h3>{`Problem occured, error: ${error}`}</h3>}
      <h1>Todos</h1>
      <ol>
        {data &&
          data.map(({ id, userId, title, completed }) => (
            <li key={id}>
              <p>UserID: {userId}</p>
              <p>ID: {id}</p>
              <p>Title: {title}</p>
              <p>Completed: {String(completed)}</p>
            </li>
          ))}
      </ol>
    </div>
  );
}

export default Todos;
