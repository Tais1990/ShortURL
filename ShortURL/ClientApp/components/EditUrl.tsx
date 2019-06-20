import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import UrlData from './Model/UrlData';
// костыль для работы ослика
import { polyfill } from 'es6-promise';
import Error from './Error';


interface EditUrlDataState {
    title: string;
    loading: boolean;
    urlData: UrlData;
    windowOrigin: string;
    error: boolean;
}
interface RouteParams { id: string }

function isNumber(n: any) {
    return typeof (n) != "boolean" && !isNaN(n);
}

export class EditUrl extends React.Component<RouteComponentProps<RouteParams>, EditUrlDataState> {

    constructor(props: any) {
        // костыль для работы ослика
        polyfill();
        super(props);
        // Устанавливаем состояние
        this.state = {
            title: "",
            loading: true,
            urlData: new UrlData,
            windowOrigin: "",
            error : false
        };
        var id = this.props.match.params.id;
        if (isNumber(id) && Number(id) > 0) {
            fetch('api/details/' + id)
                .then(response => response.json() as Promise<UrlData>)
                .then(data => {
                    this.setState({ title: "Редактирование", loading: false, urlData: data });
                })
                .catch(e => { this.setState({ error: true, loading: true });})
                ;
        }
        else {
            this.state = { title: "Создание", loading: false, urlData: new UrlData, windowOrigin: "", error: false };
        }
 
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    componentDidMount() {
        if (typeof window !== 'undefined') {
            this.setState({ windowOrigin: window.location.origin + '/' });
        }
    }
    render() {
        let contents = this.state.error
            ? <Error message="К сржалению, данная запись уже не актуальна" title="Ошибка"/>
            : this.state.loading
                ? <p><em>Loading...</em></p>
                : this.renderCreateForm();
        return <div>
            <h1>{this.state.title}</h1>
            <hr />
            <a href="/">На главную страницу</a>
            {contents}
        </div>;
    }

 
    private handleSave(event: any) {
        event.preventDefault();
        const data = new FormData(event.target); 
        if (this.state.urlData.id) {
            fetch('api/edit', {
                method: 'PUT',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/");
                })
        }
        else {
            fetch('api/create', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    //console.log(responseJson);
                    this.props.history.push("edit/" + responseJson);
                })
        }
    } 
    private handleCancel(e: any) {
        e.preventDefault();
        this.props.history.push("/");
    }

    private renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="id" value={this.state.urlData.id} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Длинный URL</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="longUrl" defaultValue={this.state.urlData.longUrl} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="shortUrl">Короткий URL</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="shortUrl" defaultValue={this.state.urlData.shortUrl == null ? "" : this.state.windowOrigin + this.state.urlData.shortUrl} readOnly />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="countLink" >Количество переходов</label>
                    <div className="col-md-4">
                        <input className="form-control" type="number" name="countLink" defaultValue={this.state.urlData.countLink == null ? "" : this.state.urlData.countLink.toString()} disabled />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="createdDate" >Дата создания</label>
                    <div className="col-md-4">
                        <input className="form-control" type="datetime-local" name="createdDate" defaultValue={this.state.urlData.createdDate == null ? "" : this.state.urlData.createdDate.toString().replace('T', ' ')} disabled />
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >                
            </form >
            
        )
    }
}