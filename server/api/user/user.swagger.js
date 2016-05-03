import swagger from '../../swagger';
module.exports = {
  index: {
    'get': {
      summary: 'Set of user instances.',
      description: '',
      operationId: 'index',
      parameters: [],
      responses: {
        "200": {
          "description": "Set of User instances without password or salt attribute",
          "schema": {
            "type":"array",
            "items": {
              "type": "object",
              "properties": {
                "_id": {
                  "type": "string"
                },
                "__v": {
                  "type": "number"
                },
                "name": {
                  "type": "string"
                },
                "email": {
                  "type": "string"
                },
                "role": {
                  "type": "string"
                },
                "provider": {
                  "type": "string"
                }
              }
            }
          }
        },
        "401": swagger.errorResponse("Not authenticated."),
        "403": swagger.errorResponse("Forbidden."),
        "500": swagger.errorResponse("Error.")
      }
    }
  },
  show: {
    'get': {
      summary: 'Returns a user instance.',
      description: '',
      operationId: 'show',
      parameters: [
          {
              name: 'id',
              in: 'path',
              required: true,
              type: 'string'
          }
      ],
      responses: {
        "200": {
          "description": "User instance.",
          "schema": {
            "type": "object",
            "properties": {
              "_id": {
                "type": "string"
              },
              "__v": {
                "type": "number"
              },
              "name": {
                "type": "string"
              },
              "email": {
                "type": "string"
              },
              "role": {
                "type": "string"
              },
              "provider": {
                "type": "string"
              }
            }
          }
        },
        "401": swagger.errorResponse("Not authenticated."),
        "404": swagger.errorResponse("User not found."),
        "500": swagger.errorResponse("Error.")
      }
    }
  },
  create: {
    'post': {
      summary: 'Creates a User.',
      description: '',
      operationId: 'create',
      parameters: [
        {
          name: 'offer',
          in: 'body',
          required: true,
          type: "object",
          schema: {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "email": {
                "type": "string"
              },
              "password": {
                "type": "string"
              }              
            }
          }
        }
      ],
      responses: {
        "200": {
          "description": "Session token.",
          "schema": {
            "type": "object",
            "properties": {
              "token": {
                "type": "string"
              } 
            }
          }  
        },
        "422": swagger.errorResponse("Error.")
      }
    }
  },
  createAnonymous: {
    'post': {
      summary: 'Creates an anonymous User.',
      description: '',
      operationId: 'createAnonymous',
      parameters: [],
      responses: {
        "200": {
          "description": "Session token.",
          "schema": {
            "type": "object",
            "properties": {
              "token": {
                "type": "string"
              } 
            }
          }  
        },
        "422": swagger.errorResponse("Error.")
      }
    }
  },
  changePassword: {
    'put': {
      summary: 'Updates a user password.',
      description: '',
      operationId: 'changePassword',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          type: 'string'
        },
        {
          name: 'passwords',
          in: 'body',
          required: true,
          type: "object",
          schema: {
            "type": "object",
            "properties": {
              "oldPassword": {
                "type": "string"
              },
              "newPassword": {
                "type": "string"
              }
            }
          }
        }
      ],
      responses: {
        "204": swagger.messageResponse("Password changed."),
        "403": swagger.errorResponse("Authentication failed."),
        "422": swagger.errorResponse("Error.")
      }
    }
  },
  destroy: {
    'delete': {
      summary: 'Returns an Offer.',
      description: '',
      operationId: 'destroy',
      parameters: [
          {
              name: 'id',
              in: 'path',
              required: true,
              type: 'string'
          }
      ],
      responses: {
        "204": swagger.messageResponse("User deleted."),
        "401": swagger.errorResponse("Not authenticated."),
        "403": swagger.errorResponse("Forbidden."),
        "500": swagger.errorResponse("Error.")
      }
    }
  },
  me: {
    'get': {
      summary: 'Returns user instance of the current user.',
      description: '',
      operationId: 'me',
      parameters: [],
      responses: {
        "200": {
          "description": "Offer instance.",
          "schema": {
            "type": "object",
            "properties": {
              "_id": {
                "type": "string"
              },
              "__v": {
                "type": "number"
              },
              "name": {
                "type": "string"
              },
              "email": {
                "type": "string"
              },
              "role": {
                "type": "string"
              },
              "provider": {
                "type": "string"
              }
            }
          }
        },
        "401": swagger.errorResponse("Not logged in."),
        "404": swagger.errorResponse("Offer not found."),
        "500": swagger.errorResponse("Error")
      }
    }
  }
}