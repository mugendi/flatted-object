// Copyright 2021 Anthony Mugendi
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const dot = require("dot-object");

function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}


// https://stackoverflow.com/a/60711840
function removeCirculars(obj, depth = 0) {

    let json = JSON.stringify(obj, function replacer(key, value) {

        if (key != "" && value == obj) {
            value = `CIRCULAR <${key}>`
        };
        return value
    });

    return JSON.parse(json);
}

function flatten_object(sourceObj, rootKey = "") {

    // validation
    if (!isObject(sourceObj)) throw new Error("sourceObj must be an Object");
    if ("string" !== typeof rootKey) throw new Error("rootKey must be a string");

    // remove circular references
    sourceObj = removeCirculars(sourceObj);

    // convert object to dot notation first
    let dotObj = dot.dot(sourceObj);



    let recipe = {},
        arr, newKey,
        commonKeys = {},
        mostCommonCount = 0,
        longestCommonKey = 0,
        longestCommonKeyLength = 0,
        keyPat = /[\.\[\]]/;

    // First get & rank all common keys
    for (let key in dotObj) {

        arr = key.split(keyPat);

        while (arr.length) {
            newKey = arr.join('.')
            commonKeys[newKey] = commonKeys[newKey] || 0;
            commonKeys[newKey]++;
            arr.pop();
        }
    }

    // get the most common key count
    mostCommonCount = Math.max(...Object.values(commonKeys))

    // filter the most common keys & get the longest of them
    for (let key in commonKeys) {
        if (commonKeys[key] == mostCommonCount) {
            if (key.length > longestCommonKeyLength) {
                longestCommonKey = key;
                longestCommonKeyLength = key.length
            }
        }
    }

    // now make make replacement key
    rootKey = rootKey.length ? rootKey : longestCommonKey.split(keyPat).shift();

    // now make recipe to use in transforming object
    for (let key in dotObj) {
        recipe[key] = key.replace(longestCommonKey, rootKey)
    }

    // now apply transformations
    let targetObj = dot.transform(recipe, sourceObj);

    // return
    return targetObj

}

module.exports = flatten_object;