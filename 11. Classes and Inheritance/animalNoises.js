class Animal {
  constructor(name) {
    this.name = name;
  }

  static info() {
    return "I am an animal class.";
  }

  speak() {
    return `${this.name} makes a noise.`;
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // Call parent constructor
  }

  speak() {
    return `${super.speak()} ${this.name} barks!`;
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name);
  }

  speak() {
    return `${super.speak()} ${this.name} meows!`;
  }
}

const dog = new Dog("Rex");
const cat = new Cat("Bubsy");

console.log(Animal.info());


console.log(dog.speak()); // "Rex makes a noise. Rex barks!"
console.log(cat.speak()); // "Bubsy makes a noise. Bubsy meows!"