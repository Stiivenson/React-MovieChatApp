import React, {useState} from 'react';
// @ts-ignore
import Pagination from 'react-js-pagination';
// @ts-ignore
import _take from 'lodash-es/take';

import {IFilmItem} from '../../types/IFilmItem';

import './FilmsTable.scss'


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
    const paginatedFilms = paginate(filmsArray, activePage, ITEMS_COUNT_PER_PAGE)
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
            <Pagination
                className='Pagination'
                activePage={activePage}
                itemsCountPerPage={ITEMS_COUNT_PER_PAGE}
                totalItemsCount={filmsArray.length}
                pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
                onChange={(pageNumber: number) => setActivePage(pageNumber)}
            />
        </>
    )
}

export default FilmsTable;