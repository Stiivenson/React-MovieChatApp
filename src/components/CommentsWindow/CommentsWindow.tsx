import React, {useEffect, useState} from 'react';

import firebase from "firebase/app";

import CommentItem from './views/CommentItem';
import {ReactComponent as EmailIcon} from './resources/mail.svg';
import {ReactComponent as CloseIcon} from './resources/close.svg';

import {IFilmItem} from '../../types/IFilmItem';

import './CommentsWindow.scss';

interface ICommentItem {
    id: string,
    text: string,
}

interface ICommentsWindowProps {
    selectedFilm: IFilmItem | null,
    onClose: () => void,
}

const COMMENTS_COLLECTION = 'comments';

const CommentsWindow: React.VFC<ICommentsWindowProps> = ({selectedFilm, onClose}) => {

    const [comments, setComments] = useState<ICommentItem[]>([]);
    const [docId, setDocId] = useState<string>('');
    const [userComment, setUserComment] = useState<string>('');

    const db = firebase.firestore();

    const getCommentsData = () => {
        db.collection(COMMENTS_COLLECTION)
            .where('filmTitle', '==', selectedFilm?.title || '')
            .where('filmYear', '==', selectedFilm?.year || '')
            .limit(1)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.exists)
                    console.log(doc.id, " => ", doc.data());
                    const comments = doc.data().comments;
                    setComments(comments);
                    setDocId(doc.id);
                });
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
       getCommentsData();
    }, [selectedFilm]);

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
                {comments.map(comment => (
                    <CommentItem
                        key={comment.id}
                        text={comment.text}
                    />
                ))}
            </div>
            <div className='CommentsWindow__footer'>
                <textarea
                    className='CommentsWindow__input-area'
                    value={userComment}
                    placeholder='Add comment...'
                    onChange={(event => setUserComment(event.target.value))}
                />
                <button
                    className='CommentsWindow__button'
                    onClick={() => {
                        const newComment = {
                            id: docId + 1,
                            name: '',
                            text: userComment,
                        };
                        db.collection(COMMENTS_COLLECTION)
                            .doc(docId)
                            .update({
                                comments: firebase.firestore.FieldValue.arrayUnion(newComment)
                            })
                            .then((res) => getCommentsData())
                            .catch((error) => console.log(error));
                    }}
                >
                    <EmailIcon />
                </button>
            </div>
        </div>
    );
}

export default CommentsWindow;