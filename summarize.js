// This is the function where the call to the API is made. Returns the summarized text as a string.
// We will be using Facebook’s “bart-large-cnn” model that is specialised for summerizing text
const axios = require('axios');

async function summarizeText(text) {
  let data = JSON.stringify({
    "inputs": text,
    "parameters": {
      "max_length": 120,
      "min_length": 50
    }
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer Your_API_Key_Here'
    },
    data : data
  };
  
    try {
      const response = await axios.request(config);
      return response.data[0].summary_text;
    }
    catch (error) {
      console.log(error);
    }
  
}

// Allows for summarizeText() to be called outside of this file
module.exports = summarizeText;