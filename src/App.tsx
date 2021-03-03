import * as React from 'react';
import {useEffect, useState} from 'react';

import Preloader from './components/Preloader';
import FilmsTable from './components/FilmsTable';
import CommentsWindow from './components/CommentsWindow';

import axios from 'axios';
import filmsData from './db/films';
import {IFilmItem} from './types/IFilmItem';
import authorizeUser from './auth/authorization';

import './App.scss';


const App: React.VFC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedFilm, setSelectedFilm] = useState<IFilmItem | null>(null);
    const [openComments, setOpenComments] = useState<boolean>(false);
    const [films, setFilms] = useState<IFilmItem[]>([]);

    useEffect(() => {
        // Authorize user -> generate random name in LocaleStorage
        authorizeUser();

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

    // Animate showing CommentsWindow
    let tableContainerClass = ['AppWrapper__table-container'];
    let commentsContainerClass = ['AppWrapper__comments-container '];
    if (openComments){
        tableContainerClass.push('AppWrapper__table-container_show-comments');
        commentsContainerClass.push('AppWrapper__comments-container_show-comments');
    }
    
  return (
    <div className='AppWrapper'>
        <div className={tableContainerClass.join(' ')}>
            {isLoading
                ?  <Preloader/>
                :  <FilmsTable
                        filmsArray={films}
                        onFilmClick={(selectedFilm) => {
                            setSelectedFilm(selectedFilm);
                            setOpenComments(true);
                        }}
                    />
            }
        </div>
        <div className={commentsContainerClass.join(' ')}>
            <CommentsWindow
                selectedFilm={selectedFilm}
                onClose={() => setOpenComments(false)}
            />
        </div>
    </div>
  );
}

export default App;
