import React, {useEffect, useState} from 'react';
// @ts-ignore
import _take from 'lodash-es/take';
// @ts-ignore
import Pagination from 'react-js-pagination';
import InputField from '../filters/InputField';
import DropDownField from '../filters/DropDownField';

import {IFilmItem} from '../../types/IFilmItem';
import {IDropDownItem} from '../filters/DropDownField/DropDownField';

import './FilmsTable.scss'


interface IFilmsTableProps {
    filmsArray: IFilmItem[],
    onFilmClick: (selectedFilm: IFilmItem) => void,
}

const ITEMS_COUNT_PER_PAGE = 9;
const PAGE_RANGE_DISPLAYED = 10;

// Get unique array of film genres -> return in form, suitable for DropDown field
function getAllGenresTypes (filmsArray: IFilmItem[]): IDropDownItem[] {
    const genresSet = new Set();
    filmsArray.forEach(film => {
        film.genre.forEach(genre => {
            genresSet.add(genre);
        })
    })
    return Array.from(genresSet).map((genre) => {
        return {
            label: genre as string,
            value: genre as string,
        }
    });
}

const FilmsTable: React.VFC<IFilmsTableProps> = ({filmsArray, onFilmClick}) => {

    const [activePage, setActivePage] = useState<number>(1);
    const [searchValue, setSearchValue] = useState<string>('');
    const [genreFilter, setGenreFilter] = useState<string[]>([]);
    const [filteredFilms, setFilteredFilms] = useState<IFilmItem[]>([]);

    useEffect(() => {
        let filteredFilms = filmsArray;

        // Filter films by search field
        if (!!searchValue) {
            filteredFilms = filteredFilms.filter(film =>
                film.title.toLowerCase().includes(searchValue));
        }

        // Filter films by genres
        if (genreFilter.length > 0) {
            console.log(genreFilter)
            filteredFilms = filteredFilms
                .filter(film => genreFilter
                    .every(selectedGenre => film.genre
                            .find(filmGenre => filmGenre === selectedGenre)));
        }

        setFilteredFilms(filteredFilms);
        setActivePage(1);

    }, [filmsArray, searchValue, genreFilter]);


    const startPaginationIndex: number = (activePage - 1) * ITEMS_COUNT_PER_PAGE;
    const paginatedFilms: IFilmItem[] = _take(filteredFilms.slice(startPaginationIndex), ITEMS_COUNT_PER_PAGE);
    const genresOptions: IDropDownItem[] = getAllGenresTypes(filmsArray);

    return (
        <>
            <table className='FilmsTable'>
                <thead className='FilmsTable__head'>
                <tr>
                    <th> # </th>
                    <th> Films </th>
                    <th> Year </th>
                    <th> Runtime </th>
                    <th> Revenue </th>
                    <th> Rating </th>
                    <th> Genres </th>
                </tr>
                </thead>
                <tbody className='FilmsTable__body'>
                <tr className='FilmsTable__row'>
                    <td />
                    <td>
                        <InputField
                            onChange={value => setSearchValue(value)}
                        />
                    </td>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td>
                        <DropDownField
                            options={genresOptions}
                            onChange={(genresArray => setGenreFilter(genresArray))}
                        />
                    </td>
                </tr>
                {paginatedFilms.map((film, index) => (
                    <tr
                        className='FilmsTable__row'
                        key={index}
                        onClick={() => onFilmClick(film)}
                    >
                        <td>{startPaginationIndex + index + 1}</td>
                        <td>{film.title}</td>
                        <td>{film.year}</td>
                        <td>{film.runtime}</td>
                        <td>{film.revenue}</td>
                        <td>{film.rating}</td>
                        <td>{film.genre.join(', ')}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {filteredFilms.length > PAGE_RANGE_DISPLAYED && (
                <Pagination
                    className='Pagination'
                    activePage={activePage}
                    itemsCountPerPage={ITEMS_COUNT_PER_PAGE}
                    totalItemsCount={filteredFilms.length}
                    pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
                    onChange={(pageNumber: number) => setActivePage(pageNumber)}
                />
            )}
        </>
    )
}

export default FilmsTable;