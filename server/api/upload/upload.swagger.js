import swagger from '../../swagger';
module.exports = {
  get: {
    'get': {
      summary: 'Returns a file.',
      description: '',
      operationId: 'get',
      parameters: [
          {
              name: 'filename',
              in: 'path',
              description: "",
              required: true,
              type: "string"
          }
      ],
      responses: {
        "200": {
          "description": "File.",
          "schema": {
            "type":"file"
          }  
        },
        "404": swagger.errorResponse("File not found.")
      }
    }
  },
  post: {
    'post': {
      summary: 'Uploads a file.',
      description: '',
      operationId: 'create',
      parameters: [
        {
          name: 'photo',
          in: 'body',
          required: true,
          type: "file"
        }
      ],
      responses: {
        "200": {
          "description": "File path.",
          "schema": {
            "type": "string"
          }
        },
        "401": swagger.errorResponse("Not authenticated."),
        "500": swagger.errorResponse("Error.")
      }
    }
  }
}