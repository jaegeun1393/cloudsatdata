export type AmplifyDependentResourcesAttributes = {
    "function": {
        "cloudsatfunction": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "usermanagement": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "api": {
        "cloudsatapi": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "cloudapi": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    }
}