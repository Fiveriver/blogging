 var fs = require('fs');
// module을 require(요청)해서 사용할 수 있도록 새로 생성하는 fs, http 객체 변수에 담는다. var http = require('http');
// 웹 서버를 생성(createServer)하고 실행한다. 
http.createServer(function(request, response) { 

 // html파일의 경로를 가져와 fs객체가 가지고 있는(아까 module에서 가져온) readFile 함수를 이용해 (여기선 index.html)html파일을 읽어온다. (readFile 함수의 두 번째 파라미터의 역할은 함수가 잘 실행됬을 때 발생하는 콜백함수역할이라고 볼 수 있을 것이다.)  
fs.readFile('01.helloworld.html', function(error, data)  { 

  response.writeHead(200, {'Conternt-type':'text/html'});   
response.end(data);  });  // 포트번호는 3000(ex. http://localhost:3000)으로 설정한다. 
}).listen(3000, function(){  console.log('server running at http://localhost:3000'); });
