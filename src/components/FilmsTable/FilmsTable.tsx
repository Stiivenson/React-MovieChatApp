import React from 'react';

import {IFilmItem} from '../../types/IFilmItem';

import './FilmsTable.scss'

interface IFilmsTableProps {
   filmsArray: IFilmItem[],
}

const FilmsTable:React.VFC<IFilmsTableProps> = ({filmsArray}) => {
    return (
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
            {filmsArray.map((film, index) => (
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
    )
}

export default FilmsTable;