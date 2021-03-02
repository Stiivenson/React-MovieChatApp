import * as React from 'react';
import {useEffect, useState} from 'react';

import Preloader from './components/Preloader';
import FilmsTable from './components/FilmsTable';

import axios from 'axios';
import {IFilmItem} from './types/IFilmItem';

import './App.scss';


const App: React.VFC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [films, setFilms] = useState<IFilmItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://tender-mclean-00a2bd.netlify.app/web/movies.json'
            );
            setFilms(result.data);
            setIsLoading(false);
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
