import React, { useState } from 'react';
import useWebSocketSubscription from './useWebSocketSubscription';

function ListComponent() {
  const [listItems, setListItems] = useState([]);

  useWebSocketSubscription('list', (value) => {
    setListItems((prevItems) => [...prevItems, value]);
  });

  return (
    <div>
      <h2>List Items</h2>
      <ul>
        {listItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListComponent;
