// Given an array arr of positive integers sorted in a strictly increasing order, and an integer k.
// Return the kth positive integer that is missing from this array.


// Example 1:
// Input: arr = [2,3,4,7,11], k = 5
// Output: 9
// Explanation: The missing positive integers are [1,5,6,8,9,10,12,13,...]. The 5th missing positive integer is 9.
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findKthPositive = function(arr, k) {
    let missingArr = [];
    let i = 1;
    let index = 0;
    
    while (missingArr.length < k) {
        if (index < arr.length && arr[index] === i) {
            index++;
        } else {
            missingArr.push(i);
        }
        i++;
    }
    
    return missingArr[k - 1];
};

console.log(findKthPositive([2,3,4,7,11], 5)); // Output: 9
console.log(findKthPositive([1,2,3,4], 2)); // Output: 6