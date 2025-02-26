// Implement a Student class with properties (name, grades) and methods to calculate final grade.

class Student {
    constructor(name) {
        this.name = name;
        this.grades = [];
    }

    addGrade(grade) {
        this.grades.push(grade);
    }

    calculateFinalGrade() {
        if (this.grades.length === 0) return 0;
        const sum = this.grades.reduce((acc, curr) => acc + curr, 0);
        return sum / this.grades.length;
    }
}

// Execution:
const student = new Student("Alice");
student.addGrade(90);
student.addGrade(85);
console.log(student.calculateFinalGrade()); // 87.5
