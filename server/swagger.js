'use strict';
/*
 * Code related to generating and emitting Swagger API docs.
 * 
 * Swagger has many pieces but the important bit for us is that
 * there's a JSON specification that can be used to describe the
 * structure of a REST API.  We are just using that specification
 * and exposing a description like that about our API.
 * 
 * There is a separate project called swagger-ui that renders these
 * specs as really nice documentation.  
 * 
 * Go here: http://petstore.swagger.io
 * Note the URL of the JSON spec in the top frame.  Plug into that
 * the URL of the route below (something like localhost:3000/swagger)
 * and swagger-ui will render our docs for us.
 * 
 * To check/validate what this outputs and verify conformance,
 * `npm install -g swagger-cli`
 * `swagger validate http://localhost:3000/swagger/`
 */
var router = require('express').Router();
const auth = require('./auth/auth.service');
const moment = require('moment');
const lodash = require('lodash/fp');
//var metaModel = require('../models/meta');

// Simply dump the JSON specification out.
// Up to someone else to provide swagger-ui.
// Auth not required (intentionally)
router.get('/', function(req, res, next) {
    return res.status(200).json(module.exports.specification);
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// And now, stuff related to generating dynamic swagger specs.
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

var pkg = require('../package.json');

// Format of this specification: http://swagger.io/specification/
var spec = {
    swagger: "2.0",
    info: {
        description: pkg.description,
        version: pkg.version,
        title: pkg.name,
        termsOfService: pkg.homepage,
        contact: { email: "peclajea@students.zhaw.ch" },
        license: { name: pkg.license, }
    },
    externalDocs: {},

    host: "localhost:9000",
    basePath: "/",

    // http://swagger.io/specification/#tagObject
    tags: [],

    schemes: ["http"],
    consumes: ["application/json",],
    produces: ["application/json",],

    security: [
        // http://swagger.io/specification/#securityRequirementObject
        {
            type: "apiKey",
            in: "header",
            name: "authorization",
        }
    ],

    paths: {
        // To be populated by noteEndpoint()
    },

    definitions: {
        Error: {
            type: "object",
            required: ["error"],
            properties: {
                error: { type: "string", },
                type: { type: "string" },
                when: { type: 'string', format: 'date-time' },
            }
        },
        Message: {
            type: "object",
            required: ["message"],
            properties: {
                message: { type: "string", },
                type: { type: "string" },
                when: { type: 'string', format: 'date-time' },
            }
        },
    },
    
    securityDefinitions: {
        usernamePasswordAuth: {
            type: 'apiKey',
            name: "authorization",
            in: 'header',
        }
    }
};

/**
 * Utility function for plugging in details of an endpoint into the
 * swagger spec.
 */
const noteEndpoint = function(path, options, tagName) {
    if (!tagName) { tagName = "Uncategorized"; }

    if (!(path in spec.paths)) {
        spec.paths[path] = {};
    }

    ['get', 'put', 'post', 'patch',
        'delete', 'options'].forEach((method) => {
            if (!(method in options)) { return; }
            if (!("tags" in options[method])) {
                options[method].tags = [tagName];
            } else if (options[method].tags.indexOf(tagName) === -1) {
                options[method].tags.push(tagName``);
            }
        });

    spec.paths[path] = lodash.merge(spec.paths[path], options);

    return true;
};

/**
 * Turn an ottoman model into a swagger specification.
 * http://swagger.io/specification/#definitionsObject
 * It turns out, swagger mostly reuses the JSON schema spec, which is a cool idea.
 *
const noteModel = function(model) {
    // console.log("noteModel " + model.name);
    if (!model.name) { return; }
    
    // Swagger definitions are in jsonSchema format.
    spec.definitions[model.name] = metaModel.schema(model);

    spec.definitions[model.name + "s"] = {
        type: 'array',
        items: metaModel.schemaRef(model)
    };

    var modelTag = {
        name: model.name,
        description: 'Ottoman model',
        externalDocs: {
            description: 'Wiki link for further information on data model',
            url: 'https://etopsag.atlassian.net/wiki/display/ON/Data+Model/' + model.name,
        } 
    };
    
    // Have we already added this tag?
    if(spec.tags.filter((tag) => { return tag.name === model.name; }).length === 0) {
        spec.tags.push(modelTag);
    }
};*/

// Take note of the single endpoint this module exposes.
noteEndpoint('/swagger', {
    'get': {
        summary: 'Get swagger specification for the API',
        description: '',
        operationId: 'swaggerSpec',
        parameters: [],
        responses: {
            "200": { description: "Swagger spec", },
        }
    }
}, "Swagger");

module.exports = {
    router: router,
    noteEndpoint: noteEndpoint,

    messageResponse: function(description) {
        return {
            description: (description || "No description available."),
            schema: { "$ref": "#/definitions/Message" },
            examples: {
                'application/json': {
                    message: 'Success',
                    type: 'message',
                    when: moment.utc().format()
                }
            }
        };
    },

    errorResponse: function(description) {
        return {
            description: (description || "No description available."),
            schema: { "$ref": "#/definitions/Error" },
            examples: {
                'application/json': {
                    error: 'Something went wrong: XYZ',
                    type: 'error',
                    when: moment.utc().format(),
                    details: {
                        stuff: 'things',
                    }
                }                
            }
        };
    },

    pathParam: function(name, description, type) {
        return {
            name: name,
            in: 'path',
            description: (description || "no description available"),
            type: (type || 'string'),
            required: true
        };
    },

    queryParam: function(name, description, type, format) {
        var base = {
            name: name,
            in: 'query',
            description: (description || "no description available."),
            required: false,
            type: (type || 'string')
        };

        if (format) { base.format = format; }

        return base;
    },
    /*
    modelResponse: function(description, model) {
        if (!description) { throw new Error("Bad arguments to modelResponse"); }

        if (!model && description) {
            model = description;
            description = model.name + " instance";
        }

        // Make sure the model is in definitions so the schema
        // reference will resolve, if applicable.
        if (!(model.name in spec.definitions)) {
            noteModel(model);
        }

        return {
            description: description,
            schema: metaModel.schemaRef(model),
        };
    },*/

    specification: spec,

    apiMessage: (msg) => {
        return {
            message: msg,
            type: 'message',
            when: moment.utc().format()
        };
    },

    apiError: (err, detail) => {
        return {
            error: err,
            type: 'error',
            when: moment.utc().format(),
            details: detail ? detail : {}
        };
    },
};
