// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Intern extends Employee {

    // constructor for new Intern object which extends from Employee
    constructor(name,id,email,school) {
        super(name,id,email);
        this.school = school;
    }

    // return functions
    getSchool() {
        return this.school;
    }
    getRole() {
        return "Intern";
    }

}

module.exports = Intern;