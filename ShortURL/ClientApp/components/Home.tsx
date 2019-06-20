import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Table from './Table';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return (<div>
            <a onClick={() => { this.props.history.push("/addurl") }}>Создать</a>
            <Table historyProps={this.props.history} />
        </div>)
    }
}
