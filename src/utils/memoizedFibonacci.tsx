const randomNumFromRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const fibResults: {[fibResult: number]: number} = {};

const memoizedFibonacci = (n: number = randomNumFromRange(0, 30)): number => {
    if(fibResults[n] !== undefined) return fibResults[n];
    
    const fibonacci = (n: number): number => {
        if(fibResults[n]) return fibResults[n];        
        if (n <= 1) {
            return n;
        };
        return fibonacci(n - 1) + fibonacci(n - 2);
    };

    fibResults[n] = fibonacci(n);
    return fibResults[n];
};

export default memoizedFibonacci;