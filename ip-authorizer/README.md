# ip-authorizer
This is a lambda designed to be authorizer on an AWS API gateway. It checks the IP address of the incoming request and matches it to the allowed IP ranges configured in the environment variables.

## Environment Variables
IP_RANGE: A JSON string array where each item is a cidr block.