/*
Request object initiation and validation
*/
'use strict';
const Tasks = require('./../constants/tasks.js');
const BadRequestError = require('./../errors.js');
class Utility extends Tasks{
    //API request-object initiation and validation module
    constructor(task_type_,task_id_, data_, group_id_){
        super();
        
        this.task_type = task_type_;
        this.task_id = task_id_;
        this.data = data_;
        
        if (group_id_ !== null || group_id_ !==undefined){
            this.group_id = group_id_;
        }
        else{
            this.group_id = null;
        }
        
        this.DEFAULTS = {'tasks_config' : this.tasks_config};
        
    }

    update_api_body(){
        /*
        Update the api_body with
        :return: updated req_body
        */
       var req_body = {
        'tasks': [
            {
                'type': this.task_type,
                'task_id': this.task_id,
                'data': this.data
            }
        ]
    }
    if (this.group_id !== undefined){
        req_body['tasks'][0].group_id = this.group_id;
    }

    return req_body
    }

    validate_request_data(api_version){
    /*
        validate request_data. Checks presence of mandate_fields
        :return: None
    */
        if (typeof(api_version) != 'string'){
            throw new BadRequestError("api_version must be a string");
        }

        var input_data_keys = Object.keys(this.data);
        var all_task_data_fields = [];
        var task_schema = this.DEFAULTS['tasks_config'][api_version]['data_schema'][this.task_type];
        var mandate_task_data_fields = task_schema['mandate_fields'];
        
        // Checking presence of mandatory fields
        if (mandate_task_data_fields.length > 0){
            all_task_data_fields=all_task_data_fields.concat(mandate_task_data_fields);

            for (var field in mandate_task_data_fields){
                if (input_data_keys.indexOf(mandate_task_data_fields[field]) < 0){        //Checks for absence of key in array
                    throw new BadRequestError("Insufficient data fields provided. Expected mandatory fields in data object are : " + mandate_task_data_fields.join(', '));
                }
            }
        }
        var optional_task_data_fields = task_schema['optional_fields'];
        if (optional_task_data_fields.length > 0){
            all_task_data_fields=all_task_data_fields.concat(optional_task_data_fields);
        }
        var any_task_data_fields = task_schema['any'];
        if (any_task_data_fields.length > 0){           //Checking presence of any task fields
            all_task_data_fields.all_task_data_fields.concat(any_task_data_fields);
            var any_fields_flag = false;

            for (var k in any_task_data_fields){
                if (input_data_keys.indexOf(any_task_data_fields[k]) > -1){
                    any_fields_flag = true;
                    break;
                }
            }
            if (!any_fields_flag){      //Checking if at least one of any fields is provided
                throw new BadRequestError("Insufficient data-fields provided. Expected at least one of these fields : " + any_task_data_fields.join(', '));
            }
        }
        
        // Checking if any of the input data_fields are not required or empty    
        for (var i in input_data_keys){
            if (!this.data[input_data_keys[i]]){
                throw new BadRequestError("Empty value provided for key : " + input_data_keys[i]);
            }
            if (all_task_data_fields.indexOf(input_data_keys[i]) < 0 ){
                throw new BadRequestError("Unexpected data-field provided in data : "+ input_data_keys[i] + ", expected fields : " + all_task_data_fields.join(', '));
            }
        }    
    }

    validate_request_arguments(api_version){
        /*
        Validate json_body part of the api_request
        :return: req_body
        */
       if (!isDict(this.data)){
           throw new BadRequestError("Invalid data format. Expected format is dictionary, eg.: {'doc_url': '<URL>'}");
       }
       else if (this.data.length < 1){
           throw new BadRequestError("Empty data field provided");
       }
    //    console.log(this.DEFAULTS['tasks_config'][api_version]['available_tasks']);
       
       if (typeof(this.task_type) != 'string'){
            throw new BadRequestError("Invalid task_type format. Expected type is string, eg.: '<TASK_TYPE>'");
            return;
       }
       else if (this.task_type.length < 1){
           throw new BadRequestError("Empty task_type provided. Refer the doc for task_types - https://api-docs.idfy.com/v2/#task-types");
           return;
       }
       else if (this.DEFAULTS['tasks_config'][api_version]['available_tasks'].indexOf(this.task_type) < 0){
           throw new BadRequestError("Invalid task_type requested. Refer the doc for task_types - https://api-docs.idfy.com/v2/#task-types");
           return;
       }
       if (typeof(this.task_id) != 'string'){
        throw new BadRequestError("Invalid task_id format. Expected type is string, eg.: '<TASK_ID>'");
       }
       else if (this.task_id.length < 1){
           throw new BadRequestError(" Empty task_id provided ");
       }
       if (this.group_id != null){
           console.log(this.group_id, typeof(this.group_id));
            if (typeof(this.group_id) != 'string'){
                throw new BadRequestError("Invalid group_id format. Expected format is string, eg.: '<GROUP_ID>'");
            }
        }

        this.validate_request_data(api_version);
        var req_body = this.update_api_body();
        return req_body;
    
    }
}


function isDict(v) {
    return typeof v==='object' && v!==null && !(v instanceof Array) && !(v instanceof Date);
}
module.exports = Utility;


