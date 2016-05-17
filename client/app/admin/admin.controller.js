'use strict';

(function() {

class AdminController {
  /**
   * @description constructor of the admin controller
   * @constructor
   * @param {User} User -Object of the user service
   */
  constructor(User) {
    // Use the User $resource to fetch all users
    this.users = User.query();
  }
 /**
  * @description Method to delete a user
  * @param {object} user -Object of the user to be deleted 
  */
  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}

angular.module('geomarketApp.admin')
  .controller('AdminController', AdminController);

})();
