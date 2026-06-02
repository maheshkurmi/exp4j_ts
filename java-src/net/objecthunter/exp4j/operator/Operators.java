/*
 * Copyright 2014 Frank Asseg
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package net.objecthunter.exp4j.operator;

public abstract class Operators {
	private static final int INDEX_LOGICAL_OR = 0;
	private static final int INDEX_LOGICAL_AND = 1;
	private static final int INDEX_EQUAL_TO = 2;
	private static final int INDEX_GREATER_THAN = 3;
	private static final int INDEX_LESS_THAN = 4;

	private static final int INDEX_ADDITION = 5;
	private static final int INDEX_SUBTRACTION = 6;
	private static final int INDEX_MULTIPLICATION = 7;
	private static final int INDEX_DIVISION = 8;
	private static final int INDEX_POWER = 9;
	private static final int INDEX_MODULO = 10;
	private static final int INDEX_UNARY_MINUS = 11;
	private static final int INDEX_UNARY_PLUS = 12;
	private static final int INDEX_LOGICAL_NOT = 13;

	private static final Operator[] BUILT_IN_OPERATORS = new Operator[14];

	private static final double  EPSILON = 1e-9;

	static {
		BUILT_IN_OPERATORS[INDEX_LOGICAL_OR] = new Operator("|", 2, true, Operator.PRECEDENCE_LOGICAL) {
			@Override
			public double apply(final double... args) {
				return (approxEqual(args[0], 0) && approxEqual(args[1],0) ) ? 0 : 1;
			}
		};
		BUILT_IN_OPERATORS[INDEX_LOGICAL_AND] = new Operator("&", 2, true, Operator.PRECEDENCE_LOGICAL) {
			@Override
			public double apply(final double... args) {
				return (approxEqual(args[0], 1)&& approxEqual(args[1],1)) ? 1: 0;
			}
		};

		BUILT_IN_OPERATORS[INDEX_EQUAL_TO] = new Operator("=", 2, true, Operator.PRECEDENCE_COMPARISION) {
			@Override
			public double apply(final double... args) {
				return approxEqual(args[0],args[1])? 1 : 0;
			}
		};

		BUILT_IN_OPERATORS[INDEX_GREATER_THAN] = new Operator(">", 2, true, Operator.PRECEDENCE_COMPARISION) {
			@Override
			public double apply(final double... args) {
				return args[0] > args[1] ? 1 : 0;
			}
		};

		BUILT_IN_OPERATORS[INDEX_LESS_THAN] = new Operator("<", 2, true, Operator.PRECEDENCE_COMPARISION) {
			@Override
			public double apply(final double... args) {
				return (args[0] < args[1]) ? 1 : 0;
			}
		};

	
		BUILT_IN_OPERATORS[INDEX_ADDITION] = new Operator("+", 2, true, Operator.PRECEDENCE_ADDITION) {
			@Override
			public double apply(final double... args) {
				return args[0] + args[1];
			}
		};
		BUILT_IN_OPERATORS[INDEX_SUBTRACTION] = new Operator("-", 2, true, Operator.PRECEDENCE_ADDITION) {
			@Override
			public double apply(final double... args) {
				return args[0] - args[1];
			}
		};
		BUILT_IN_OPERATORS[INDEX_UNARY_MINUS] = new Operator("-", 1, false, Operator.PRECEDENCE_UNARY_MINUS) {
			@Override
			public double apply(final double... args) {
				return -args[0];
			}
		};
		BUILT_IN_OPERATORS[INDEX_UNARY_PLUS] = new Operator("+", 1, false, Operator.PRECEDENCE_UNARY_PLUS) {
			@Override
			public double apply(final double... args) {
				return args[0];
			}
		};
		BUILT_IN_OPERATORS[INDEX_MULTIPLICATION] = new Operator("*", 2, true, Operator.PRECEDENCE_MULTIPLICATION) {
			@Override
			public double apply(final double... args) {
				return args[0] * args[1];
			}
		};
		BUILT_IN_OPERATORS[INDEX_DIVISION] = new Operator("/", 2, true, Operator.PRECEDENCE_DIVISION) {
			@Override
			public double apply(final double... args) {
				if (args[1] == 0d) {
					throw new ArithmeticException("Division by zero!");
				}
				return args[0] / args[1];
			}
		};
		BUILT_IN_OPERATORS[INDEX_POWER] = new Operator("^", 2, false, Operator.PRECEDENCE_POWER) {
			@Override
			public double apply(final double... args) {
				return Math.pow(args[0], args[1]);
			}
		};
		BUILT_IN_OPERATORS[INDEX_MODULO] = new Operator("%", 2, true, Operator.PRECEDENCE_MODULO) {
			@Override
			public double apply(final double... args) {
				if (args[1] == 0d) {
					throw new ArithmeticException("Division by zero!");
				}
				return args[0] % args[1];
			}
		};
		
		BUILT_IN_OPERATORS[INDEX_LOGICAL_NOT] = new Operator("!", 1, false, Operator.PRECEDENCE_LOGICAL_NOT) {
			@Override
			public double apply(final double... args) {
				return args[0] == 0 ? 1 : 0;
			}
		};

	}

	public static Operator getBuiltinOperator(final char symbol, final int numArguments) {
		switch (symbol) {
		case '+':
			if (numArguments != 1) {
				return BUILT_IN_OPERATORS[INDEX_ADDITION];
			}

			return BUILT_IN_OPERATORS[INDEX_UNARY_PLUS];
		case '-':
			if (numArguments != 1) {
				return BUILT_IN_OPERATORS[INDEX_SUBTRACTION];
			}

			return BUILT_IN_OPERATORS[INDEX_UNARY_MINUS];
		case '*':
			return BUILT_IN_OPERATORS[INDEX_MULTIPLICATION];
		case '÷':
		case '/':
			return BUILT_IN_OPERATORS[INDEX_DIVISION];
		case '^':
			return BUILT_IN_OPERATORS[INDEX_POWER];
		case '%':
			return BUILT_IN_OPERATORS[INDEX_MODULO];
		case '|':
			return BUILT_IN_OPERATORS[INDEX_LOGICAL_OR];
		case '&':
			return BUILT_IN_OPERATORS[INDEX_LOGICAL_AND];
		case '<':
			return BUILT_IN_OPERATORS[INDEX_LESS_THAN];
		case '>':
			return BUILT_IN_OPERATORS[INDEX_GREATER_THAN];
		case '=':
			return BUILT_IN_OPERATORS[INDEX_EQUAL_TO];
		case '!':
			return BUILT_IN_OPERATORS[INDEX_LOGICAL_NOT];
		default:
			return null;
		}
	}
	
	private static boolean approxEqual(double a,double b){
		return Math.abs(a-b)<EPSILON;
	}

}
