// Write code inside the functions
// You will have to figure out what parameters to include
// All functions must use recursion

function lengthOfString(str, len = 0) {
    // If the length is 0 (base case), return len (0).
    // if (str.length === 0) return len;
    if (!str.length) return len;

    // Remove the first letter of the string
    let restOfString = str.substring(1);

    // Call function again, with updated string and len
    return lengthOfString(restOfString, ++len);
}

function sumOfArray(arr, number = 0, sum = 0) {
    // This function returns the sum of all of the numbers in a given array.
    if (number === arr.length) return sum
    sum += arr[number]
    return sumOfArray(arr, ++number, sum)
}

function findMax(arr, index = 0, number = 0) {
    // This function returns the largest number in a given array.
    if (index === arr.length) return number
    if (arr[index] > number) {
        number = arr[index]
    }
    return findMax(arr, ++index, number)
}

function factorial(number) {
    // This function returns the factorial of a given number.
    if (number === 0) return 0
    if (number === 1) return 1
    return number * factorial(number - 1)
}

function fibonacci(number) {
    // This function returns the Nth number in the fibonacci sequence.
    // https://en.wikipedia.org/wiki/Fibonacci_number
    // For this function, the first two fibonacci numbers are 1 and 1
    if (number === 1 || number === 2) return 1
    return fibonacci(number - 1) + fibonacci(number - 2)
}

function coinFlips(n) {
    // This function returns an array of all possible outcomes from flipping a coin N times.
    // Input type: Integer
    // For example, coinFlips(2) would return the following:
    // ["HH", "HT", "TH", "TT"]
    // H stands for Heads and T stands for tails
    // Represent the two outcomes of each flip as "H" or "T"
    if (n === 0) return ['']
    const flips = coinFlips(n - 1)
    const anotherFlip = []
    for (let flip of flips) {
        anotherFlip.push(flip + 'H')
        anotherFlip.push(flip + 'T')
    }
    return anotherFlip
}

function letterCombinations(letters) {
    // This function returns an array of all combinations of the given letters
    // Input type: Array of single characters
    // For example, letterCombinations(["a","b","c"]) would return the following:
    // ["a","b","c","ab","ac","ba","bc","ca","cb","abc","acb","bac","bca","cab","cba"]
    const combinations = []
    function generateCombinations(currentCombination, remainingLetters) {
        if (remainingLetters.length === 0) {
            combinations.push(currentCombination)
            return
        }
        for (let i = 0; i < remainingLetters.length; i++) {
            const letter = remainingLetters[i]
            const updateCombinations = currentCombination + letter
            const remaining = remainingLetters.slice(0, i).concat(remainingLetters.slice(i + 1))
            generateCombinations(updateCombinations, remaining)
        }
    }
    generateCombinations('', letters)
    return combinations
}

module.exports = {
    lengthOfString,
    sumOfArray,
    findMax,
    factorial,
    fibonacci,
    coinFlips,
    letterCombinations,
};

console.log(lengthOfString('magic'))
console.log(sumOfArray([2, 3, 23]))
console.log(findMax([1, 2, 4, 6, 3]))
console.log(factorial(5))
console.log(fibonacci(7))
console.log(coinFlips(4))
console.log(letterCombinations(['f', 'u', 'r']))