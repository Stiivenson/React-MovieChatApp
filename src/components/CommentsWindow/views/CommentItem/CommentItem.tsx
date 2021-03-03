import * as React from 'react';

import './CommentItem.scss';

interface ICommentItemProps {
    text: string,
    userName: string,
}

const CommentItem: React.VFC<ICommentItemProps> = ({text, userName}) => {

    const isMyComment = localStorage.getItem('name') === userName;

    let commentItemClass = ['CommentItem'];
    if (isMyComment) {
        commentItemClass.push('CommentItem_is-mine');
    }

    return (
        <div className={commentItemClass.join(' ')}>
            <div className='CommentItem__avatar'>
                {!!userName && (isMyComment ? 'Y' : userName[0].toUpperCase())}
            </div>
            <div className='CommentItem__body-container'>
                <div className='CommentItem__body'>
                    {text}
                </div>
                {userName && (
                    <div className='CommentItem__user-name'>
                        {isMyComment ? 'You' : userName}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentItem;