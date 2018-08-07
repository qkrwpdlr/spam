const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var user_api = require('./api/user/index.js')
//test환경에는 로그가 나오지 않는것과 listen 을 하지 않게 만든다 package.json에 test 환경일때 추가시킨다
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/users',user_api);
module.exports = app;
// npm init --> package.json 파일생성
// npm install (moduel) --save ==> 이렇게 하면 module 의 정보가 pacage.json 에 depandonsy 로 추가됨
// 최신버전에는 --save 옵션을 넣지 않아도  자동으로 들어가게 됨으로 ㄱㅊ
// --save-dev 로 옵션을 넣으면 띠로 dev용이 뽑힘
// 이동한 다음 npm install 을 실행하게 되면 package.json 속의 의존성파일들이 자동으로 설치된다.
// npm package.json 속의 script 안에 "start" : "node index.js" 이런식으로 하게되면 npm start 로 실행가능
/*
2XX: 자, 여기있어
200: 성공(success), GET, PUT
201: 작성됨(created), POST
204: 내용 없음 (No Conent), DELETE
4XX: 니가 문제임

400: 잘못된 요청 (Bad Request)
401: 권한 없음 (Unauthorized)
404: 찾을 수 없음 (Not found)
409: 충돌 (Conflict)
5XX: 내가 문제임

500: 서버 에러 (Interel server error)
*/