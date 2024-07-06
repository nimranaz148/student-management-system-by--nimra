import inquirer from "inquirer";
class student {
    id;
    name;
    coursesEnrolled;
    feesAmount;
    constructor(id, name, coursesEnrolled, feesAmount) {
        this.id = id;
        this.name = name;
        this.coursesEnrolled = coursesEnrolled;
        this.feesAmount = feesAmount;
    }
}
let baseId = 10000;
let studentId = "";
let continueEnrollment = true;
let students = [];
do {
    let action = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: "Please select an option:\n",
        choices: ["Enroll a student", "Show student status"]
    });
    if (action.ans === "Enroll a student") {
        let studentName = await inquirer.prompt({
            type: "input",
            name: "ans",
            message: "Please Enter your name"
        });
        let trimmedStudentName = (studentName.ans).trim().toLowerCase();
        let studentNameChek = students.map(obj => obj.name);
        if (studentNameChek.includes(trimmedStudentName) === false) {
            if (trimmedStudentName !== "") {
                baseId++;
                studentId = "STID" + baseId;
                console.log("\n\tYour account hasbeen created");
                console.log(`WELCOME, ${trimmedStudentName}!`);
                let course = await inquirer.prompt({
                    type: "list",
                    name: "ans",
                    message: "Please select a course",
                    choices: ["English", "Math", "Computer"]
                });
                let coursefees = 0;
                switch (course.ans) {
                    case "English":
                        coursefees = 2000;
                        break;
                    case "Math":
                        coursefees = 2500;
                        break;
                    case "Computer":
                        coursefees = 3000;
                        break;
                }
                let courseConfirm = await inquirer.prompt({
                    type: "confirm",
                    name: "ans",
                    message: "Do you want to enroll in this course",
                });
                if (courseConfirm.ans === true) {
                    let Student = new student(studentId, trimmedStudentName, [course.ans], coursefees);
                    students.push(Student);
                    console.log("You have enroll in this course");
                }
            }
            else {
                console.log("Invalid name");
            }
        }
        else {
            console.log("This name is already exists");
        }
    }
    else if (action.ans === "Show student status") {
        if (students.length !== 0) {
            let studentNameschek = students.map(e => e.name);
            let selectedStudent = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: "please select a name",
                choices: studentNameschek
            });
            let foundStudent = students.find(Student => Student.name === selectedStudent.ans);
            console.log("Student information");
            console.log(foundStudent);
            console.log("\n");
        }
        else {
            console.log("Record is empty");
        }
    }
    let userConfirm = await inquirer.prompt({
        type: "confirm",
        name: "ans",
        message: "Do you want to continue?"
    });
    if (userConfirm.ans === false) {
        continueEnrollment = false;
    }
} while (continueEnrollment);
