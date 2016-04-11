# geomarket

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.5.0.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod --dbpath ~/path/to/db` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.
=======

# REST-API

## Offer-Model

### JSON-Example
```json
{
  __v: 0,
  _id: "570bd8e35bb80a0a7bef6945",
  active: true,
  comments: [
    {
      _creator: "470bd8e35bb80a0a7bef6945",
      date: "2016-04-12T05:03:31.934Z",
      text: "Das hier ist ein Kommentar!"
    },
    {
      _creator: "6u4h8e35bb80a0a7bef6945",
      date: "2016-04-12T05:03:31.934Z",
      text: "Das hier auch!"
    }
  ],
  description: "Offer description.",
  endDates: "2016-04-12T05:03:31.934Z",
  loc: [
    8.5276642,
    47.3547855
  ],
  name: "Offer title",
  picture: "http://link.ch/to/pic.jpg or /assets/images/placeholder.png",
  price: 100,
  startDate: "2016-04-11T17:03:31.934Z",
  viewCounter: 0
}
```
### List-GET-Request for query offers
url: /api/offers?latitude=47.377778899999996&longitude=8.5324395&limit=10&distance=30

method: GET

params:
 - latitude (required): Latitude of userposition
 - longitude (required): Longitude of userposition
 - limit: Number of Offers to load (Default: 10)
 - distance: Radius in km to search for offers (Default: 25km)

data: none.

requires: nothing.
 
### ID-GET-Request for specific offer
url: /api/offers/<offerId>

method: GET

params: none.

data: none.

requires: nothing.

### POST-Request to create offer
url: /api/offers/

method: POST

params: none.

data: <offer>

requires: 
  - authenticated

### PUT/PATCH-Request to update an offer
url: /api/offers/<offerId>

method: PATCH/PUT

params: none.

data: <updated offer attributes>

requires:
  - authenticated
  - user is creator

### DELETE-Request to delete an offer
url: /api/offers/<offerId>

method: DELETE

params: none.

data: none.

requires:
  - authenticated
  - user is creator

### PUT-Request to add a comment to an offer
url: /api/offers/<offerId>/comment

method: PUT

params: none.

data: <comment>

requires:
  - authenticated