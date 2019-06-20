import * as React from 'react';
import Data from './Data';
import UrlData from '../Model/UrlData';
import { RouteComponentProps, Redirect } from 'react-router';
// костыль для работы ослика
import { polyfill } from 'es6-promise';
import 'whatwg-fetch'; 
import Error from '../Error';

interface TableDataState {
    urlList: UrlData[];
    loading: boolean;
    active: 0;
    windowOrigin: string;
    error: boolean;
}

interface RouteParams { historyProps: any }


export default class Table extends React.Component<RouteParams, TableDataState>  {

    constructor() {
        // костыль для работы ослика
        polyfill();

        super();
        this.state = { urlList: [], loading: true, active: 0, windowOrigin: "", error: false };

        fetch('api/all')
            .then(response => response.json() as Promise<UrlData[]>)

            .then(data => {
                this.setState({ urlList: data, loading: false });
            })
            .catch(e => {
                this.setState({ error: true });
            });
    }
    componentDidMount() {
        if (typeof window !== 'undefined') {
            this.setState({ windowOrigin: window.location.origin + '/' });
        }
    }

    render() {
        let contents = this.state.error
            ? <Error message="К сржалению, база не актуальна, пожалуйста, проверьте строку подключение. Или выполнителе init.sql" title="Ошибка" />
            : this.state.loading
                ? <p><em>Loading...</em></p>
                : this.renderTable(this.state.urlList, this.updateData.bind(this));
        return <div>
            {contents}
        </div>;
    }
 
    private renderTable(urlList: UrlData[], update: Function) {
        const urls = urlList.map((url, index) => {
            return (<Data
                data={url}
                index={index}
                key={`url-${index}`}
                update={update}
                deleteFunction={this.handleDelete.bind(this)}
                windowOrigin={this.state.windowOrigin}
                editFunction={this.handleEdit.bind(this)} />);
        });

        return <table className='table'>
            <thead>
                <tr>
                    <th>Длинный URL</th>
                    <th>Короткий URL</th>
                    <th>Количество переходов</th>
                    <th>Дата создания</th>
                </tr>
            </thead>

            <tbody>
                {/*urlList.map(url =>
                    <Data data={url} />
                )*/urls}
            </tbody>
        </table>;
    }
    // пеерименовать
    // аппендикс для обработки щелчка на запись в таблице
    private updateData(config: any) {
        //console.log("updateData");
        //console.log(config);
        this.setState(config);
    }

    // Handle Delete request for an url  
    private handleDelete(id: number) {
        if (!confirm("Вы уверены, что хотите удалить запись?"))
            return;
        else {
            fetch('api/Delete/' + id, {
                method: 'get'
            }).then(data => {
                this.setState(
                    {
                        urlList: this.state.urlList.filter((url) => {
                            return (url.id != id);
                        })
                    });
            });
        }
    }
    private handleEdit(id: number) {
        this.props.historyProps.push("/edit/" + id);
    }
};