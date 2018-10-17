'use strict';
const Tasks = require('./constants/tasks.js');
const Url = require('./constants/url.js')
const Utility = require('./utility/utility.js')
const BadRequestError = require('./errors.js')
var request = require("request");

class Client extends Tasks{

    constructor(apikey, account_id, options=null){
        super();
        this.validate_constructor(apikey,account_id);
        this.apikey = apikey;
        this.account_id = account_id;
        this.DEFAULTS = {};
        this.DEFAULTS['base_url_v2'] = Url.BASE_URL_V2;
        this.DEFAULTS['base_url_v3'] = Url.BASE_URL_V3;
        this.DEFAULTS['headers'] = {};
        this.DEFAULTS.headers['Content-Type'] = 'application/json';
        this.DEFAULTS.headers['apikey'] = this.apikey;
        this.DEFAULTS.headers['account_id'] = this.account_id;
        this.base_url = this.set_base_url(options);
        
        if (options != null){
            this.headers = this.validate_headers(options);
        }
        else{
            this.headers = this.DEFAULTS.headers;
        }
    }

    validate_constructor(apikey, account_id){
        if (typeof(apikey) != 'string'){
            throw new BadRequestError("Unexpected API_KEY format provided, expected string")
        }
        else if (typeof(account_id)!= 'string'){
            throw new BadRequestError("Unexpected ACCOUNT_ID format provided, expected string")
        }
    }

    set_base_url(options) {

        /*
        Set the api_endpoint based on client's initiation
        :param options: dict obj
        :return: api_endpoint url
        */
        var api_endpoint = this.DEFAULTS['base_url_v2'];
        if (options){
            if (options.indexOf('url') >= 0){
                if (typeof(options['url'] != 'string')){
                    throw new BadRequestError("URL is not a string");
                }
                else{
                    api_endpoint = options['url']
                }
            }
        }
        return api_endpoint;
    }

    validate_headers(options){
    /*
        Validate headers and update headers if provided during client initiation
        :param options: kwargs
        :return: headers
    */
        if (options.indexOf('headers') > -1){
            if (isDict(options.headers)){
                if (options.headers.indexOf('apikey') < 0){
                    throw new BadRequestError("No API key provided.");
                }
                for(key in options){
                    this.DEFAULTS.headers[key] = options[key];
                }
            }
            else{
                throw new BadRequestError("Invalid headers provided. Correct format : {'content-Type : 'application/json'}");
            }
        }
        return self.DEFAULTS['headers'];
    }

    post_request(input_data,callback){
        /*
        post_request to EVE-API
        :param task_type: task_type
        :param task_id: task_id
        :param data: part of the request_body
        :param group_id: group_id
        :return: API_request's request_id and status
        */
       if (!(input_data.task_type && input_data.task_id && input_data.data)){
           throw new BadRequestError("Expected all of these fields : task_type, task_id, data.");
       }
       var task_type = input_data.task_type;
       var task_id = input_data.task_id;
       var data = input_data.data;
       var group_id = input_data.group_id;

       var req_obj = new Utility(task_type,task_id,data,group_id);
       var req_body = req_obj.validate_request_arguments("v2"); //Specify api version here
       var req_options = { method: 'POST',
            url: this.base_url,
            headers: this.headers,
            body: req_body,
            json: true };
        
        request(req_options, function (error, response, body) {
            if (error) throw new Error(error);
            callback(body);
        });
    }

    get_response(input_data,callback){
        /*
        get request to retrieve response from EVE-API with request_id
        :param request_id: request_id
        :param group_id: group_id
        :param task_id: task_id
        :return: API_call's response
        */
       var params={};
       var request_id = input_data.request_id;
       var group_id = input_data.group_id;
       var task_id = input_data.task_id;

       if (!(request_id  || group_id || task_id)){
           throw new BadRequestError("Invalid request. Provide atleast one of request_id, task_id or group_id");
       }
       if (request_id && typeof(request_id)!= 'string'){
           throw new BadRequestError("Invalid request_id format. Expected format is string.");
       }else{
           params['request_id'] = request_id;
       }
       if (group_id && typeof(group_id)!= 'string'){
            throw new BadRequestError("Invalid group_id format. Expected format is string.");
        }else{
            params['group_id'] = group_id;
        }
        if (task_id && typeof(task_id)!= 'string'){
            throw new BadRequestError("Invalid task_id format. Expected format is string.");
        }else{
            params['task_id'] = task_id;
        }

        var req_options = { method: 'GET',
        url: this.base_url,
        qs: params,
        headers: this.headers };
    
        request(req_options, function (error, response, body) {
            if (error) throw new Error(error);
            callback(body);
            });
   
    }
}
var c = new Client("77484e44-db92-4a64-9584-0cc1798cd44e","accounkk");

function logStuff (userData) {
    if ( typeof userData === "string")
    {
        console.log(userData);
    }
    else if ( typeof userData === "object")
    {
        for (var item in userData) {
            console.log(item + ": " + userData[item]);
        }

    }

}

var i = {
    task_id: "152",
    task_type: "pan_ocr",
    data: { doc_url: 'https://s3-ap-southeast-1.amazonaws.com/addressify-demo/eve+api+images/Indonesia+NID/ktp.jpg' },
    group_id: "22"
}

var ii = {
    request_id: "f0e954eb-d949-47d6-8acd-c12d71803f08",
    task_id: "",
    group_id: "",

}
console.log(c.post_request(i, logStuff));
// console.log(c.get_response(ii,logStuff));
// console.log(c.post_request("pan_ocr","124",{ 'doc_url': 'https://s3-ap-southeast-1.amazonaws.com/addressify-demo/eve+api+images/Indonesia+NID/ktp.jpg' },"2",logStuff))
// console.log(c.DEFAULTS);
// console.log(c.get_response("f0e954eb-d949-47d6-8acd-c12d71803f08",null,null,logStuff));
