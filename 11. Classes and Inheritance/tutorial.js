class Animal {
  constructor(name) {
    this.name = name;
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

const dog = new Dog("Rex");
console.log(dog.speak()); // "Rex makes a noise. Rex barks!"