import React, {useState, useEffect} from 'react';
import MovieSvg from './IconComponents/Movie';
import './App.scss';

function SearchEffect(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    console.log(props);

    var input = props.input

    useEffect(() => {
      if(input !== '')
      {
        var url = 'https://api.themoviedb.org/3/search/movie?api_key=8b88321d722620bedcf56ac1522a4b25&language=en-US&query=' + input;
        document.getElementById('header-search').value = input;
        fetch(url)
            .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true);
                setItems(result['results']);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
            )
      }
    }, [input])

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    }
    try{
      return (
        <ul className= 'data'>
          <MovieSvg className = "resultMovie"/>
          <li className='line' > 
            <p className ='title'>
              {props.input}
              &nbsp;&nbsp;
            </p>
            <p className='average'>
              Enter a Movie name
            </p>
            <br/>
          </li>
          {items.slice(0,8).map(item => (
            <li className ='movie' key={item.id} onClick={() => props.selectionHandler(item.original_title)}  >
              <p className='title'>
                  {item.original_title}
              </p> 
              <p className='average'>
                  {item.vote_average} Rating, {item.release_date.slice(0,4)}
              </p>
            </li>
          ))}
        </ul>
      );
    } catch(error) {
        return <div>No results...</div>
    }
  }

  export default SearchEffect;