/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
namespace net.objecthunter.exp4j.shuntingyard {
    /**
     * Shunting yard implementation to convert infix to reverse polish notation
     * @class
     */
    export class ShuntingYard {
        /**
         * Convert a Set of tokens from infix to reverse polish notation
         * @param {string} expression the expression to convert
         * @param {Map} userFunctions the custom functions used
         * @param {Map} userOperators the custom operators used
         * @param {Set} variableNames the variable names used in the expression
         * @param {boolean} implicitMultiplication set to fasle to turn off implicit multiplication
         * @return {net.objecthunter.exp4j.tokenizer.Token[]} a {@link net.objecthunter.exp4j.tokenizer.Token} array containing the result
         */
        public static convertToRPN(expression: string, userFunctions: Map<string, net.objecthunter.exp4j.func._Function>, userOperators: Map<string, net.objecthunter.exp4j.operator.Operator>, variableNames: Set<string>, implicitMultiplication: boolean): net.objecthunter.exp4j.tokenizer.Token[] {
            const stack: ShuntingYard.TokenStack = new ShuntingYard.TokenStack();
            const output: ShuntingYard.TokenList = new ShuntingYard.TokenList();
            const tokenizer: net.objecthunter.exp4j.tokenizer.Tokenizer = new net.objecthunter.exp4j.tokenizer.Tokenizer(expression, userFunctions, userOperators, variableNames, implicitMultiplication);
            while((tokenizer.hasNext())) {{
                const token: net.objecthunter.exp4j.tokenizer.Token = tokenizer.nextToken();
                switch((token.getType())) {
                case net.objecthunter.exp4j.tokenizer.Token.TOKEN_NUMBER:
                case net.objecthunter.exp4j.tokenizer.Token.TOKEN_VARIABLE:
                    output.add(token);
                    break;
                case net.objecthunter.exp4j.tokenizer.Token.TOKEN_FUNCTION:
                    stack.push(token);
                    break;
                case net.objecthunter.exp4j.tokenizer.Token.TOKEN_SEPARATOR:
                    while((!stack.empty() && stack.peek().getType() !== net.objecthunter.exp4j.tokenizer.Token.TOKEN_PARENTHESES_OPEN)) {{
                        output.add(stack.pop());
                    }};
                    if (stack.empty() || stack.peek().getType() !== net.objecthunter.exp4j.tokenizer.Token.TOKEN_PARENTHESES_OPEN){
                        throw new Error("Misplaced function separator ',' or mismatched parentheses");
                    }
                    break;
                case net.objecthunter.exp4j.tokenizer.Token.TOKEN_OPERATOR:
                    while((!stack.empty() && stack.peek().getType() === net.objecthunter.exp4j.tokenizer.Token.TOKEN_OPERATOR)) {{
                        const o1: net.objecthunter.exp4j.tokenizer.OperatorToken = <net.objecthunter.exp4j.tokenizer.OperatorToken>token;
                        const o2: net.objecthunter.exp4j.tokenizer.OperatorToken = <net.objecthunter.exp4j.tokenizer.OperatorToken>stack.peek();
                        if (o1.getOperator().getNumOperands() === 1 && o2.getOperator().getNumOperands() === 2){
                            break;
                        } else if ((o1.getOperator().isLeftAssociative() && o1.getOperator().getPrecedence() <= o2.getOperator().getPrecedence()) || (o1.getOperator().getPrecedence() < o2.getOperator().getPrecedence())){
                            output.add(stack.pop());
                        } else {
                            break;
                        }
                    }};
                    stack.push(token);
                    break;
                case net.objecthunter.exp4j.tokenizer.Token.TOKEN_PARENTHESES_OPEN:
                    stack.push(token);
                    break;
                case net.objecthunter.exp4j.tokenizer.Token.TOKEN_PARENTHESES_CLOSE:
                    while((stack.peek().getType() !== net.objecthunter.exp4j.tokenizer.Token.TOKEN_PARENTHESES_OPEN)) {{
                        output.add(stack.pop());
                    }};
                    stack.pop();
                    if (!stack.isEmpty() && stack.peek().getType() === net.objecthunter.exp4j.tokenizer.Token.TOKEN_FUNCTION){
                        output.add(stack.pop());
                    }
                    break;
                default:
                    throw new Error("Unknown Token type encountered. This should not happen");
                }
            }};
            while((!stack.empty())) {{
                const t: net.objecthunter.exp4j.tokenizer.Token = stack.pop();
                if (t.getType() === net.objecthunter.exp4j.tokenizer.Token.TOKEN_PARENTHESES_CLOSE || t.getType() === net.objecthunter.exp4j.tokenizer.Token.TOKEN_PARENTHESES_OPEN){
                    throw new Error("Mismatched parentheses detected. Please check the expression");
                } else {
                    output.add(t);
                }
            }};
            return output.toArray();
        }
    }


    export namespace ShuntingYard {

        export class TokenStack {
            data: net.objecthunter.exp4j.tokenizer.Token[];

            size: number;

            push(token: net.objecthunter.exp4j.tokenizer.Token) {
                if (this.size === this.data.length){
                    this.grow();
                }
                this.data[this.size++] = token;
            }

            pop(): net.objecthunter.exp4j.tokenizer.Token {
                return this.data[--this.size];
            }

            peek(): net.objecthunter.exp4j.tokenizer.Token {
                return this.data[this.size - 1];
            }

            empty(): boolean {
                return this.size === 0;
            }

            isEmpty(): boolean {
                return this.size === 0;
            }

            grow() {
                const expanded: net.objecthunter.exp4j.tokenizer.Token[] = new Array(this.data.length * 2);
                for(let i: number = 0; i < this.data.length; i++) {{
                    expanded[i] = this.data[i];
                };}
                this.data = expanded;
            }

            constructor() {
                this.data = new Array(16);
                this.size = 0;
            }
        }


        export class TokenList {
            data: net.objecthunter.exp4j.tokenizer.Token[];

            size: number;

            add(token: net.objecthunter.exp4j.tokenizer.Token) {
                if (this.size === this.data.length){
                    this.grow();
                }
                this.data[this.size++] = token;
            }

            toArray(): net.objecthunter.exp4j.tokenizer.Token[] {
                const result: net.objecthunter.exp4j.tokenizer.Token[] = new Array(this.size);
                for(let i: number = 0; i < this.size; i++) {{
                    result[i] = this.data[i];
                };}
                return result;
            }

            grow() {
                const expanded: net.objecthunter.exp4j.tokenizer.Token[] = new Array(this.data.length * 2);
                for(let i: number = 0; i < this.data.length; i++) {{
                    expanded[i] = this.data[i];
                };}
                this.data = expanded;
            }

            constructor() {
                this.data = new Array(16);
                this.size = 0;
            }
        }

    }

}

