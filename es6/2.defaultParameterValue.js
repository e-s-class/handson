console.log(' 1. Default Parameter Values');
function defaultParameterValue (x, y = 7, z = 42) {
    return x + y + z
}

console.log(defaultParameterValue());
console.log(defaultParameterValue(undefined));
console.log(defaultParameterValue(null));
console.log(defaultParameterValue(1));
console.log(defaultParameterValue(1, 2));
console.log(defaultParameterValue(1, 2, undefined));
console.log(defaultParameterValue(1, 2, null));
