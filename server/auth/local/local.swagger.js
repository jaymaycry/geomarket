import swagger from '../../swagger';
module.exports = {
  post: {
    'post': {
      summary: 'Login of a user.',
      description: '',
      operationId: 'login',
      parameters: [
        {
          name: 'login',
          in: 'body',
          required: true,
          schema: {
            "type": "object",
            "properties": {
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
        "401": swagger.errorResponse("Not authenticated."),
        "404": swagger.errorResponse("Something went wrong, please try again.")
      }
    }
  }
}