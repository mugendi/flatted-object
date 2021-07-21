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

const flatted = require('.');

let obj = {
    city: {

        library: {

            books: [{
                    name: "How to flatten objects like a pro",
                    author: {

                        first: "Anthony",
                        second: "Mugendi"
                    }
                },
                {
                    name: "How to flatten objects like a pro",
                    author: {

                        first: "Anthony",
                        second: "Mugendi"
                    }
                }
            ]
        }
    }

}

// adding cyclic data
obj.obj = obj;

// use without depthMaps
let flattenedObj = flatted(obj);

console.log(JSON.stringify(flattenedObj, 0, 4));

flattenedObj = flatted(obj, 'city_books');

console.log(JSON.stringify(flattenedObj, 0, 4));

flattenedObj = flatted(obj, 'city.books');

console.log(JSON.stringify(flattenedObj, 0, 4));