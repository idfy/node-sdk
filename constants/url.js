/*
v2 and v3 api endpoints
*/
'use strict';
const url_v2 = 'https://api.idfystaging.com/v2/tasks';
const url_v3 = 'https://tasks.idfystaging.com/graphql';

class Url{
    static get BASE_URL_V2(){
        return url_v2;
    } 
    static get BASE_URL_V3(){
        return url_v3;
    }
}
module.exports = Url;
