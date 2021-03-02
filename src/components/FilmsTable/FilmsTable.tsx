import * as React from 'react';

import './FilmsTable.scss'

const FilmsTable = () => {
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
            </tbody>
        </table>
    )
}

export default FilmsTable;