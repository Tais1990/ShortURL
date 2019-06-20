import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Error from './Error';


export class ErrorPage extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return (<div>
            <Error title = "404" message = "К сожалению, ресур недоступен" />
        </div>)
    }
}