import React, { useState, useEffect } from "react";

export const Table = (props) => {
  const [data, setData] = useState([]);
  const [token, setToken] = useState(props.token);

  useEffect(() => {
    const render = async () => {
      const response = await fetch("http://localhost:5000/data", {
        method: "GET",
        headers: {
          "x-api-key": token,
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await response.json();
      setData(data);
      console.log(data);
    };

    render();
  }, []);

  return (
    <div className="container content box">
      <h1>Data about the stuff</h1>
      <table className="table is-bordered is-hoverable" id="users">
        <thead>
          <tr>
            <th className="has-text-grey-lighter">ID</th>
            <th className="has-text-grey-lighter">Text</th>
          </tr>
        </thead>
        {data ? (
          data.map((elem, id) => {
            return (
              <tbody key={id}>
                <tr>
                  <td>{elem.id}</td>
                  <td>{elem.text}</td>
                </tr>
              </tbody>
            );
          })
        ) : (
          <tbody>
            <tr>
              <td>no data yet</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};
