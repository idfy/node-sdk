/*
Tasks Schema
*/
'use strict';

class Tasks{
    //Task schema details
    constructor(){
        this.tasks_config = {
            'v2':
                {
                    'data_schema': {
                        'pan_ocr': {'mandate_fields': ['doc_url'], 'optional_fields': [], 'any': []},
                        'pan_verification': {'mandate_fields': ['pan_number', 'pan_name'],
                                             'optional_fields': [], 'any': []},
                        'aadhaar_ocr': {'mandate_fields': ['doc_url', 'aadhaar_consent'],
                                        'optional_fields': [], 'any': []},
                        'cheque_ocr': {'mandate_fields': ['doc_url'], 'optional_fields': [], 'any': []},
                        'voter_ocr': {'mandate_fields': ['doc_url'], 'optional_fields': [], 'any': []},
                        'voter_verification': {'mandate_fields': ['voter_number', 'voter_name'],
                                               'optional_fields': [], 'any': []},
                        'driving_license_ocr': {'mandate_fields': ['doc_url'],
                                                'optional_fields': [], 'any': []},
                        'driving_license_details': {'mandate_fields': ['dl_number', 'date_of_birth'],
                                                    'optional_fields': [], 'any': []},
                        'passport_ocr': {'mandate_fields': ['doc_url'],
                                         'optional_fields': [], 'any': []},
                        'company_details': {'mandate_fields': [],
                                            'optional_fields': [], 'any': ['company_name', 'cin']},
                        'coi_ocr': {'mandate_fields': ['doc_url'],
                                    'optional_fields': [], 'any': []},
                        'coi_verification': {'mandate_fields': [],
                                             'optional_fields': [], 'any': ['company_name', 'cin']},
                        'domain_identification': {'mandate_fields': ['company_name'],
                                                  'optional_fields': [], 'any': []},
                        'rc_verification': {'mandate_fields': ['vehicle_number'],
                                            'optional_fields': [], 'any': []},
                        'face_compare': {'mandate_fields': ['url_1', 'url_2'],
                                         'optional_fields': [], 'any': []},
                        'face_validation': {'mandate_fields': ['doc_url'],
                                            'optional_fields': [], 'any': []},
                        'pan_validation': {'mandate_fields': ['doc_url'],
                                           'optional_fields': [], 'any': []},
                        'gst_ocr': {'mandate_fields': ['doc_url'], 'optional_fields': [], 'any': []},
                        'gst_verification': {'mandate_fields': ['gstin'], 'optional_fields': [], 'any': []},
                        'aadhaar_verification': {'mandate_fields': ['aadhaar_number','aadhaar_name','aadhaar_consent'], 'optional_fields': [], 'any': []},
                    },
                    'available_tasks': [
                        'pan_ocr', 'pan_verification', 'aadhaar_ocr',
                        'cheque_ocr', 'voter_ocr', 'voter_verification',
                        'driving_license_ocr', 'driving_license_details',
                        'passport_ocr', 'company_details', 'coi_ocr',
                        'coi_verification', 'domain_identification',
                        'rc_verification', 'face_compare', 'face_validation',
                        'pan_validation','gst_ocr','gst_verification', 'aadhaar_verification'],
                },
            'v3':
                {
                    'data_schema': {
                        'createAadhaarOcrTask': {
                            'mandate_fields': ['task_id', 'data'],
                            'optional_fields': ['group_id'], 'any': []
                        },
                        'createChequeOcrTask': {
                            'mandate_fields': ['task_id', 'data'],
                            'optional_fields': ['group_id'], 'any': []
                        },
                        'createDLOcrTask': {
                            'mandate_fields': ['task_id', 'data'],
                            'optional_fields': ['group_id'], 'any': []
                        },
                        'createDLVerificationTask': {
                            'mandate_fields': ['task_id', 'data'],
                            'optional_fields': ['group_id'], 'any': []
                        },
                        'createFaceCompareTask': {
                            'mandate_fields': ['task_id', 'data'],
                            'optional_fields': ['group_id'], 'any': []
                        },
                        'createFaceValidationTask': {
                            'mandate_fields': ['task_id', 'data'],
                            'optional_fields': ['group_id'], 'any': []
                        },
                        'createPanOcrTask': {
                            'mandate_fields': ['task_id', 'data'],
                            'optional_fields': ['group_id'], 'any': []
                        },
                        'createPanVerificationTask': {
                            'mandate_fields': ['task_id', 'data'],
                            'optional_fields': ['group_id'], 'any': []
                        },
                        'createPanValidationTask': {
                            'mandate_fields': ['task_id', 'data'],
                            'optional_fields': ['group_id'], 'any': []
                        },
                        'createVoterOcrTask': {
                            'mandate_fields': ['task_id', 'data'],
                            'optional_fields': ['group_id'], 'any': []
                        },
                        'createVoterVerificationTask': {
                            'mandate_fields': ['task_id', 'data'],
                            'optional_fields': ['group_id'], 'any': []
                        },
                        'createPassportOcrTask': {
                            'mandate_fields': ['task_id', 'data'],
                            'optional_fields': ['group_id'], 'any': []
                        },
                        'createNameCompareTask': {
                            'mandate_fields': ['task_id', 'data'],
                            'optional_fields': ['group_id'], 'any': []
                        },
                        'aadhaarOcrResult': {'mandate_fields': ['request_id'], 'optional_fields': [],
                                             'available_output_fields': [
                                                 'status', 'request_id', 'task_id',
                                                 'group_id', 'aadhaar_number',
                                                 'name_on_card', 'gender',
                                                 'year_of_birth', 'address',
                                                 'date_of_birth', 'district', 'error',
                                                 'message', 'pincode', 'state',
                                                 'street_address', 'is_scanned', 'raw_text',
                                             ]},
                        'chequeOcrResult': {'mandate_fields': ['request_id'], 'optional_fields': [],
                                            'available_output_fields': [
                                                'status', 'request_id', 'task_id',
                                                'group_id', 'account_name', 'account_no',
                                                'account_type', 'bank_address',
                                                'bank_name', 'ifsc_code', 'error',
                                                'message', 'raw_text',
                                            ]},
                        'dlOcrResult': {'mandate_fields': ['request_id'], 'optional_fields': [],
                                        'available_output_fields': [
                                            'status', 'request_id', 'task_id',
                                            'group_id', 'error', 'message', 'address',
                                            'date_of_birth', 'date_of_validity',
                                            'dl_number', 'name_on_card',
                                            'fathers_name',
                                            'raw_text',
                                        ]},
                        'dlVerificationResult': {'mandate_fields': ['request_id'],
                                                 'optional_fields': [],
                                                 'available_output_fields': [
                                                     'status', 'request_id', 'task_id',
                                                     'group_id', 'error', 'message',
                                                     'cov_details',
                                                     'badge_details', 'date_of_issue',
                                                     'dl_number', 'dob', 'dl_status',
                                                     'id_status', 'last_transacted_at',
                                                     'non_transport_valid_from',
                                                     'non_transport_valid_to', 'transport_valid_from',
                                                     'transport_valid_to',
                                                     'retry_count', 'next_try_at', 'raw_text',
                                                 ]},
                        'faceCompareResult': {'mandate_fields': ['request_id'], 'optional_fields': [],
                                              'available_output_fields': [
                                                  'status', 'request_id', 'task_id',
                                                  'group_id', 'error', 'face_1',
                                                  'face_2', 'match_band', 'match_score', 'message',
                                              ]},
                        'faceValidationResult': {'mandate_fields': ['request_id'],
                                                 'optional_fields': [],
                                                 'available_output_fields': [
                                                     'status', 'request_id', 'task_id',
                                                     'group_id', 'error', 'message',
                                                     'liveness',
                                                 ]},
                        'panOcrResult': {'mandate_fields': ['request_id'], 'optional_fields': [],
                                         'available_output_fields': [
                                             'status', 'request_id', 'task_id',
                                             'group_id', 'error', 'message',
                                             'date_of_issue',
                                             'date_on_card', 'fathers_name', 'is_scanned',
                                             'minor', 'name_on_card',
                                             'pan_number', 'pan_type',
                                             'raw_text',
                                         ]},
                        'panVerificationResult': {'mandate_fields': ['request_id'],
                                                  'optional_fields': [],
                                                  'available_output_fields': [
                                                      'status', 'request_id', 'task_id',
                                                      'group_id', 'error', 'message',
                                                      'id_status', 'first_name',
                                                      'middle_name', 'last_name', 'gender',
                                                      'name_match_result', 'pan_name',
                                                      'pan_number', 'type',
                                                  ]},
                        'panValidationResult': {'mandate_fields': ['request_id'], 'optional_fields': [],
                                                'available_output_fields': [
                                                    'tampering_detection', 'basic_validation',
                                                    'request_id', 'task_id',
                                                    'group_id', 'error', 'message', 'status',
                                                ]},
                        'voterOcrResult': {'mandate_fields': ['request_id'], 'optional_fields': [],
                                           'available_output_fields': [
                                               'status', 'request_id', 'task_id',
                                               'group_id', 'error', 'message',
                                               'name_on_card',
                                               'date_on_card', 'voter_number',
                                               'fathers_name', 'raw_text',
                                           ]},
                        'voterVerificationResult': {'mandate_fields': ['request_id'],
                                                    'optional_fields': [],
                                                    'available_output_fields': [
                                                        'request_id', 'task_id', 'group_id',
                                                        'id_status', 'error',
                                                        'rln_number', 'message', 'type',
                                                        'name', 'voter_number', 'ac_name', 'ac_no',
                                                        'gender', 'district',
                                                        'house_no', 'part_no',
                                                        'ps_lat_long', 'ps_name', 'section_no',
                                                        'st_code', 'state',
                                                        'match_result', 'last_update',
                                                    ]},
                        'passportOcrResult': {'mandate_fields': ['request_id'], 'optional_fields': [],
                                              'available_output_fields': [
                                                  'date_of_birth', 'date_of_expiry', 'date_of_issue',
                                                  'error', 'given_name', 'group_id',
                                                  'message', 'passport_number', 'place_of_issue',
                                                  'raw_text', 'request_id',
                                                  'status', 'surname', 'task_id',
                                              ]},
                        'nameCompareResult': {'mandate_fields': ['request_id'], 'optional_fields': [],
                                              'available_output_fields': [
                                                  'request_id', 'status', 'task_id',
                                                  'group_id', 'name_compare_response',
                                              ]},
                    },
                    'available_tasks': [
                        'createAadhaarOcrTask', 'createChequeOcrTask', 'createDLOcrTask',
                        'createFaceCompareTask', 'createFaceValidationTask', 'createPanOcrTask',
                        'createPanVerificationTask', 'createPanValidationTask',
                        'createVoterOcrTask', 'createVoterVerificationTask', 'createDLVerificationTask',
                        'createPassportOcrTask', 'createNameCompareTask', 'aadhaarOcrResult',
                        'chequeOcrResult', 'dlOcrResult',
                        'dlVerificationResult', 'faceCompareResult', 'faceValidationResult',
                        'panOcrResult', 'panVerificationResult',
                        'panValidationResult', 'voterOcrResult', 'voterVerificationResult',
                        'passportOcrResult', 'nameCompareResult'],
                }
        };
    }
    

}
module.exports = Tasks;
