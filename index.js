const express = require("express");
const path = require("path"); // 파일/폴더/디렉터리 등의 경로를 편리하게 설정할 수 있는 기능
const app = express();
const port = 3333;
// id 생성
const { v4: uuid } = require("uuid");

// method-override
const methodOverride = require("method-override");
app.use(methodOverride("_method")); // 쿼리 문자열에서 검색

// 자바스크립트에서 데이터를 주고받고 읽을 땐느 객체 형태
app.use(express.urlencoded({ extended: true })); // extended 옵션이 true일 경우, 객체 형태로 전달된 데이터내에서 또다른 중첩된 객체를 허용
app.use(express.json()); // Expressjs 에서 JSON Request Body 파싱하기

// ejs
app.set("view engine", "ejs"); // 원하는 엔진을 템플릿 엔진으로 사용하기 위한 설정
app.set("views", path.join(__dirname, "/views")); // view 파일들이 모여있는 폴더 지정
// 안전하게 경로를 설정하기위해 path모듈의 join()

// 정적(static) 파일 서비스
app.use(express.static(path.join(__dirname, "public")));

let comments = [
  { id: uuid(), username: "Todd", comment: "Todd's world" },
  { id: uuid(), username: "Jhon", comment: "Jhon's world" },
  { id: uuid(), username: "Juan", comment: "Juan's world" },
  { id: uuid(), username: "Kane", comment: "Kane's world" },
];

// ---comments---
app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

// add comment
app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

// comments POST
app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  res.redirect("/comments");
});
// search ID
app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});

// edit comment
app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
});

// Update content
app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newComment = req.body.comment;
  const foundcomment = comments.find((c) => c.id === id);
  foundcomment.comment = newComment;
  res.redirect("/comments");
});

// delete content
app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

// open server
app.listen(port, () => {
  console.log(`Open ${port}`);
});
