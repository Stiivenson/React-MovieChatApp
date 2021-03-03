import React, {useEffect, useState} from 'react';
// @ts-ignore
import Pagination from 'react-js-pagination';
// @ts-ignore
import _take from 'lodash-es/take';
import InputField from '../filters/InputField';
import {IFilmItem} from '../../types/IFilmItem';

import './FilmsTable.scss'
import DropDownField from "../filters/DropDownField";
import {IDropDownItem} from "../filters/DropDownField/DropDownField";


interface IFilmsTableProps {
   filmsArray: IFilmItem[],
}

const ITEMS_COUNT_PER_PAGE = 12;
const PAGE_RANGE_DISPLAYED = 10;

function paginate(items: IFilmItem[], pageNumber: number, pageSize: number): IFilmItem[] {
    const startIndex = (pageNumber - 1) * pageSize;
    return _take(items.slice(startIndex), pageSize);
}

const FilmsTable:React.VFC<IFilmsTableProps> = ({filmsArray}) => {

    const [activePage, setActivePage] = useState<number>(1);
    const [searchValue, setSearchValue] = useState<string>('');
    const [filteredFilms, setFilteredFilms] = useState<IFilmItem[]>([]);

    useEffect(() => {
        const filteredFilms = !!searchValue
            ? filmsArray.filter(film =>
                    film.title.toLowerCase().includes(searchValue))
            : filmsArray;

        setFilteredFilms(filteredFilms);
        setActivePage(1);
    }, [searchValue]);

    const paginatedFilms = paginate(filteredFilms, activePage, ITEMS_COUNT_PER_PAGE);

    const genresSet = new Set();
    filmsArray.map(film => {
        film.genre.map(genre => {
            genresSet.add(genre);
        })
    })

    const genresOptions = Array.from(genresSet).map((genre) => {
        return {
            label: genre,
            value: genre,
        }
    });

    return (
        <>
            <table className='FilmsTable'>
                <thead className='FilmsTable__head'>
                <tr>
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
                    <td>
                        <InputField onChange={(value: string) => setSearchValue(value)} />
                    </td>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td>
                        <DropDownField options={genresOptions}/>
                    </td>
                </tr>
                {paginatedFilms.map((film, index) => (
                    <tr
                        className='FilmsTable__row'
                        key={index}
                    >
                        <td>{film.title}</td>
                        <td>{film.year}</td>
                        <td>{film.runtime}</td>
                        <td>{film.revenue}</td>
                        <td>{film.rating}</td>
                        <td>{film.genre}</td>
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