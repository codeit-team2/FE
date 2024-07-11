import React, { useState } from 'react';

import axios from 'axios';

export default function ApiTest() {
  const [text, setText] = useState('');

  const postText = async () => {
    try {
      const res = await axios.post('https://hobbyzone-instance-083440.duckdns.org/api/test', {
        text: text,
      });
      const products = res.data;
      console.log('Response:', products);
    } catch (error) {
      console.error('Error posting text:', error);
    }
  };

  return (
    <div className="flex gap-10 p-10">
      <h1>ApiTest</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
        className="border border-black"
      />
      <button onClick={postText} className="border border-black">
        Send Text
      </button>
    </div>
  );
}
