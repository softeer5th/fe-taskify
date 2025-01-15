import fs from 'fs';
import http from 'http';

const server = http.createServer((req, res) => {
    console.log(`서버 요청 URL: ${req.url}`);
    switch (req.url) {
        case '/db/data.json':
            readData(res)
            break

    }
})

server.listen(8080, () => {
    console.log('Server running at http://localhost:8080');
});





function readData(res) {
    fs.readFile('./db/data.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(`Error loading JSON file: ${err.message}`);
            res.writeHead(500, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });

            res.end('Error loading JSON file');
            return;
        }

        try {
            const jsonData = JSON.parse(data); // JSON 데이터로 변환
            res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }); // JSON 헤더 설정
            res.end(JSON.stringify(jsonData)); // JSON 데이터를 응답
        } catch (parseError) {
            console.error(`Error parsing JSON: ${parseError.message}`);
            res.writeHead(500, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
            res.end('Error parsing JSON');
        }
    });

}