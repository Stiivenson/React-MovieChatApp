import * as React from 'react';

import './CommentItem.scss';

interface ICommentItemProps {
    text: string,
}

const CommentItem: React.VFC<ICommentItemProps> = ({text}) => {
    return (
        <div className='CommentItem'>
            <div className='CommentItem__avatar' />
            <div className='CommentItem__body'>
                {text}
            </div>
        </div>
    )
}

export default CommentItem;