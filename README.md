# exp4j TypeScript Port

A TypeScript port of the Java exp4j mathematical expression evaluator, optimized and cleaned from JSweet transpiler artifacts.

## Build

Compile TypeScript to JavaScript with type definitions:

```bash
tsc -p tsconfig.json
```

Create a single bundled JavaScript file:

```bash
./bundle.sh
```

This generates:
- `build/**/*.js` - Individual JavaScript modules (ES2020)
- `build/**/*.d.ts` - TypeScript type definitions
- `build/**/*.js.map` - Source maps
- `build/exp4j.bundle.js` - Single bundled file (88KB)

## Usage (Browser - Vanilla JavaScript)

### Simple Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>exp4j Example</title>
</head>
<body>
    <!-- Load the bundled library (single file) -->
    <script src="./build/exp4j.bundle.js"></script>
    
    <script>
        // Basic arithmetic
        const expr = new net.objecthunter.exp4j.ExpressionBuilder("2 + 3 * 4")
            .build();
        console.log(expr.evaluate()); // 14
        
        // With variables
        const expr2 = new net.objecthunter.exp4j.ExpressionBuilder("3 * x + 2 * y")
            .variable("x")
            .variable("y")
            .build()
            .setVariable("x", 5)
            .setVariable("y", 10);
        console.log(expr2.evaluate()); // 35
        
        // Math functions
        const expr3 = new net.objecthunter.exp4j.ExpressionBuilder("sqrt(a^2 + b^2)")
            .variables("a", "b")
            .build()
            .setVariable("a", 3)
            .setVariable("b", 4);
        console.log(expr3.evaluate()); // 5
    </script>
</body>
</html>
```

### Examples

- **example-simple.html** - Basic usage with 4 examples
- **example.html** - Interactive calculator with validation

Open either HTML file in a browser to see it in action!

## Features

### Supported Operators
- Arithmetic: `+`, `-`, `*`, `/`, `^` (power), `%` (modulo)
- Comparison: `>`, `<`, `>=`, `<=`, `==`, `!=`
- Logical: `&&`, `||`, `!`

### Supported Functions
- Trigonometric: `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `sinh`, `cosh`, `tanh`
- Logarithmic: `log` (natural), `log10`, `log2`
- Other: `sqrt`, `cbrt`, `abs`, `ceil`, `floor`, `exp`, `expm1`, `signum`, and more

### Custom Functions

```javascript
const avgFunction = new net.objecthunter.exp4j.func._Function("avg", 2);
avgFunction.apply = function(...args) {
    return (args[0] + args[1]) / 2;
};

const expr = new net.objecthunter.exp4j.ExpressionBuilder("avg(a, b)")
    .function(avgFunction)
    .variables("a", "b")
    .build()
    .setVariable("a", 10)
    .setVariable("b", 20);
    
console.log(expr.evaluate()); // 15
```

### Validation

```javascript
const expr = new net.objecthunter.exp4j.ExpressionBuilder("2 * x +")
    .variable("x")
    .build();

const validation = expr.validate(true);
if (!validation.isValid()) {
    console.log(validation.getErrors());
}
```

## Optimizations

This port has been optimized to remove JSweet transpiler artifacts:
- ✅ Inline anonymous class expressions (72% smaller Functions.ts, 68% smaller Operators.ts)
- ✅ Native TypeScript arrays (no helper classes)
- ✅ Clean namespace (`func` instead of `__function`)
- ✅ No lazy initialization patterns
- ✅ No backward-compatibility artifacts

## Project Layout

```
java-src/                     # Original Java source
src/                          # TypeScript source
  net/objecthunter/exp4j/
    Expression.ts             # Main expression evaluator
    ExpressionBuilder.ts      # Builder pattern API
    function/                 # Built-in functions
    operator/                 # Built-in operators
    tokenizer/                # Expression tokenizer
    shuntingyard/             # Shunting Yard algorithm
build/                        # Compiled JavaScript + .d.ts + .js.map
```

## Requirements

- TypeScript compiler (`tsc`)
- No Node.js runtime dependencies or third-party libraries required

## License

Based on the original exp4j Java library.
