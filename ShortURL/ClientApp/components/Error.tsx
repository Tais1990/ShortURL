import * as React from 'react';
interface DataProps {
    title: string;
    message: string;
}

export default class Error extends React.Component<DataProps, {}> {

    render() {
        const { title,  message } = this.props;
        return (
            <div>
                <h2>{title}</h2>
                <div>{message}</div>
                <a href="/">На главную страницу</a>
            </div>
        );
    }
};
