## Task

getPath - поиск уникального селектора
Написать алгоритм и функцию `getPath()`, находяющую уникальный css-селектор для элемента в документе.
Уникальный селектор может быть использован `document.querySelector()` и возвращать исходный элемент.
`document.querySelectorAll()`, вызванный с этим селектором, не должен находить никаких элементов, кроме исходного.

```javascript
$0; // HTMLElement
getPath($0); // => "..."
```

## Explanation

Algorithm

| step | name step  | description                       |
| ---- | ---------- | --------------------------------- |
| 0    | superNode  | uniquely                          |
| 1    | id         | uniquely                          |
| 2    | nodeName   | add element name                  |
| 3    | classes    | add classes                       |
| 4    | attributes | add attributes                    |
| 5    | nth-child  | add serial number among neighbors |
| 6    | go parent  | go to parent                      |

## Use

add script

```html
<script src="index.js"></script>
```

use in JS

```javascript
getPath(document.querySelector("body")); // body
```

## Test

1. Open [demo.html](demo.html)
2. Open DevTools
3. Click elements and look console

or

1. Open [demo.html](demo.html)
2. Open DevTools
3. Click button 'Start test' and look console

file tests - `index.spec.js`
