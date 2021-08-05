const fs = require('fs');

const startStream = (path, encoding) => (...ips) => {
    const readStream = fs.createReadStream(path, encoding);
    if (ips.length === 0) throw new Error('Нужно передать IP адреса')

    ips.forEach(ip => {
        const writeStream = fs.createWriteStream(`./${ip}_request.log`, {
            flag: "a",
            encoding: encoding
        })
        let prevChunk = '';

        readStream.on("data", (chunk) => {
            const str = prevChunk + chunk.toString();
            const res = str
                .split('\n')
                .filter(el => el.indexOf(`${ip}`) !== -1)
                .join('\n')
            writeStream.write(res)
        })
    })

}

startStream('./access.log', 'utf-8',)('89.123.1.41', '34.48.240.111')