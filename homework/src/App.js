import './App.scss';
import Search from './IconComponents/Search';
import Movie from './IconComponents/Movie';
import SearchEffect from './SearchEffect.js';
import React, {useState} from 'react';
import {DebounceInput} from 'react-debounce-input';

function App(){
  const [input, setInput] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <div className= "search-bar">
          <div className = "search-letters">
            <Movie className = "movie-svg"/>
              <DebounceInput id='header-search' placeholder='Enter movie name' name= 'search' className='enter' minLength={1} debounceTimeout={100} onChange={handleClick} autoComplete="off" />
          </div>
        </div>
        <button className= "search-button" onClick={handleClick}>
          <Search className='search'/>
        </button>
        <div className='searchResults'>
          <SearchEffect input={input} selectionHandler={input => setInput(input) }/>
        </div>
      </header>
     
    </div>
  );

  function handleClick(e) {
    if(document.getElementById('header-search').value.length >= 3)
    {
      
      setInput(document.getElementById('header-search').value);
    }
    else{
      setInput('');
    }
  }
}

export default App;
