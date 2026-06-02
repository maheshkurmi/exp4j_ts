# Using exp4j_ts as a JSweet Candy

This guide explains how to package and use this library as a JSweet candy in your Java/JSweet projects.

## What is a JSweet Candy?

A JSweet candy is a TypeScript library packaged with type definitions that can be used in JSweet projects. It allows Java code to call JavaScript libraries through JSweet's transpilation.

## Package Structure

The candy package includes:
```
exp4j_ts/
├── package.json          # NPM package configuration
├── jsweet.json          # JSweet candy configuration
├── dist/                # Type definitions for candy
│   ├── index.d.ts      # Main candy entry point
│   └── net/objecthunter/exp4j/  # All .d.ts files
├── bundle/              # Bundled JavaScript
│   └── exp4j.bundle.js
└── src/                 # TypeScript source (optional)
```

## Step 1: Publish to NPM

First, you need an NPM account and to be logged in:

```bash
npm login
```

Then publish your candy:

```bash
# Make sure everything is built
npm run build

# Publish to npm (use --access public for scoped packages)
npm publish
```

**Note:** Choose a unique name in `package.json`. Common pattern: `jsweet-candy-exp4j` or `@yourscope/exp4j-candy`

## Step 2: Use in JSweet Projects

### 2.1 Add Dependency (Maven)

Add to your `pom.xml`:

```xml
<dependencies>
    <!-- JSweet transpiler -->
    <dependency>
        <groupId>org.jsweet</groupId>
        <artifactId>jsweet-core</artifactId>
        <version>6.3.0</version>
    </dependency>
    
    <!-- Your candy dependency will be auto-downloaded from npm -->
</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>org.jsweet</groupId>
            <artifactId>jsweet-maven-plugin</artifactId>
            <version>3.1.0</version>
            <configuration>
                <verbose>true</verbose>
                <targetVersion>ES2020</targetVersion>
                <candies>
                    <candy>exp4j-candy:1.0.0</candy>
                </candies>
            </configuration>
            <executions>
                <execution>
                    <phase>generate-sources</phase>
                    <goals>
                        <goal>jsweet</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

### 2.2 Add Dependency (Gradle)

Add to your `build.gradle`:

```gradle
plugins {
    id 'org.jsweet.jsweet-gradle-plugin' version '3.1.0'
}

dependencies {
    implementation 'org.jsweet:jsweet-core:6.3.0'
}

jsweet {
    targetVersion = 'ES2020'
    candies = ['exp4j-candy:1.0.0']
    verbose = true
}
```

### 2.3 Use in Java Code

Create a Java class using the candy:

```java
package com.example;

import net.objecthunter.exp4j.ExpressionBuilder;
import net.objecthunter.exp4j.Expression;

public class MathCalculator {
    
    public static void main(String[] args) {
        // Create expression
        Expression expr = new ExpressionBuilder("3 * x + 2 * y")
            .variable("x")
            .variable("y")
            .build()
            .setVariable("x", 5.0)
            .setVariable("y", 10.0);
        
        // Evaluate
        double result = expr.evaluate();
        System.out.println("Result: " + result); // 35.0
        
        // Use math functions
        Expression expr2 = new ExpressionBuilder("sqrt(a^2 + b^2)")
            .variables("a", "b")
            .build()
            .setVariable("a", 3.0)
            .setVariable("b", 4.0);
        
        System.out.println("Hypotenuse: " + expr2.evaluate()); // 5.0
    }
}
```

### 2.4 Compile with JSweet

```bash
# Maven
mvn jsweet:jsweet

# Gradle
./gradlew jsweet
```

This will:
1. Download the exp4j-candy from npm
2. Transpile your Java code to JavaScript
3. Include the exp4j bundle in your output

## Step 3: Alternative - Local Installation

If you don't want to publish to npm, you can use it locally:

### 3.1 Create Local NPM Link

```bash
cd /path/to/exp4j_ts
npm link
```

### 3.2 In Your JSweet Project

```bash
cd /path/to/your-jsweet-project
npm link exp4j-candy
```

### 3.3 Configure JSweet to Use Local Candy

In your JSweet project, create `jsweet-local.json`:

```json
{
  "candiesPath": "./node_modules"
}
```

## Step 4: Direct Usage (Without NPM)

If you want to use the candy without npm:

### 4.1 Copy Files Manually

Copy the entire `dist/` folder to your JSweet project:

```
your-jsweet-project/
├── src/
│   └── main/
│       └── java/
└── candies/
    └── exp4j/
        └── (copy dist/ contents here)
```

### 4.2 Configure JSweet

Point JSweet to your local candies directory:

```xml
<configuration>
    <candiesPath>${project.basedir}/candies</candiesPath>
</configuration>
```

## API Usage Examples in Java

### Basic Expression

```java
Expression expr = new ExpressionBuilder("2 + 3 * 4").build();
double result = expr.evaluate(); // 14.0
```

### With Variables

```java
Expression expr = new ExpressionBuilder("x * y")
    .variable("x")
    .variable("y")
    .build()
    .setVariable("x", 10.0)
    .setVariable("y", 5.0);
    
double result = expr.evaluate(); // 50.0
```

### Validation

```java
Expression expr = new ExpressionBuilder("2 * x +")
    .variable("x")
    .build();
    
ValidationResult validation = expr.validate(true);
if (!validation.isValid()) {
    System.out.println("Errors: " + validation.getErrors());
}
```

### Custom Functions

```java
import net.objecthunter.exp4j.func._Function;

_Function avgFunc = new _Function("avg", 2) {
    @Override
    public double apply(double... args) {
        return (args[0] + args[1]) / 2.0;
    }
};

Expression expr = new ExpressionBuilder("avg(a, b)")
    .function(avgFunc)
    .variables("a", "b")
    .build()
    .setVariable("a", 10.0)
    .setVariable("b", 20.0);
    
double result = expr.evaluate(); // 15.0
```

## Supported Functions

All standard math functions are available:
- Trigonometric: `sin`, `cos`, `tan`, `asin`, `acos`, `atan`
- Hyperbolic: `sinh`, `cosh`, `tanh`
- Logarithmic: `log` (natural), `log10`, `log2`
- Other: `sqrt`, `cbrt`, `abs`, `ceil`, `floor`, `exp`, `signum`

## Supported Operators

- Arithmetic: `+`, `-`, `*`, `/`, `^` (power), `%` (modulo)
- Comparison: `>`, `<`, `>=`, `<=`, `==`, `!=`
- Logical: `&&`, `||`, `!`

## Publishing Checklist

Before publishing to npm:

- [ ] Update version in `package.json`
- [ ] Test the candy in a sample JSweet project
- [ ] Build: `npm run build`
- [ ] Test installation: `npm pack` and test the .tgz file
- [ ] Publish: `npm publish`
- [ ] Tag release: `git tag v1.0.0 && git push --tags`

## Troubleshooting

### Candy Not Found
- Ensure the candy name in JSweet config matches the npm package name
- Check that JSweet can access npm (internet connection)

### Type Errors in Java
- Verify the candy version matches
- Rebuild JSweet project: `mvn clean jsweet:jsweet`

### Runtime Errors
- Ensure `bundle/exp4j.bundle.js` is included in your output
- Check browser console for JavaScript errors

## Resources

- [JSweet Documentation](http://www.jsweet.org/jsweet-candies/)
- [Creating JSweet Candies Guide](http://www.jsweet.org/candies-snapshots/)
- [NPM Publishing Guide](https://docs.npmjs.com/cli/v9/commands/npm-publish)
- [exp4j Repository](https://github.com/maheshkurmi/exp4j_ts)

## License

Apache-2.0 (same as original exp4j)
