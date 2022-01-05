/*const nums = [1,2,3,4,5,6,7,8,9,10];

console.log(nums.map((a,b) => a*a));
console.log(nums.filter(a => a%2 === 0));
console.log(nums.reduce((result, item) => result*item, 1));

var pets = ['dog', 'chicken', 'cat', 'dog', 'chicken', 'chicken', 'rabbit'];

var countPets = pets.reduce((countArr, pet) => {
    if(!countArr.hasOwnProperty(pet))
        countArr[pet] = 1;
    else
        countArr[pet]++;
    return countArr;
}, []);

console.log(countPets);*/
/*
const nums = [1,2,3,4,5,6,7,8,9,10];

console.log([...nums]);
*/

/*
const HIGH_TEMPERATURES = {
    yesterday: 75,
    today: 77,
    tomorrow: 80
  };
  
  // Only change code below this line
  
  const {today, yesterday} = HIGH_TEMPERATURES
  
  // Only change code above this line
  console.log(yesterday);
  */
 /*
  const a = 9;
  console.log(`The num is ${a}`);
  */

  /*

  const result = {
    success: ["max-length", "no-amd", "prefer-arrow-functions"],
    failure: ["no-var", "var-on-top", "linebreak"],
    skipped: ["no-extra-semi", "no-dup-keys"]
  };
  function makeList(arr) {
    // Only change code below this line
    const failureItems = arr.map((value) => `<li class="text-warning">${value}</li>`);
    // Only change code above this line
  
    return failureItems;
  }
  
  const failuresList = makeList(result.failure);
  console.log(failuresList);
  */

  /*
  nums = [1,2,3,4];

  for(const a of nums){
      console.log(a);
  }*/

  /*
  let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
  };

  console.log(Object.keys(salaries).reduce( (max, currS) => salaries[max] > salaries[currS] ? max : currS, 0));

  */

  /*
  let hello = "   Hello, World!  ";
  let wsRegex = /\S+\s\S+/; // Change this line
  let result = hello.match(wsRegex); // Change this line

  //console.log(repeatRegex.test(repeatStr)); // Returns true

  console.log(result);*/

  /*
  function Dog(name) {
    this.name = name;
  }
  
  let beagle = new Dog("Snoopy");
  
  // Only change code below this line
  
  console.log(beagle.prototype.isPrototypeOf(Dog));
*/
console.log(String('a'));