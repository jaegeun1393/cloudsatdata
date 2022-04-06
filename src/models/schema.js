export const schema = {
    "models": {
        "Usersat": {
            "name": "Usersat",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "username": {
                    "name": "username",
                    "isArray": false,
                    "type": {
                        "enum": "Text"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "satid": {
                    "name": "satid",
                    "isArray": false,
                    "type": {
                        "enum": "Text"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "userid": {
                    "name": "userid",
                    "isArray": false,
                    "type": {
                        "enum": "Text"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Usersats",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {
        "Text": {
            "name": "Text",
            "values": [
                "VALUE"
            ]
        }
    },
    "nonModels": {},
    "version": "6391fb7bd1babc04035c3577cb5a6dc1"
};