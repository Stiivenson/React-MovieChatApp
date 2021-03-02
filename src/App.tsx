import * as React from 'react';
import FilmsTable from "./components/FilmsTable";

import './App.scss';

function App() {
  return (
    <div className='AppWrapper'>
        <div className='AppWrapper__table-container'>
            <FilmsTable />
        </div>
        <div className='AppWrapper__comments-container'>
        </div>
    </div>
  );
}

export default App;
