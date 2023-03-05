
class Emoji {
    constructor(name, email) {
      this.name = name;
      this.email = email;
    }
  
    sayHello() {
      console.log(`Hi, my name is ${this.name} and my email is ${this.email}.`);
    }
  }
  
module.exports = Emoji;