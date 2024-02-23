# BasicBoilerplate

## Intro

   script 에서 dev과 production 분리 및 실행
   - 사용 모듈 : env, cross-env
    
`` npm install env crosse-env --save-dev ``
>[!TIP]
>["devDependencies" 와 "dependencies" 의 차이](https://jeong-park.tistory.com/34)

```
    // src/config/serverConfig.js
    
    // dev와 production 분리를 위해
    dotenv.config({
    path: path.resolve(__dirname, `../../.env.${environment}`),
    });
```
    
    

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
