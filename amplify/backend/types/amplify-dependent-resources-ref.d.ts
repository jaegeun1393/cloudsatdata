export type AmplifyDependentResourcesAttributes = {
    "api": {
        "cloudsatdata": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        },
        "gradingsat": {
            "ServiceName": "string",
            "ClusterName": "string",
            "PipelineName": "string",
            "ContainerNames": "string",
            "ApiName": "string",
            "RootUrl": "string"
        }
    },
    "auth": {
        "cloudsatdata": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "storage": {
        "s3cloudsatdatastorageb83a98ff": {
            "BucketName": "string",
            "Region": "string"
        }
    }
}