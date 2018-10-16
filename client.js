'use strict';
const Tasks = require('./constants/tasks.js');
const Url = require('./constants/url.js')
const Utility = require('./utility/utility.js')
const BadRequestError = require('./errors.js')
class Client extends Tasks{

    constructor(autho ,options=null){
        super();
        this.auth = autho;
        this.DEFAULTS = {};
        this.DEFAULTS['base_url_v2'] = Url.BASE_URL_V2;
        this.DEFAULTS['base_url_v3'] = Url.BASE_URL_V3;
        this.DEFAULTS['headers'] = {};
        this.DEFAULTS.headers['Content-Type'] = 'application/json';
        this.DEFAULTS.headers['apikey'] = this.auth;
        this.base_url = this.set_base_url(options);

        if (options != null){
            this.headers = this.validate_headers(options);
        }
        else{
            this.headers = this.DEFAULTS.headers;
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

    post_request(task_type,task_id,data,group_id,callback){
        /*
        post_request to EVE-API
        :param task_type: task_type
        :param task_id: task_id
        :param data: part of the request_body
        :param group_id: group_id
        :return: API_request's request_id and status
        */
       var request = require("request");

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

    get_response(request_id=null,group_id=null,task_id=null,callback){
        /*
        get request to retrieve response from EVE-API with request_id
        :param request_id: request_id
        :param group_id: group_id
        :param task_id: task_id
        :return: API_call's response
        */
       var params={};
       if (request_id === null && group_id === null && task_id === null){
           throw new BadRequestError("Invalid request. Provide atleast one of request_id, task_id or group_id");
       }
       if (request_id != null && typeof(request_id)!= 'string'){
           throw new BadRequestError("Invalid request_id format. Expected format is string.");
       }else{
           params['request_id'] = request_id;
       }
       if (group_id != null && typeof(group_id)!= 'string'){
            throw new BadRequestError("Invalid group_id format. Expected format is string.");
        }else{
            params['group_id'] = group_id;
        }
        if (task_id != null && typeof(task_id)!= 'string'){
            throw new BadRequestError("Invalid task_id format. Expected format is string.");
        }else{
            params['task_id'] = task_id;
        }

        var request = require("request");

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
