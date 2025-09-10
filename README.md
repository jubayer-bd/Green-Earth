### 1. Difference between var, let, and const?

- **var** → function-scoped, can redeclare/update, hoisted.
- **let** → block-scoped, can update but not redeclare, TDZ applies.
- **const** → block-scoped, cannot reassign, must initialize.

---

### 2. Difference between map(), forEach(), and filter()?

- **map()** → returns new array with transformed elements.
- **forEach()** → loops, no return (undefined).
- **filter()** → returns new array with elements that pass a condition.

---

### 3. What are arrow functions in ES6?

- Shorter function syntax.
- No own `this` or `arguments`.
- Example: `const add = (a,b) => a+b;`

---

### 4. How does destructuring assignment work?

- Extracts values from arrays/objects into variables.
- Example:
  ```js
  const [a, b] = [1, 2]; // a=1, b=2
  const { name, age } = { name: "Ali", age: 20 }; // name="Ali"
  ```

5. Explain template literals vs concatenation.

- Use backticks (``).

- Support ${expression} and multiline.

- Example: Hello, ${name}! vs "Hello, " + name + "!".
