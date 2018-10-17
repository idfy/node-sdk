# IDFY NodeJS CLient
NodeJS WEB SDK - Node module for integration with IDfy-API.

Util to request IDfy's Extraction and Verification Engine services.

## Installation

```bash


```

## Client-Initiation

- Setup your API key in the dashboard - [plans.idfy.com](plans.idfy.com)


##### Syntax :
```javascript
var client = new Client(apikey, account_id)
```
##### Example :
```javascript
var client = new Client("77484e44-db92-4a64-9584-0cc1798cd555", "e53992c5-6d6f-4d85-bc36-07f7442f91bc");
```
Please ensure the ***API_KEY*** and ***ACCOUNT_ID*** are included as a string.

### Usage

##### POST request
- Making API call to make service request.(Refer various ***services*** (or) ***task_types*** here - https://api-docs.idfy.com/v2/#task-types).

###### Syntax :
```javascript
var input_data = {
    request_id: "<REQUEST_ID>",
    task_id: "<TASK_ID>",
    group_id: "<GROUP_ID>"
    data: {
        key1: "<VALUE>",
        key2: "<VALUE>"
    }
}
var response = client.post_request(input_data, callback)

- Mandatory arguments: In ***input_data*** *(dictionary)*, ***task_type*** *(string)*, ***task_id*** *(string)*, ***data*** *(dictionary)*,  ***callback*** *(function)*
- Optional arguments: ***group_id*** *(string)*
- Ensure the ***task_type*** is exactly mentioned as found in the [doc](https://api-docs.idfy.com/v2/#task-types).
- Strictly stick to the request-schema respective to the task_types mentioned in the [doc](https://api-docs.idfy.com/v2/#task-types).
- ***request_id*** in the response body is a unique-id, which will be used to query the response of the api-call.
- Response to the above API-request:
```json
{
  "status": 202, 
  "request_id": "e53992c5-6d6f-4d85-bc36-07f7442f91bc"
}
```


##### **GET response**
- Making API call, to receive response from the request made in the above step. ***request_id*** - generated in the previous step, will be an argument to get the response.

###### Syntax :
```javascript
var input_data = {
    request_id: "<REQUEST_ID>",
    task_id: "<TASK_ID>",
    group_id: "<GROUP_ID>",

}
var ans = client.get_response(input_data,callback);
```

- Mandatory argument(s) - ***input_data*** (***request_id*** *(string)*), ***callback*** *(function)*.
- Response from the above the API-call:
```json
[
    {
        "status": "completed",
        "request_id": "e53992c5-6d6f-4d85-bc36-07f7442f91bc",
        "task_id": "4d48c187-53e5-4b6e-947a-04655eed588b",
        "group_id": "d468f87e-8e7b-4422-83eb-2edf4c1cfb95",
        "created_at": "2018-09-03T08:12:57+00:00",
        "completed_at": "2018-09-03T08:13:07+00:00",
        "tat": "10.081501662",
        "ocr_output": {
            "pan_number": "BJAPS7****",
            "pan_type": "Individual",
            "name_on_card": "Sr*****",
            "fathers_name": "Ven*******",
            "date_on_card": "1984-04-07",
            "date_of_issue": "2006-12-27",
            "age": 34,
            "is_scanned": false,
            "minor": false,
            "raw_text": "INCOME TAX DEPARTMENT\nGOVT OF INDIA\nSRXXXXXXX G V\nVEN********\n07/04/1984\nPermanent Account Number\nBJAPSXXXX\nSignature\n"
        }
    }
]            
```
                    