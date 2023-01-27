# RESTfullV1
# REST API


<img width="395" alt="스크린샷 2023-01-27 오후 8 25 29" src="https://user-images.githubusercontent.com/103430498/215076060-0121c066-70e1-4f23-a950-9630862a090d.png">
<img width="469" alt="스크린샷 2023-01-27 오후 8 25 48" src="https://user-images.githubusercontent.com/103430498/215076193-245227bf-b8bc-4ff9-9fc3-217dabc33596.png">
<img width="813" alt="스크린샷 2023-01-27 오후 8 25 38" src="https://user-images.githubusercontent.com/103430498/215076250-346f902f-27f6-4df5-8efe-be28468f0c5f.png">
<img width="644" alt="스크린샷 2023-01-27 오후 8 25 44" src="https://user-images.githubusercontent.com/103430498/215076260-6ecb5e33-e6df-4bf5-ae2d-47fc7d5e23b7.png">

## method-override middleware
- run 
```bash
$ npm i method-override
```
- RESTfull API의 7가지 패턴 중 정보 업데이트 PUT, PATCH, 데이터 삭제 DELETE는 HTML이 지원하지 않는다
- express에서 `app.put`, `app.delete` 대신 `app.post`를 사용할 수 있지만 이는 RESTful 패턴에 부합하지 않음
- 따라서 method-override 패키지를 통해 PUT, PATCH, DELETE를 사용해야 한다.

```javascript
const methodOverride = require("method-override");
app.use(methodOverride("_method")); 
```

- 파라미터로 들어가는 문자열은 HTML에서 사용할 가상의 PUT, PATCH, DELETE를 위한 식별자 역할을 한다.
```ejs
<form action="/comments/<%= comment.id %>?_method=PATCH" method="post">
```
- `form` 태그의 method는 POST로 하되 `action`에 ?_method를 붙여서 PATCH method로 전송함.

```javascript
// Update content
app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newComment = req.body.comment;
  const foundcomment = comments.find((c) => c.id === id);
  foundcomment.comment = newComment;
  res.redirect("/comments");
});
```

```ejs
    <form method="post" action="/comments/<%= comment.id %>?_method=DELETE">
```
- `form` 태그의 method는 POST로 하되 `action`에 ?_method를 붙여서 DELETE method로 전송함.
```javascript
// delete content
app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});
```

- `app.patch`의 예시

## uuid
- Universally Unique IDentifier의 약어로 범용 고유 식별자라는 의미
- 종류
  - v1: 타임스탬프(시간) 기준
  - v3: MD5 해시 기준
  - v4: 랜덤값 기반
  - v5: SHA-1 해시 기준
랜덤값 기반으로 생성되는 v4가 가장 많이 사용되고, 다음으로는 시간 기준인 v1이 많이 사용됨

- 설치
```bash
$ npm i uuid4
## uuid4만 설치 
```

```javascript
const { v4: uuid } = require("uuid");
```

- 예시
```javascript
let comments = [
  { id: uuid(), username: "Todd", comment: "Todd's world" },  // ex) id : e502a87c-a51f-4b55-a8ed-a780c2792e2b
  { id: uuid(), username: "Jhon", comment: "Jhon's world" },
  { id: uuid(), username: "Juan", comment: "Juan's world" },
  { id: uuid(), username: "Kane", comment: "Kane's world" },
];
```
