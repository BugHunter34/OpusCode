import { useState, useEffect } from 'react';
// Layout import removed!

export default function TestPage() {
  const [rootMessage, setRootMessage] = useState('');
  const [inputText, setInputText] = useState('');
  const [postResponse, setPostResponse] = useState('');

  useEffect(() => {
    fetch('https://api.opuscode.dev/') 
      .then((res) => res.json())
      .then((data) => setRootMessage(data.message))
      .catch((err) => console.error("Error fetching root:", err));
  }, []);

  // 2. Handle the POST request
  const handlePostRequest = async () => {
    try {
      const response = await fetch('https://api.opuscode.dev/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await response.json();
      setPostResponse(data.message);
    } catch (err) {
      console.error("Error posting data:", err);
    }
  };

  return (
    <>
      {/* Container to center the testing tools */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '40px 20px',
        minHeight: '50vh'
      }}>
        
        <h2>API Testing Page</h2>

        {/* Display GET response */}
        <div style={{ margin: '20px 0', padding: '15px', backgroundColor: '#f9f9f9', border: '1px solid #ddd', borderRadius: '8px', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <strong>Response from GET "/":</strong> 
          <p style={{ color: '#555', marginTop: '10px' }}>{rootMessage || "Loading..."}</p>
        </div>

        {/* Input and POST button */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message to send..."
            style={{ padding: '10px', width: '250px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button 
            onClick={handlePostRequest} 
            style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Send POST
          </button>
        </div>

        {/* Display POST response */}
        {postResponse && (
          <div style={{ color: 'green', fontWeight: 'bold', fontSize: '1.1rem', marginTop: '10px' }}>
            {postResponse}
          </div>
        )}

      </div>
    </>
  );
}