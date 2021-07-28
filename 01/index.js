const colors = require('colors');
let arg = process.argv[2];
let n;
let color = 'green';
let prime = []
let notPrime = []
// console.log(colors.red(`aaa ${process.argv[2]}`))
try {
    if (isNaN(arg)) {
        throw 'не число'
    } else if (arg == 1) {
        throw '1 не простое число'
    } else if (arg > 100) {
        throw 'Слишком большое число. Принимаються числа от 2 до 100'
    } else {
        n = arg;
    }

} catch (error) {
    console.log(error);
}

function pushNotPrime(n) {
    for (let i = 1; i <= n; i++) {
        notPrime.push(i)
    }
}
pushNotPrime(n)

// Да я увы не понял как заменить на рекурсию =(
nextPrime:
for (let i = 2; i <= n; i++) {

    for (let j = 2; j < i; j++) {
        if (i % j == 0) continue nextPrime;
    }
    prime.push(i)
}

diff = function (a1, a2) {
    a1.filter(i => {
        console.log(colors.white(i));

        if (a2.includes(i)) {
            switch (color) {
                case 'green':
                    console.log('^ Prime', colors.green(i));
                    color = 'yellow'
                    break;
                case 'yellow':
                    console.log('^ Prime', colors.yellow(i));
                    color = 'red'
                    break;
                case 'red':
                    console.log('^ Prime', colors.red(i));
                    color = 'green'
                    break;
            }
        }
    })
}

diff(notPrime, prime)



