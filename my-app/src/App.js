import logo from './logo.svg';
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleJsonChange = (event) => {
    setJsonInput(event.target.value);
    setError('');
  };

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);

      // Call the backend API
      const response = await axios.post('https://qualifier-project-git-main-shivangs-projects-d02b1c5c.vercel.app/bfhl', parsedInput);
      setResponseData(response.data);
      setIsSubmitted(true);
    } catch (err) {
      setError('Invalid JSON or API request failed');
      setResponseData(null);
      setIsSubmitted(false);
    }
  };

  const handleOptionChange = (event) => {
    const value = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!responseData) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = responseData;
    return (
      <div>
        {selectedOptions.includes('Alphabets') && (
          <div>
            <h3>Alphabets:</h3>
            <p>{alphabets.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Numbers') && (
          <div>
            <h3>Numbers:</h3>
            <p>{numbers.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <div>
            <h3>Highest Lowercase Alphabet:</h3>
            <p>{highest_lowercase_alphabet.join(', ')}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Data Processor</h1>
        <textarea
          placeholder='Enter JSON here'
          value={jsonInput}
          onChange={handleJsonChange}
          rows={6}
          cols={50}
        />
        <br />
        <button onClick={handleSubmit}>Submit</button>
        {error && <p className="error">{error}</p>}
        {isSubmitted && (
          <>
            <h2>Select Data to Display:</h2>
            <select multiple={true} onChange={handleOptionChange}>
              <option value="Alphabets">Alphabets</option>
              <option value="Numbers">Numbers</option>
              <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
            </select>
            {renderResponse()}
          </>
        )}
      </header>
    </div>
  );
}

export default App;

