"use strict";

module.exports = (line, keys) => {
    // this is for just the test case, I wouldn't typically use a regex for parsing a CSV :)
    var matches = line.match(/(\s*"[^"]+"\s*|\s*[^,]+|,)(?=,|$)/g);
    if (!matches) {
        return null;
    }

    // clean up each match
    for (let n = 0; n < matches.length; ++n) {
        // trim white space
        matches[n] = matches[n].trim();

        // remove quotes from text
        if (matches[n].slice(0, 1) == '"' && matches[n].slice(-1) == '"') {
            matches[n] = matches[n].slice(1, -1);
        }

        // handle empty value (double commas)
        if (matches[n] == ',') {
            matches[n] = '';
        }
    }

    // return only the values if keys variable is empty
    if (!keys) {
        return matches;
    }

    // return and array index by keys
    return keys.reduce(function(newObj, name, index) {
        newObj[name] = matches[index];
        return newObj;
    }, {});
};
