import axios from 'axios';
import CompanyServiceAPIBase from './CompanyServiceAPIBase.js';

export default class RoleAPIService extends CompanyServiceAPIBase {
    static getInstance(){
        return new RoleAPIService();
    }

    getRoles(callback){
        axios.get(this._BaseURL+'role')
            .then((res) =>{
                callback(res.data);
            });
    }

}