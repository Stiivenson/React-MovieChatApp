import React, {useEffect, useState} from 'react';
import firebase from 'firebase/app';

import Preloader from '../Preloader';
import ErrorMessage from './views/ErrorMessage';
import CommentItem from './views/CommentItem';
import {ReactComponent as EmailIcon} from './resources/mail.svg';
import {ReactComponent as CloseIcon} from './resources/close.svg';
import {ReactComponent as EmptyIcon} from './resources/empty.svg';

import {IFilmItem} from '../../types/IFilmItem';

import './CommentsWindow.scss';


interface ICommentItem {
    id: string,
    text: string,
    name: string
}

interface ICommentsWindowProps {
    selectedFilm: IFilmItem | null,
    onClose: () => void,
}

// Generate unique ids for each comment
const UIDGenerator = require('uid-generator');
const uidgener = new UIDGenerator();

// Collection name in firebase
const COMMENTS_COLLECTION = 'comments';

const CommentsWindow: React.VFC<ICommentsWindowProps> = ({selectedFilm, onClose}) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isCommentLoading, setCommentLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string[]>([]);

    const [docId, setDocId] = useState<string>('');
    const [comments, setComments] = useState<ICommentItem[]>([]);
    const [userComment, setUserComment] = useState<string>('');

    const db = firebase.firestore();

    // Create new doc in collection, with selected film data
    const createDoc = () => {
        db.collection(COMMENTS_COLLECTION)
            .add({
                'filmTitle': selectedFilm?.title || '',
                'filmYear': selectedFilm?.year || '',
                'comments': [],
            })
            .then((docRef) => {
                console.log('Document been created - happy commenting :)');
                setDocId(docRef.id);
                setComments([]);
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    }

    const getCommentsData = () => {
        db.collection(COMMENTS_COLLECTION)
            .where('filmTitle', '==', selectedFilm?.title || '')
            .where('filmYear', '==', selectedFilm?.year || '')
            .limit(1)
            .get()
            .then((querySnapshot) => {

                // If there's no doc for selected film -> let's create a new one
                if (querySnapshot.empty) {
                    return createDoc();
                }

                // Load comments for selected film
                querySnapshot.forEach((doc) => {
                    const comments = doc.data().comments;
                    setComments(comments);
                    setDocId(doc.id);
                    setIsLoading(false);
                });
            })
            .catch((error) => console.log(error));
    }

    const showErrorMessage = (message: string[]) => {
        setErrorMessage(message);
        setTimeout(() => setErrorMessage([]), 4000);
    }

    useEffect(() => {
        // Reset data in component
        setIsLoading(true);
        setErrorMessage([]);
        setUserComment('');

        if (!!selectedFilm) {
            getCommentsData();
        }

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
            {isLoading
            ? <Preloader/>
            : (
                <div className='CommentsWindow__body'>
                    {comments.length > 0 && (
                        comments.map(comment => (
                            <CommentItem
                                key={comment.id}
                                text={comment.text}
                                userName={comment.name}
                            />
                        ))
                    ) || (
                        <div className='CommentsWindow__empty'>
                            <EmptyIcon />
                            <p> There's no comments yet. </p>
                            <p> Be the first :) </p>
                        </div>
                    )}
                </div>
                )}
            <div className='CommentsWindow__footer'>
                <textarea
                    className='CommentsWindow__input-area'
                    value={userComment}
                    placeholder='Add comment...'
                    onChange={(event => setUserComment(event.target.value))}
                />
                {isCommentLoading
                ? (
                    <div className='CommentsWindow__preloader-container'>
                        <Preloader/>
                    </div>
                  )
                : (
                    <button
                        className='CommentsWindow__button'
                        onClick={() => {

                            const newComment = {
                                id: uidgener.generateSync(),
                                name: localStorage.getItem('name') || '',
                                text: userComment,
                            };

                            // Prevent sending empty comment
                            if (!userComment) {
                                showErrorMessage([
                                    'Don`t  forget to enter your comment.',
                                ]);
                                return null;
                            }

                            setCommentLoading(true);
                            db.collection(COMMENTS_COLLECTION)
                                .doc(docId)
                                .update({
                                    comments: firebase.firestore.FieldValue.arrayUnion(newComment)
                                })
                                .then(() => {
                                    // After successful saving -> add new comment in state, loading it again is overhead
                                    const buffer = [...comments];
                                    buffer.push(newComment);
                                    setComments(buffer);
                                    setUserComment('');
                                    setCommentLoading(false);
                                })
                                .catch(() => {
                                    setCommentLoading(false);
                                    showErrorMessage([
                                        'Something went wrong!',
                                        'Please, try to send comment again',
                                        'or reload page :('
                                    ]);
                                });
                        }}>
                        <EmailIcon />
                    </button>
                )}
            </div>
            <ErrorMessage
                message={errorMessage}
                showMessage={errorMessage.length > 0}
            />
        </div>
    );
}

export default CommentsWindow;