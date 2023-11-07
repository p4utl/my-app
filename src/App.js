
//importing what we need. Use state, to determine what state we are in at certain points
//importing axios, reading online i found this to be easier to parse json with than fetch, so i used that
//importing our style sheet, app.css
import React, {useState} from "react";
import Axios from "axios";
import "./App.css";
 
function App() {
 //declare our variables and set those use states as their default state
  const [data, setDict] = useState("");
  const [keyWord, setKeyWord] = useState(""); 
  const [disabled, setDisabled] = useState(false);
  const [show, setShow] = useState(true);
  //handle the clear button, sets the keyword as nothing, hides the definition
  const handleClear = () => {
    setKeyWord("");
    setShow(false);
  }
//on click event, the submit button will be disabled
  const onClickk = () => {
    setDisabled(true);
  };
 //this is where we pull our data based on teh keyword inputted by user 
  function getDefinition() {
    Axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyWord}`
    ).then((response) => {
      setDict(response.data[0]);
    });
  }
 //here is our return function, where we have our HTML and input box and buttons
  return (
    <div className="App">
      <h1>Try My Dictionary</h1>
      <div className="searchBox">
        <input type="text" placeholder="Enter a word..." value={keyWord} onChange={(e) => setKeyWord(e.target.value)}></input>
         <button disabled={disabled} data={''} onClick={() => {getDefinition(); onClickk();}} >Get Definition</button>
        <button onClick={handleClear}>Clear</button>
      </div>



      {show && data && ( //here is where we parse our data below, show is where we either hide or show our definition (based on the show/setShow variables)
        <div className="showResults">
          <h2>Definition:</h2>
           <p>{data.meanings[0].definitions[0].definition}</p>
        </div>
      )}
    </div>
  );
}
 
export default App;
