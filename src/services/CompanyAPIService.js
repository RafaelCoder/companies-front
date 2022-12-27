import axios from 'axios';
import CompanyServiceAPIBase from './CompanyServiceAPIBase.js';

export default class CompanyAPIService extends CompanyServiceAPIBase {
    _instance = null;

    static getInstance(){
        if(!this._instance)
        this._instance =  new CompanyAPIService();
        return this._instance;
    }

    getCompanies(callback){
        axios.get(this._BaseURL+'company')
            .then((res) =>{
                callback(res);
            });
    }

    getCompany(id, callback){
        axios.get(this._BaseURL+'company/'+id)
            .then((res) =>{
                callback(res.data);
            });
    }

    postCompany(payload, callback){
        axios.post(this._BaseURL+'company', payload)
            .then((res) =>{
                callback(res);
            })
            .catch((err)=>console.log(err));
    }

    putCompany(payload, callback){
        axios.put(this._BaseURL+'company', payload)
            .then((res) =>{
                callback(res);
            })
            .catch((err)=>console.log(err));
    }

    delete(id, callback){
        axios.delete(this._BaseURL+'company/'+id)
            .then((res) =>{
                callback(res);
            })
            .catch((err)=>console.log(err));
    }
}