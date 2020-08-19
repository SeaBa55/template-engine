// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {

    // constructor for new Engineer object which extends from Employee
    constructor(name,id,email,github) {
        super(name,id,email);
        this.github = github;
    }

    // return functions
    getGithub() {
        return this.github;
    }
    getRole() {
        return "Engineer";
    }

}

module.exports = Engineer;