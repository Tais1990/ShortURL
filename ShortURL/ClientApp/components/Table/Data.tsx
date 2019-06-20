import * as React from 'react';
import UrlData from '../Model/UrlData';

interface DataProps {
    data: UrlData;
    update: Function;
    index: number;
    deleteFunction: Function;
    windowOrigin: string;
    editFunction: Function;
}

export default class Data extends React.Component<DataProps, {}> {

    render() {
        const { data, update, index, deleteFunction, windowOrigin, editFunction } = this.props;
        return (
            <tr onClick={() => update({ active: index })}>
                <td>{data.longUrl}</td>
                <td><a href={windowOrigin + data.shortUrl}>{windowOrigin + data.shortUrl}</a></td>
                <td>{data.countLink}</td>
                <td>{data.createdDate == null ? "" : data.createdDate.toString().replace('T', ' ')}</td>
                <td><a onClick={() => { deleteFunction(data.id); }}>Delete</a></td>
                <td><a onClick={() => { editFunction(data.id); }}>Edit</a></td>
            </tr>
        );
    }
};

