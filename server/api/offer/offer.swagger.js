import swagger from '../../swagger';
module.exports = {
  query: {
    'get': {
      summary: 'Returns all offers within a given radius from the users location.',
      description: '',
      operationId: 'find',
      parameters: [
          {
              name: 'longitude',
              in: 'query',
              description: "Longitude of the users geolocation.",
              required: true,
              type: 'number'
          },
          {
              name: 'latitude',
              in: 'query',
              description: "Latitude of the users geolocation.",
              required: true,
              type: 'number'
          }
      ],
      responses: {
        "200": {
          "description": "Set of Offer instances within a radius around the users location.",
          "schema": {
            "type":"array",
            "items": {
              "type": "object",
              "properties": {
                "_id": {
                  "type": "string"
                },
                "name": {
                  "type": "string"
                },
                "description": {
                  "type": "string"
                },
                "loc": {
                  "type": "array",
                  "items": {
                    "type": "number"
                  }
                },
                "price": {
                  "type": "number"
                },
                "active": {
                  "type": "boolean"
                },
                "__v": {
                  "type": "number"
                },
                "comments": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "_creator": {
                        "type": "string"
                      },
                      "date": {
                        "type": "string"
                      },
                      "text": {
                        "type": "string"
                      }
                    }
                  }
                },
                "viewCounter": {
                  "type": "number"
                },
                "endDate": {
                  "type": "string"
                },
                "startDate": {
                  "type": "string"
                },
                "picture": {
                  "type": "string"
                } 
              }
            }
          }  
        },
        "500": swagger.errorResponse("Error.")
      }
    }
  },
  get: {
    'get': {
      summary: 'Returns an Offer.',
      description: '',
      operationId: 'get',
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
          "description": "Offer instance.",
          "schema": {
            "type": "object",
            "properties": {
              "_id": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "description": {
                "type": "string"
              },
              "loc": {
                "type": "array",
                "items": {
                  "type": "number"
                }
              },
              "price": {
                "type": "number"
              },
              "active": {
                "type": "boolean"
              },
              "__v": {
                "type": "number"
              },
              "comments": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "_creator": {
                      "type": "string"
                    },
                    "date": {
                      "type": "string"
                    },
                    "text": {
                      "type": "string"
                    }
                  }
                }
              },
              "viewCounter": {
                "type": "number"
              },
              "endDate": {
                "type": "string"
              },
              "startDate": {
                "type": "string"
              },
              "picture": {
                "type": "string"
              } 
            }
          }  
        },
        "404": swagger.errorResponse("Offer not found."),
        "500": swagger.errorResponse("Error.")
      }
    }
  },
  post: {
    'post': {
      summary: 'Creates an Offer.',
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
              "_id": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "description": {
                "type": "string"
              },
              "loc": {
                "type": "array",
                "items": {
                  "type": "number"
                }
              },
              "price": {
                "type": "number"
              },
              "active": {
                "type": "boolean"
              },
              "__v": {
                "type": "number"
              },
              "comments": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "_creator": {
                      "type": "string"
                    },
                    "date": {
                      "type": "string"
                    },
                    "text": {
                      "type": "string"
                    }
                  }
                }
              },
              "viewCounter": {
                "type": "number"
              },
              "endDate": {
                "type": "string"
              },
              "startDate": {
                "type": "string"
              },
              "picture": {
                "type": "string"
              } 
            }
          }
        }
      ],
      responses: {
        "200": {
          "description": "Offer instance.",
          "schema": {
            "type": "object",
            "properties": {
              "_id": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "description": {
                "type": "string"
              },
              "loc": {
                "type": "array",
                "items": {
                  "type": "number"
                }
              },
              "price": {
                "type": "number"
              },
              "active": {
                "type": "boolean"
              },
              "__v": {
                "type": "number"
              },
              "comments": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "_creator": {
                      "type": "string"
                    },
                    "date": {
                      "type": "string"
                    },
                    "text": {
                      "type": "string"
                    }
                  }
                }
              },
              "viewCounter": {
                "type": "number"
              },
              "endDate": {
                "type": "string"
              },
              "startDate": {
                "type": "string"
              },
              "picture": {
                "type": "string"
              } 
            }
          }  
        },
        "401": swagger.errorResponse("Not authenticated."),
        "404": swagger.errorResponse("Offer not found."),
        "500": swagger.errorResponse("Error.")
      }
    }
  },
  patch: {
    'patch': {
      summary: 'Updates an Offer.',
      description: '',
      operationId: 'update',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          type: 'string'
        },
        {
          name: 'offer',
          in: 'body',
          required: true,
          type: "object",
          schema: {
            "type": "object",
            "properties": {
              "_id": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "description": {
                "type": "string"
              },
              "loc": {
                "type": "array",
                "items": {
                  "type": "number"
                }
              },
              "price": {
                "type": "number"
              },
              "active": {
                "type": "boolean"
              },
              "__v": {
                "type": "number"
              },
              "comments": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "_creator": {
                      "type": "string"
                    },
                    "date": {
                      "type": "string"
                    },
                    "text": {
                      "type": "string"
                    }
                  }
                }
              },
              "viewCounter": {
                "type": "number"
              },
              "endDate": {
                "type": "string"
              },
              "startDate": {
                "type": "string"
              },
              "picture": {
                "type": "string"
              } 
            }
          }
        }
      ],
      responses: {
        "200": {
          "description": "Offer instance.",
          "schema": {
            "type": "object",
            "properties": {
              "_id": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "description": {
                "type": "string"
              },
              "loc": {
                "type": "array",
                "items": {
                  "type": "number"
                }
              },
              "price": {
                "type": "number"
              },
              "active": {
                "type": "boolean"
              },
              "__v": {
                "type": "number"
              },
              "comments": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "_creator": {
                      "type": "string"
                    },
                    "date": {
                      "type": "string"
                    },
                    "text": {
                      "type": "string"
                    }
                  }
                }
              },
              "viewCounter": {
                "type": "number"
              },
              "endDate": {
                "type": "string"
              },
              "startDate": {
                "type": "string"
              },
              "picture": {
                "type": "string"
              } 
            }
          }  
        },
        "401": swagger.errorResponse("Not authenticated."),
        "404": swagger.errorResponse("Offer not found."),
        "500": swagger.errorResponse("Error.")
      }
    }
  },
  delete: {
    'delete': {
      summary: 'Returns an Offer.',
      description: '',
      operationId: 'delete',
      parameters: [
          {
              name: 'id',
              in: 'path',
              required: true,
              type: 'string'
          }
      ],
      responses: {
        "204": swagger.messageResponse("Offer deleted."),
        "401": swagger.errorResponse("Not authenticated."),
        "404": swagger.errorResponse("Offer not found."),
        "500": swagger.errorResponse("Error.")
      }
    }
  },
  addComment: {
    'put': {
      summary: 'Add a comment to an offer.',
      description: '',
      operationId: 'addComment',
      parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string'
          },
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              "type": "object",
              "properties": {
                "_creator": {
                  "type": "string"
                },
                "date": {
                  "type": "string"
                },
                "text": {
                  "type": "string"
                }
              }
            }
          }
      ],
      responses: {
        "200": {
          "description": "Offer instance.",
          "schema": {
            "type": "object",
            "properties": {
              "_id": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "description": {
                "type": "string"
              },
              "loc": {
                "type": "array",
                "items": {
                  "type": "number"
                }
              },
              "price": {
                "type": "number"
              },
              "active": {
                "type": "boolean"
              },
              "__v": {
                "type": "number"
              },
              "comments": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "_creator": {
                      "type": "string"
                    },
                    "date": {
                      "type": "string"
                    },
                    "text": {
                      "type": "string"
                    }
                  }
                }
              },
              "viewCounter": {
                "type": "number"
              },
              "endDate": {
                "type": "string"
              },
              "startDate": {
                "type": "string"
              },
              "picture": {
                "type": "string"
              } 
            }
          }  
        },
        "401": swagger.errorResponse("Not authenticated."),
        "404": swagger.errorResponse("Offer not found."),
        "500": swagger.errorResponse("Error")
      }
    }
  }
}