document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const clearButton = document.getElementById('clear');
    const equalButton = document.getElementById('equal');

    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (button.classList.contains('operator')) {
                handleOperator(value);
            } else {
                handleNumber(value);
            }
        });
    });

    clearButton.addEventListener('click', clearDisplay);
    equalButton.addEventListener('click', calculateResult);

    function handleNumber(value) {
        if (currentInput.length < 10) {
            currentInput += value;
            display.textContent = currentInput;
        }
    }

    function handleOperator(value) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculateResult();
        }
        operator = value;
        previousInput = currentInput;
        currentInput = '';
    }

    function clearDisplay() {
        currentInput = '';
        previousInput = '';
        operator = '';
        display.textContent = '0';
    }

    function calculateResult() {
        let result = 0;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operator = '';
        previousInput = '';
        display.textContent = currentInput.slice(0, 10);
    }
});
