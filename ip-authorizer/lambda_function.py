"""
-*- coding: utf-8 -*-
========================
AWS Lambda
========================
Contributor: Chirag Rathod (Srce Cde)
========================
"""

import os
from ipaddress import ip_network, ip_address
import uuid
import ast


def check_ip(IP_ADDRESS, IP_RANGE):
    VALID_IP = False
    cidr_blocks = list(filter(lambda element: "/" in element, IP_RANGE))
    if cidr_blocks:
        for cidr in cidr_blocks:
            net = ip_network(cidr)
            VALID_IP = ip_address(IP_ADDRESS) in net
            if VALID_IP:
                break
    if not VALID_IP and IP_ADDRESS in IP_RANGE:
        VALID_IP = True

    return VALID_IP


def lambda_handler(event, context):
    print(event)
    IP_ADDRESS = event["requestContext"]["identity"]["sourceIp"]
    IP_RANGE = ast.literal_eval(os.environ.get("IP_RANGE", "[]"))
    VALID_IP = check_ip(IP_ADDRESS, IP_RANGE)
    API_ID = event["requestContext"]["apiId"]
    ACC_ID = event["requestContext"]["accountId"]
    METHOD = event["requestContext"]["httpMethod"]
    STAGE = event["requestContext"]["stage"]
    ROUTE = event["requestContext"]["path"]
    print(VALID_IP)
    if VALID_IP:

        response = {
            "principalId": "user",
            "policyDocument": {
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Action": [
				"apigateway:DELETE",
				"apigateway:PUT",
				"apigateway:PATCH",
				"apigateway:POST",
				"apigateway:GET",
                "execute-api:Invoke"
			],
			"Resource": "*"
		}
	]
    }
}
        print(response)
        return response

    response = {
            "principalId": "user",
            "policyDocument": {
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Deny",
			"Action": [
				"apigateway:DELETE",
				"apigateway:PUT",
				"apigateway:PATCH",
				"apigateway:POST",
				"apigateway:GET",
                "execute-api:Invoke"
			],
			"Resource": "*"
		}
	]
    }
}

    return response