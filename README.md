# BasicBoilerplate

## 설명 

   1) script 에서 dev과 production 분리 및 실행
     - 사용 모듈 : env, cross-env
    
`` npm install env crosse-env --save-dev ``

    <pre>
    <code>
    // src/config/serverConfig.js
    
    // dev와 production 분리를 위해
    dotenv.config({
    path: path.resolve(__dirname, `../../.env.${environment}`),
    });
    </pre>
    </code>

    
    

<br/>
<br/>


<br/>
<br/>

 
<br/>
<br/>

# 🔎 DB ERD
- ERD 구성 시,
  1) model 에 user.js를 생성
  2) Row Query 를 작성
