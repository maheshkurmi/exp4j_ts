#!/bin/bash
# Bundle all exp4j JavaScript files into a single file

cat > build/exp4j.bundle.js << 'EOF'
/**
 * exp4j TypeScript Bundle
 * All modules combined in dependency order
 */
EOF

# Add all files in dependency order
cat build/net/objecthunter/exp4j/ArrayStack.js >> build/exp4j.bundle.js
cat build/net/objecthunter/exp4j/ValidationResult.js >> build/exp4j.bundle.js
cat build/net/objecthunter/exp4j/function/_Function.js >> build/exp4j.bundle.js
cat build/net/objecthunter/exp4j/function/Functions.js >> build/exp4j.bundle.js
cat build/net/objecthunter/exp4j/operator/Operator.js >> build/exp4j.bundle.js
cat build/net/objecthunter/exp4j/operator/Operators.js >> build/exp4j.bundle.js
cat build/net/objecthunter/exp4j/tokenizer/Token.js >> build/exp4j.bundle.js
cat build/net/objecthunter/exp4j/tokenizer/NumberToken.js >> build/exp4j.bundle.js
cat build/net/objecthunter/exp4j/tokenizer/VariableToken.js >> build/exp4j.bundle.js
cat build/net/objecthunter/exp4j/tokenizer/FunctionToken.js >> build/exp4j.bundle.js
cat build/net/objecthunter/exp4j/tokenizer/OperatorToken.js >> build/exp4j.bundle.js
cat build/net/objecthunter/exp4j/tokenizer/OpenParenthesesToken.js >> build/exp4j.bundle.js
cat build/net/objecthunter/exp4j/tokenizer/CloseParenthesesToken.js >> build/exp4j.bundle.js
cat build/net/objecthunter/exp4j/tokenizer/ArgumentSeparatorToken.js >> build/exp4j.bundle.js
cat build/net/objecthunter/exp4j/tokenizer/UnknownFunctionOrVariableException.js >> build/exp4j.bundle.js
cat build/net/objecthunter/exp4j/tokenizer/Tokenizer.js >> build/exp4j.bundle.js
cat build/net/objecthunter/exp4j/shuntingyard/ShuntingYard.js >> build/exp4j.bundle.js
cat build/net/objecthunter/exp4j/Expression.js >> build/exp4j.bundle.js
cat build/net/objecthunter/exp4j/ExpressionBuilder.js >> build/exp4j.bundle.js

echo "✓ Created build/exp4j.bundle.js"
