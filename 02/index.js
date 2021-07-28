const c = require('colors');
require('moment-precise-range-plugin');
const moment = require('moment');
let arg = process.argv[2];
let argHours = +arg.substr(0, 2);
let argDays = +arg.substr(3, 2);
let argMonths = +arg.substr(6, 2);
let argYears = +arg.substr(9, 4);
let argDate = new Date(argYears, argMonths - 1, argDays, argHours, 00, 00);

try {
    if (argHours > 24 || argHours < 0 || argDays > 31 || argDays <= 0 || argMonths > 12 || argDays <= 0 || argYears > 2100 || argYears <= 0
        || isNaN(argHours) || isNaN(argDays) || isNaN(argMonths) || isNaN(argYears)
    ) {
        throw `
        Вы ввели следующее :
            Часы ${c.yellow(argHours)},
            Дeнь ${c.yellow(argDays)},
            Месяц ${c.yellow(argMonths)},
            Год ${c.yellow(argYears)}.
        Проверти введенные данные где то в них ошибка ${c.yellow('=)')}
        ${c.green('Требуемый формат ввода "ЧАСЫ"-"ДЕНЬ"-"МЕСЯЦ"-"ГОД"')}
        `
    } else {
        let start = setInterval(() => {
            let left;
            let textMSG;
            let textWARNING;
            let d = argDays < new Date().getDay();
            let m = argMonths < new Date().getMonth();
            let y = argYears < new Date().getFullYear();
            if (d || m || y) {
                left = moment(argDate).preciseDiff();
                textMSG = 'Прошло'
                textWARNING = c.red(`
Вы ввели прошэдшую дату!!!
${c.yellow('Для остановки приложения нажмите в терминале связку кнопок CTRL + C')}`);
            } else {
                left = moment().preciseDiff(argDate);
                textMSG = 'Осталось'
                textWARNING = ''
            }
            if (left.length === 0) {
                left = "Время вышло"
                console.log(c.red(left));
                clearInterval(start);
            } else {
                console.log(`
${c.green(`Вы ввели : ${argDate.toLocaleString()}`)}
${c.green(`Сегодня : ${new Date().toLocaleString()}`)}
${c.green(`${textMSG}: ${left}`)}
${c.green(`${textWARNING}`)}
`);
            }

        }, 1000)
    }
    if (argHours === 24) throw c.yellow('Вы ввели 24 часа что равносильно 00 часам. День будет переключен на следующий от введенного вами. Потому что логика')

} catch (error) {
    console.log(c.red(error));
}

