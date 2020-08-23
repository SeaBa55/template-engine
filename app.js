// require statments
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// path inwhich to create output file team.html
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// require htmlRender.js script
const render = require("./lib/htmlRenderer");

// array cointaining constructed Emplyee objects
const teamArray = [];


// *************************************************************************************
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// *************************************************************************************


// array of questions for inquirer
const questions = [
    {
        type: "list", name: "buildTeam",
        message: "Would you like to build an engineering team?",
        choices: ["Yes", "No (Quit)"],
    },
    {
        type: "list", name: "action",
        message: "What would you like to do?",
        choices: ["Add Member (+)","Remove Member (-)","Quit"],
    },
    {
        type: "input", name: "name",
        message: "Enter new employee's name",
    },
    {
        type: "list", name: "nameRemove",
        message: "Select employee name",
        // find or add a variable that keeps track of current employees
        choices: ["currentEmployees"],
        // search for how to implement dynamic choices
    },
    {
        type: "list", name: "role",
        message: "Select new employee's role designation",
        choices: ["Manager","Engineer","Intern","Other"],
    },
    {
        type: "input", name: "id",
        message: "Enter new employee's id",
    },
    {
        type: "input", name: "email",
        message: "Enter new employee's email",
    },
    {
        type: "input", name: "officeNumber",
        message: "Enter Manager's office designation",
    },
    {
        type: "input", name: "github",
        message: "Enter Engineer's GitHub username",
    },
    {
        type: "input", name: "school",
        message: "Enter Intern's school",
    },

];

// function to deploy user prompts to the CL terminal
function userPrompt() {
    return inquirer.prompt(questions);
}

// ***************************************************************************************
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// ***************************************************************************************

// userPrompt call then await data
userPrompt()
.then(function(data) {

    // if roll selected is "Manager" then push new Manager object to teamArray 
    if(data.role == "Manager") {
        const manager = new Manager(data.name,data.id,data.email,data.officeNumber);
        teamArray.push(manager);
    // if roll selected is "Engineer" then push new Engineer object to teamArray  
    }else if(data.role == "Engineer"){
        const engineer = new Engineer(data.name,data.id,data.email,data.officeNumber);
        teamArray.push(engineer);
    // if roll selected is "Intern" then push new Intern object to teamArray 
    }else if(data.role == "Intern"){
        const intern = new Intern(data.name,data.id,data.email,data.school);
        teamArray.push(intern);
    }else{
        console.log("aborted");
        return
    }

    // potentially use writeToFile for persistant storage of teamArray
    // writeToFile("team.md",teamArray);

    // outputSend call passing html output data from render(teamArray)
    outputSend(render(teamArray));

})
.then(function(){

    // print "success to terminal/console"
    console.log("success");
})
.catch(function(error) {
    console.log(error);
});

// ***************************************************************************************
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// ***************************************************************************************

//  function recives render function output and passes it to fs.writeFile to store data in outputPath
function outputSend(data) {
    fs.writeFile(outputPath,data,'utf8',function(error) {
        if(error) throw error;
        console.log("output served")
    });
}

// ***************************************************************************************
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
// ***************************************************************************************