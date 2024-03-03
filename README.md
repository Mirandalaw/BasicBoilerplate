# BasicBoilerplate

목적 :  Node.js의 기초적인 세팅과 기능 정리를 통해 예제로 사용할 수 있게 하기 위함.

<br/>

## Structure.

![_프로젝트 구조 drawio](https://github.com/Mirandalaw/BasicBoilerplate/assets/74170593/4969c3f6-1159-42c6-8161-a717255e6c49)

<br/>

## Model, Service, Controller 분리하는 이유

1. 단일 책임 원칙 (Single Responsibility Principle, SRP) 준수: 각 구성 요소는 한 가지 역할만 담당하여 코드의 응집성(cohesion)을 높이고 유지보수를 용이하게 함.
   
2. 재사용성 향상: 모델과 서비스는 비즈니스 로직을 포함하고 있으며, 이는 여러 컨트롤러에서 필요할 수 있습니다. 각 컨트롤러는 이러한 공통 로직을 모델이나 서비스로부터 가져와 재사용할 수 있음.

3. 테스트 용이성: 각 구성 요소가 독립적으로 테스트할 수 있기 때문에 테스트 코드 작성이 용이해집니다. 모델과 서비스를 테스트할 때는 컨트롤러나 뷰(View)를 신경 쓰지 않아도 되므로 테스트가 간편해짐.

4. 유연성과 확장성: 각 구성 요소가 독립적으로 존재하므로 하나의 요소를 변경하거나 대체하는 것이 다른 요소에 영향을 미치지 않습니다. 이는 애플리케이션을 유연하게 유지하고 새로운 기능을 추가하기 쉽게 만듬.

5. 코드 가독성 향상: 각 구성 요소가 명확한 역할을 갖고 있으므로 코드의 의도를 파악하기 쉽고 가독성이 좋아짐.

## How to use?

<br/>

### Initial Settings And Maintenance Method

<br/>

#### Package.json & env

script 에서 dev과 production 분리 및 실행

- 사용 모듈 : env, cross-env

`` npm install env crosse-env --save-dev ``

``--save-dev`` 를 사용하는 이유가 궁금하다면? 

[devDependencies 와 dependencies 의 차이](https://jeong-park.tistory.com/34)

<br/>

사용 이유 : dev와 production 분리하기 위해

<br/>

```
    // src/config/serverConfig.js

    dotenv.config({
    path: path.resolve(__dirname, `../../.env.${environment}`),
    });
```

<br/>

사용 이유 : 운영체제간의 차이로 인한 문제를 해결하기 위해

<br/>

```
   // package.json

   "scripts" : {
    "start": "cross-env NODE_ENV=dev node ./src/main.js",
    "start:prod": "cross-env NODE_ENV=production node ./src/main.js"
  }
```

<br/>
<br/>

#### ServerConfig

Q : 왜 function 하게 구성하였나요?
<br/>
A : test코드 작성을 위해 app을 모듈화하고 싶었습니다.

<br/>

```
   // serverConfig.js

   // 추가적인 미들웨어 추가
   function configureMiddleware(app) {
      app.use(express.json());
      ...
   }

   // 추가적인 라우트 모듈 추가
   function configureRoutes(app, route) {
      app.use("/apis", route);
      ...
   }

   // 서버 생성
   function createServerConfig(config, route) {
      const app = express();
      const port = config.PORT || 3000;
      configureMiddleware(app);
      configureRoutes(app, route);
      function start() {
         console.log(`Server is running on port ${port}`);
       });
      }
      return { start };
   }
   
```

<br/>
<br/>

#### Model

```
module.exports = {
   // 모든 유저 검색
   getAllUser: async () => {
      let connection;
      try {
         // Row Query 작성 
         const query = `SELECT * FROM user`;
         // DB 연결
         connection = await db.getConnection();
         const users = await connection.query(query);

         return users[0];
      } catch (err) {
         // 예외 발생 시 
         logger.error("model Error : ", err.stack);
         return err;
      } finally {
         // connection Pool 반환 - 예외 발생 & try 구문 이후에 무조건 실행이 되어야 하기 때문
         if (connection) {
            await db.releaseConnection(connection);
         }
      }
   },
}
```

<br/>
<br/>

#### Service

```
   const userModel = require("../model/user");
   const logger = require("../util/logger");

   module.exports = {
      findAll: async () => {
         try {
            // 모델단에서 처리된 데이터
            const users = await userModel.getAllUser();
            return users;
         } catch (err) {
            // 예외 발생 시
            console.error(err);
            logger.error("Error : ", err.stack);
            return null;
         }
      },
   }
```

<br/>
<br/>

#### Controller

```
   const userService = require('../service/userService');
   const resHandler = require('../util/resHandler');

   module.exports = {
      userFindAll: async (req, res) => {
      try {
         // 서비스 단에서 처리된 데이터
         const user = await userService.findAll();
         // SuccessResponse
         resHandler.SuccessResponse(res, user, 200);
       } catch (err) {
         // 예외 발생 시
         console.error(err);
         resHandler.FailedResponse(res, err.stack, 500);
       }
     },
   };

```

<br/>
<br/>

#### DB Connection

<br/>

- 사용 모듈 : mysql2, genericPool

<br/>

`` npm install mysql2 genericePool``

<br/>

genericePool을 사용하는 이유가 궁금하다면 ? [generic-pool](https://jeong-park.tistory.com/42)

<br/>

```
// src/loader/db.js
const mysql2 = require('mysql2/promise');
const genericPool = require('generic-pool');

const { mysqlConfig } = require('../config/serverConfig');
const logger = require('../util/logger');

// 커넥션 풀 생성
const pool = genericPool.createPool({
  create: async function () {
    try {
      const connection = await mysql2.createConnection(mysqlConfig);
      return connection;
    } catch (err) {
      logger.error('Error creating connection:', err.stack);
      throw err;
    }
  },
  enableKeepAlive: true,
  destroy: function (connection) {
    return connection.end();
  },
});

module.exports = {
  // 풀에서 커넥션 획득
  getConnection: async function () {
    return await pool.acquire();
  },

  // 사용이 끝난 커넥션을 풀에 반환
  releaseConnection: function (connection) {
    return pool.release(connection);
  },

  // 트랜잭션 시작
  beginTransaction: async function (connection) {
    try {
      await connection.beginTransaction();
    } catch (err) {
      logger.error('Error beginning transaction:', err.stack);
      throw err;
    }
  },

  // 트랜잭션 커밋
  commitTransaction: async function (connection) {
    try {
      await connection.commit();
    } catch (err) {
      logger.error('Error committing transaction:', err.stack);
      throw err;
    }
  },

  // 트랜잭션 롤백
  rollbackTransaction: async function (connection) {
    try {
      await connection.rollback();
    } catch (err) {
      logger.error('Error rolling back transaction:', err.stack);
      throw err;
    }
  },
};
```

<br/>
<br/>

#### DB 연결 시

<br/>

```
const serverConfig = {
   PORT: process.env.PORT,

   // DB config
   // env.dev 나 env.production 에 DB 정보 기재
   mysqlConfig: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
   },
};
```

<br/>
