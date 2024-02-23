# BasicBoilerplate

## Introduce.

### 프로젝트 간략한 구조

![_프로젝트 구조 drawio](https://github.com/Mirandalaw/BasicBoilerplate/assets/74170593/4969c3f6-1159-42c6-8161-a717255e6c49)

   script 에서 dev과 production 분리 및 실행
   - 사용 모듈 : env, cross-env
    
`` npm install env crosse-env --save-dev ``

--save-dev 를 사용하는 이유가 궁금하다면? [devDependencies 와 dependencies 의 차이](https://jeong-park.tistory.com/34)
   
사용 이유 : dev와 production 분리

```
    // src/config/serverConfig.js
    
    dotenv.config({
    path: path.resolve(__dirname, `../../.env.${environment}`),
    });
```



```
   // package.json
   "scripts" : {
    "start": "cross-env NODE_ENV=dev node ./src/main.js",
    "start:prod": "cross-env NODE_ENV=production node ./src/main.js"
  },
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
