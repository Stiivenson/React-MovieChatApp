import * as React from 'react';

import './ErrorMessage.scss';

interface IErrorMessageProps {
    message: string[],
    showMessage: boolean,
}

const ErrorMessage: React.VFC<IErrorMessageProps> = ({message, showMessage}) => {

    let errorMessageClass = ['ErrorMessage'];
    if (showMessage) {
        errorMessageClass.push('ErrorMessage_show');
    }

    return (
        <div className={errorMessageClass.join(' ')}>
            {message.map((text, index) => (
                <p key={index}>
                    {text}
                </p>
            ))}
        </div>
    )
}

export default ErrorMessage;