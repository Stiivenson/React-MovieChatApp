import * as React from 'react';

import CommentItem from './views/CommentItem';
import {ReactComponent as EmailIcon} from './resources/mail.svg';
import {ReactComponent as CloseIcon} from './resources/close.svg';

import {IFilmItem} from '../../types/IFilmItem';

import './CommentsWindow.scss';


interface ICommentsWindowProps {
    selectedFilm: IFilmItem | null,
    onClose: () => void,
}

const CommentsWindow: React.VFC<ICommentsWindowProps> = ({selectedFilm, onClose}) => {
    return (
        <div className='CommentsWindow'>
            <div className='CommentsWindow__header'>
                <h1 className='CommentsWindow__title'>
                    {selectedFilm?.title} - Comments
                </h1>
                <CloseIcon
                    className='CommentsWindow__close'
                    onClick={onClose}
                />
            </div>
            <div className='CommentsWindow__body'>
                <CommentItem text='Hello world!' />
            </div>
            <div className='CommentsWindow__footer'>
                        <textarea
                            className='CommentsWindow__input-area'
                            placeholder='Add comment...'
                        />
                <button className='CommentsWindow__button'>
                    <EmailIcon />
                </button>
            </div>
        </div>
    );
}

export default CommentsWindow;