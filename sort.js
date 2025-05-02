let a = ["faizan", "zain", "ali", "hanzala"];
a.sort((a, b) => b.localeCompare(a));
console.log(a);  // Output: [ 'zain', 'hanzala', 'faizan', 'ali' ]
