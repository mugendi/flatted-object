<!--
 Copyright 2021 Anthony Mugendi
 
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 
     http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

# Why?

Flattening objects is somewhat difficult as they could have infinitely many nested levels and some of those levels could be array and even other objects.

This module flattens an object to it's "flattest" size possible while still avoiding collapsing none related keys so that data integrity is maintained.

# Why the name?

I love the [flatted](https://www.npmjs.com/package/flatted) module and I wanted something that's equally fast and at the same time safe to use. Besides, "flatten-object" was already taken by another module which I didn't like much.

# How?

Install ```yarn add flatted-object``` then:

```javascript

    const flatted = require('flatted-object');

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

```

This will log a flattened object as shown below:

```json

    {
        "city": [
            {
                "name": "How to flatten objects like a pro",
                "author": {
                    "first": "Anthony",
                    "second": "Mugendi"
                }
            },
            {
                "name": "How to flatten objects like a pro",
                "author": {
                    "first": "Anthony",
                    "second": "Mugendi"
                }
            }
        ],
        "obj": "CIRCULAR <obj>"
    }


```

NOTE: There is no way to deal with circular references so they are indicated as "CIRCULAR".

# Api
## flatten(object, [rootKey]);

You can also pass an alternative **rootKey** that will be used as the root for the flattened object. Below is an example using the same object above.

```javascript

    ...

    flattenedObj = flatted(obj, 'city_books');
    
    console.log(JSON.stringify(flattenedObj, 0, 4));
    

```

This will output the following JSON:

```json
    
    {
        "city_books": [
            {
                "name": "How to flatten objects like a pro",
                "author": {
                    "first": "Anthony",
                    "second": "Mugendi"
                }
            },
            {
                "name": "How to flatten objects like a pro",
                "author": {
                    "first": "Anthony",
                    "second": "Mugendi"
                }
            }
        ],
        "obj": "CIRCULAR <obj>"
    }
    

```

Also the **rootKey** allows you to use dot notation to determine how the final structure of the object looks like.

Consider the following:

```javascript
    flattenedObj = flatted(obj, 'city.books');
    
    console.log(JSON.stringify(flattenedObj, 0, 4));

```

Which outputs:


```json 

    {
        "city": {
            "books": [
                {
                    "name": "How to flatten objects like a pro",
                    "author": {
                        "first": "Anthony",
                        "second": "Mugendi"
                    }
                },
                {
                    "name": "How to flatten objects like a pro",
                    "author": {
                        "first": "Anthony",
                        "second": "Mugendi"
                    }
                }
            ]
        },
        "obj": "CIRCULAR <obj>"
    }
    

```

Enjoy!



