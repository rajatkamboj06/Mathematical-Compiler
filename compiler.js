class MathematicalCompiler {
    constructor() {
        this.tempCounter = 0;
        this.instructions = [];
        this.variables = new Map();
    }

    // Generate a new temporary variable
    generateTemp() {
        return `t${this.tempCounter++}`;
    }

    // Check if a character is an operator
    isOperator(char) {
        return ['+', '-', '*', '/', '(', ')'].includes(char);
    }

    // Check if a string is a number
    isNumber(str) {
        return !isNaN(parseFloat(str)) && isFinite(str);
    }

    // Get operator precedence
    getPrecedence(operator) {
        const precedences = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2
        };
        return precedences[operator] || 0;
    }

    // Tokenize the expression
    tokenize(expression) {
        const tokens = [];
        let currentToken = '';
        
        for (let i = 0; i < expression.length; i++) {
            const char = expression[i];
            
            if (char === ' ') continue;
            
            if (this.isOperator(char)) {
                if (currentToken) {
                    tokens.push(currentToken);
                    currentToken = '';
                }
                tokens.push(char);
            } else {
                currentToken += char;
            }
        }
        
        if (currentToken) {
            tokens.push(currentToken);
        }
        
        return tokens;
    }

    // Convert infix expression to postfix (Reverse Polish Notation)
    infixToPostfix(expression) {
        const tokens = this.tokenize(expression);
        const output = [];
        const operators = [];
        
        for (let token of tokens) {
            if (token === '(') {
                operators.push(token);
            } else if (token === ')') {
                while (operators.length && operators[operators.length - 1] !== '(') {
                    output.push(operators.pop());
                }
                operators.pop(); // Remove '('
            } else if (!this.isOperator(token)) {
                output.push(token);
            } else {
                while (operators.length && 
                       operators[operators.length - 1] !== '(' &&
                       this.getPrecedence(operators[operators.length - 1]) >= this.getPrecedence(token)) {
                    output.push(operators.pop());
                }
                operators.push(token);
            }
        }
        
        while (operators.length) {
            output.push(operators.pop());
        }
        
        return output;
    }

    // Generate three-address code from postfix expression
    generateThreeAddressCode(postfix) {
        const stack = [];
        
        for (let token of postfix) {
            if (!this.isOperator(token)) {
                stack.push(token);
            } else {
                const b = stack.pop();
                const a = stack.pop();
                const temp = this.generateTemp();
                
                this.instructions.push(`${temp} = ${a} ${token} ${b}`);
                stack.push(temp);
            }
        }
        
        return this.instructions;
    }

    // Calculate the result of the expression
    calculateResult(postfix) {
        const stack = [];
        
        for (let token of postfix) {
            if (!this.isOperator(token)) {
                const value = this.isNumber(token) ? parseFloat(token) : (this.variables.get(token) || 0);
                stack.push(value);
            } else {
                const b = stack.pop();
                const a = stack.pop();
                let result;
                
                switch (token) {
                    case '+':
                        result = a + b;
                        break;
                    case '-':
                        result = a - b;
                        break;
                    case '*':
                        result = a * b;
                        break;
                    case '/':
                        result = b !== 0 ? a / b : 'Error: Division by zero';
                        break;
                }
                
                stack.push(result);
            }
        }
        
        return stack[0];
    }

    // Extract variables from expression
    extractVariables(expression) {
        const variables = new Set();
        const tokens = this.tokenize(expression);
        
        for (let token of tokens) {
            if (!this.isOperator(token) && !this.isNumber(token)) {
                variables.add(token);
            }
        }
        
        return Array.from(variables);
    }

    // Compile the expression
    compile(expression) {
        this.instructions = [];
        this.tempCounter = 0;
        this.variables.clear();
        
        const postfix = this.infixToPostfix(expression);
        const threeAddressCode = this.generateThreeAddressCode(postfix);
        const result = this.calculateResult(postfix);
        
        return {
            threeAddressCode,
            result,
            variables: this.extractVariables(expression)
        };
    }
}

// Initialize the compiler and set up event listeners
document.addEventListener('DOMContentLoaded', () => {
    const compiler = new MathematicalCompiler();
    const inputExpression = document.getElementById('inputExpression');
    const compileBtn = document.getElementById('compileBtn');
    const threeAddressCodeOutput = document.getElementById('threeAddressCode');
    const resultOutput = document.getElementById('result');
    const variableInputsContainer = document.getElementById('variableInputs');

    // Function to create variable input fields
    function createVariableInputs(variables) {
        variableInputsContainer.innerHTML = '';
        variables.forEach(variable => {
            const div = document.createElement('div');
            div.className = 'variable-input';
            
            const label = document.createElement('label');
            label.textContent = variable;
            
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `var-${variable}`;
            input.value = '0';
            input.addEventListener('change', (e) => {
                compiler.variables.set(variable, parseFloat(e.target.value) || 0);
                updateResult();
            });
            
            div.appendChild(label);
            div.appendChild(input);
            variableInputsContainer.appendChild(div);
        });
    }

    // Function to update the result
    function updateResult() {
        const expression = inputExpression.value.trim();
        if (!expression) return;

        try {
            const result = compiler.compile(expression);
            threeAddressCodeOutput.textContent = result.threeAddressCode.join('\n');
            resultOutput.textContent = `Result: ${result.result}`;
        } catch (error) {
            alert('Error compiling expression: ' + error.message);
        }
    }

    // Handle input expression changes
    inputExpression.addEventListener('input', () => {
        const expression = inputExpression.value.trim();
        if (!expression) return;

        try {
            const variables = compiler.extractVariables(expression);
            createVariableInputs(variables);
            updateResult();
        } catch (error) {
            console.error('Error processing expression:', error);
        }
    });

    // Handle compile button click
    compileBtn.addEventListener('click', updateResult);
}); 