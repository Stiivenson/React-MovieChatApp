import * as React from 'react';
import {useEffect, useState} from 'react';

import Preloader from './components/Preloader';
import FilmsTable from './components/FilmsTable';

import axios from 'axios';
import filmsData from './db/films';
import {IFilmItem} from './types/IFilmItem';

import './App.scss';


const App: React.VFC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [films, setFilms] = useState<IFilmItem[]>([]);

    useEffect(() => {
        // Loading films
        const fetchData = async () => {
            let films = [];

            // Trying to fetch data remotely
            try {
                const result = await axios(
                    'https://tender-mclean-00a2bd.netlify.app/web/movies.json'
                );
                films = result.data;
            }
            // If fetching fails (like CORS blocking), load films from local
            catch (error) {
                films  = filmsData;
            }
            // Load films array anyway
            finally {
                setFilms(films)
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

  return (
    <div className='AppWrapper'>
        <div className='AppWrapper__table-container'>
            {isLoading ?  <Preloader/> : <FilmsTable filmsArray={films} />}
        </div>
        <div className='AppWrapper__comments-container'>
        </div>
    </div>
  );
}

export default App;
