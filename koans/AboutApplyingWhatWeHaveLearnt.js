var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      productsICanEat = _.filter(products, function(product){
        return !product.containsNuts && !_.any(product.ingredients, function(ingredient){
          return ingredient === 'mushrooms';
        });
      });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _.range(1,1000).reduce(function(sum, num){
      if (num % 3 === 0 || num % 5 === 0){
        sum += num;
      }
      return sum;
    },0);    /* try chaining range() and reduce() */


    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    ingredientCount = _.reduce(
      _.flatten(
        _.map(products, function(product){
          return product.ingredients;
        })
      ), function(count, currentIngredient){
        if (!count.hasOwnProperty(currentIngredient)){
          count[currentIngredient] = 1;
        } else {
          count[currentIngredient] += 1;
        }
        return count;
    }, {});

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR ADVANCED */
  
  it("should find the largest prime factor of a composite number", function () {

    var largestPrimeFactor = function(number, largestPrime){

      for (var i = 2; i <= number; i++){
        if (i >= number){
          if (number > largestPrime){return number;}
          else {return largestPrime;}
        }

        if (number % i === 0){
          if (i > largestPrime){
            return largestPrimeFactor(number/i, i);
          }
        }
      }
    };

    expect(largestPrimeFactor(99, 0)).toBe(11);
  });
/*
  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    
  });
*/
/* uncomment to find smallest number divisible by 1 - 20
// working but takes over 30 seconds to compile
  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      
      var smallestNum = function(){
        var num = 1;
        while (true) {
          var allDivisible = true
          for (var i = 1; i <= 20; i++){
            if ((num % i) === 0 && allDivisible){}
            else {
              allDivisible = false;
            }  

            if (i === 20 && allDivisible){
              return num;
            }
          }
        num++;
        }
      }
    expect(smallestNum()).toBe(232792560);

  });
*/

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    var squareDiff = function(num1, num2){
      var sumSquare;
      var squareSum;

      sumSquare = (num1 * num1) + (num2 * num2);
      squareSum = (num1 + num2) * (num1 + num2);
      return sumSquare - squareSum;

    };

    expect(squareDiff(4, 5)).toBe(-40)
    
  });

  it("should find the 10001st prime", function () {
    var findPrime = function(){
      var prime = [2];
      var num = 3;
      while (!prime[10000]){

        var divisible = false;
        for (var i = 0; i < prime.length; i++){
          if (num % prime[i] === 0){
            divisible = true;
          }
        }

        if (divisible === false){
          prime.push(num);
        }

//        if (prime[10000]){return prime[10000];}
        num++;
      }
      return prime[10000];
    };

    expect(findPrime()).toBe(104743);

  });
  
});
