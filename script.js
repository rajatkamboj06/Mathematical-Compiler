const functionInput = document.getElementById('functionInput');
const executeBtn = document.getElementById('executeBtn');
const output = document.getElementById('output');
const variableContainer = document.getElementById('variableContainer');
const addVarBtn = document.getElementById('addVarBtn');
const functionList = document.getElementById('functionList');

const mathFunctions = {
    // Arithmetic Operations
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => b !== 0 ? a / b : 0,
    mod: (a, b) => a % b,
    
    // Power Operations
    power: (base, exp) => Math.pow(base, exp),
    square_root: a => Math.sqrt(a),
    
    // Trigonometric Functions
    sine: a => Math.sin(a),
    cosine: a => Math.cos(a),
    tangent: a => Math.tan(a),
    cotangent: a => 1 / Math.tan(a),
    secant: a => 1 / Math.cos(a),
    cosecant: a => 1 / Math.sin(a),
    
    // Inverse Trigonometric Functions
    arcsin: a => Math.asin(a),
    arccos: a => Math.acos(a),
    arctan: a => Math.atan(a),
    
    // Hyperbolic Functions
    sinh_func: a => Math.sinh(a),
    cosh_func: a => Math.cosh(a),
    tanh_func: a => Math.tanh(a),
    
    // Logarithmic and Exponential Functions
    natural_log: a => Math.log(a),
    log_base10: a => Math.log10(a),
    exponential: a => Math.exp(a),
    
    // Rounding Functions
    floor_func: a => Math.floor(a),
    ceil_func: a => Math.ceil(a),
    round_func: a => Math.round(a),
    
    // Min and Max Functions
    min_func: (a, b) => Math.min(a, b),
    max_func: (a, b) => Math.max(a, b),
    
    // Absolute Value and Sign Functions
    absolute: a => Math.abs(a),
    sign: a => Math.sign(a),
    
    // Factorial Function
    factorial: function(n) {
        if (n < 0) return -1;
        if (n === 0 || n === 1) return 1;
        return n * this.factorial(n - 1);
    },
    
    // Permutation Function
    permutation: function(n, r) {
        return this.factorial(n) / this.factorial(n - r);
    },
    
    // Combination Function
    combination: function(n, r) {
        return this.factorial(n) / (this.factorial(r) * this.factorial(n - r));
    },
    
    // GCD and LCM Functions
    gcd: function(a, b) {
        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    },
    
    lcm: function(a, b) {
        return (a * b) / this.gcd(a, b);
    },
    
    // Bitwise Operations
    bitwise_and: (a, b) => a & b,
    bitwise_or: (a, b) => a | b,
    bitwise_xor: (a, b) => a ^ b,
    bitwise_not: a => ~a,
    left_shift: (a, b) => a << b,
    right_shift: (a, b) => a >> b,
    
    // Complex Number Operations
    Complex: function(real, imag) {
        return {
            real: real,
            imag: imag,
            toString: function() {
                return `${this.real} + ${this.imag}i`;
            }
        };
    },
    real_part: c => c.real,
    imaginary_part: c => c.imag,
    magnitude: c => Math.sqrt(c.real * c.real + c.imag * c.imag),
    phase: c => Math.atan2(c.imag, c.real),
    
    // Random Number Functions
    random_int: (lower, upper) => Math.floor(Math.random() * (upper - lower + 1)) + lower,
    
    // Miscellaneous Functions
    sigmoid: x => 1 / (1 + Math.exp(-x)),
    heaviside: x => x >= 0 ? 1 : 0,
    identity: x => x,
    
    // Constants
    PI: Math.PI,
    E: Math.E
};

// Display all functions in the left panel
function displayFunctions() {
    const groups = [
        {
            title: "Arithmetic Operations",
            functions: [
                "add(a, b) { return a + b; }",
                "subtract(a, b) { return a - b; }",
                "multiply(a, b) { return a * b; }",
                "divide(a, b) { return (b != 0) ? a / b : 0; }",
                "mod(a, b) { return a % b; }"
            ]
        },
        {
            title: "Power Operations",
            functions: [
                "power(base, exp) { return Math.pow(base, exp); }",
                "square_root(a) { return Math.sqrt(a); }"
            ]
        },
        {
            title: "Trigonometric Functions",
            functions: [
                "sine(a) { return Math.sin(a); }",
                "cosine(a) { return Math.cos(a); }",
                "tangent(a) { return Math.tan(a); }",
                "cotangent(a) { return 1 / Math.tan(a); }",
                "secant(a) { return 1 / Math.cos(a); }",
                "cosecant(a) { return 1 / Math.sin(a); }"
            ]
        },
        {
            title: "Inverse Trigonometric",
            functions: [
                "arcsin(a) { return Math.asin(a); }",
                "arccos(a) { return Math.acos(a); }",
                "arctan(a) { return Math.atan(a); }"
            ]
        },
        {
            title: "Hyperbolic Functions",
            functions: [
                "sinh_func(a) { return Math.sinh(a); }",
                "cosh_func(a) { return Math.cosh(a); }",
                "tanh_func(a) { return Math.tanh(a); }"
            ]
        },
        {
            title: "Logarithmic/Exponential",
            functions: [
                "natural_log(a) { return Math.log(a); }",
                "log_base10(a) { return Math.log10(a); }",
                "exponential(a) { return Math.exp(a); }"
            ]
        },
        {
            title: "Rounding Functions",
            functions: [
                "floor_func(a) { return Math.floor(a); }",
                "ceil_func(a) { return Math.ceil(a); }",
                "round_func(a) { return Math.round(a); }"
            ]
        },
        {
            title: "Other Functions",
            functions: [
                "min_func(a, b) { return Math.min(a, b); }",
                "max_func(a, b) { return Math.max(a, b); }",
                "absolute(a) { return Math.abs(a); }",
                "sign(a) { return Math.sign(a); }",
                "factorial(n) { /* recursive implementation */ }",
                "permutation(n, r) { return factorial(n)/factorial(n-r); }",
                "combination(n, r) { return factorial(n)/(factorial(r)*factorial(n-r)); }",
                "gcd(a, b) { /* Euclidean algorithm */ }",
                "lcm(a, b) { return (a*b)/gcd(a,b); }",
                "sigmoid(x) { return 1/(1+Math.exp(-x)); }"
            ]
        }
    ];

    groups.forEach(group => {
        const groupElement = document.createElement('div');
        groupElement.className = 'function-group';
        
        const titleElement = document.createElement('h3');
        titleElement.textContent = group.title;
        groupElement.appendChild(titleElement);
        
        group.functions.forEach(func => {
            const funcElement = document.createElement('div');
            funcElement.className = 'function-item';
            
            // Add syntax highlighting
            const funcText = func
                .replace(/function|return/g, '<span class="keyword">$&</span>')
                .replace(/\/\/.*/, '<span class="comment">$&</span>')
                .replace(/\b(double|int|long long)\b/g, '<span class="type">$&</span>');
            
            funcElement.innerHTML = funcText;
            groupElement.appendChild(funcElement);
        });
        
        functionList.appendChild(groupElement);
    });
}

// Execute the function
executeBtn.addEventListener('click', () => {
    try {
        // Get the function call
        const funcCall = functionInput.value.trim();
        if (!funcCall) {
            output.textContent = "Error: Please enter a function call";
            return;
        }
        
        // Get all variable values
        const variables = {};
        document.querySelectorAll('.var-container').forEach(container => {
            const name = container.querySelector('.var-name').value;
            const value = container.querySelector('.var-value').value;
            if (name && value) {
                variables[name] = isNaN(value) ? value : parseFloat(value);
            }
        });
        
        // Create a function that has access to all math functions and variables
        const allFunctions = {...mathFunctions, ...variables};
        const funcKeys = Object.keys(allFunctions);
        const funcValues = Object.values(allFunctions);
        
        const func = new Function(...funcKeys, `return ${funcCall}`);
        
        // Execute the function
        const result = func(...funcValues);
        
        // Display the result
        if (typeof result === 'object' && result !== null && 'real' in result && 'imag' in result) {
            output.textContent = `Result: ${result.real} + ${result.imag}i`;
        } else if (typeof result === 'number' && !Number.isInteger(result)) {
            output.textContent = `Result: ${result.toFixed(6)}`;
        } else {
            output.textContent = `Result: ${result}`;
        }
    } catch (error) {
        output.textContent = `Error: ${error.message}`;
    }
});

// Add variable row
addVarBtn.addEventListener('click', () => {
    const newRow = document.createElement('div');
    newRow.className = 'var-container';
    newRow.innerHTML = `
        <input type="text" placeholder="Variable name" class="var-name">
        <input type="text" placeholder="Value" class="var-value">
        <button class="remove-var">×</button>
    `;
    variableContainer.appendChild(newRow);
    
    // Add event listener to the remove button
    newRow.querySelector('.remove-var').addEventListener('click', () => {
        variableContainer.removeChild(newRow);
    });
});

// Initialize the app
displayFunctions();

// Add event listener to existing remove buttons
document.querySelectorAll('.remove-var').forEach(btn => {
    btn.addEventListener('click', (e) => {
        variableContainer.removeChild(e.target.parentNode);
    });
});

// Add some example variables by default
const defaultVars = [
    { name: 'x', value: '5' },
    { name: 'y', value: '3' },
];

defaultVars.forEach(v => {
    const newRow = document.createElement('div');
    newRow.className = 'var-container';
    newRow.innerHTML = `
        <input type="text" placeholder="Variable name" class="var-name" value="${v.name}">
        <input type="text" placeholder="Value" class="var-value" value="${v.value}">
        <button class="remove-var">×</button>
    `;
    variableContainer.appendChild(newRow);
    
    // Add event listener to the remove button
    newRow.querySelector('.remove-var').addEventListener('click', () => {
        variableContainer.removeChild(newRow);
    });
});

// Add example function call
functionInput.value = 'add(x, y)';