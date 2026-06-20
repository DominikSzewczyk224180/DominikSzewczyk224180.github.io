print("Hello")

# codacy_error_example.py

# Function with no docstring and complexity
def calculate(a, b):
    if a > b:
        return a - b
    elif a < b:
        return b - a
    else:
        if a == 0:
            return "Zero"
        else:
            return a + b


# Using `exec` and `eval` (security issues)
dangerous_code = "print('Hello World')"
exec(dangerous_code)  # Codacy should flag this as dangerous


# Function with no docstring and complexity
def calculate(a, b):
    if a > b:
        return a - b
    elif a < b:
        return b - a
    else:
        if a == 0:
            return "Zero"
        else:
            return a + b

