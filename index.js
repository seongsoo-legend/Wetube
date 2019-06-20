import express from "express"
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();

const PORT = 4000;

const handleListening =() =>
    console.log(`Listening on: http://localhost:${PORT}`);

const handleHome = (req, res) => res.send('/')

const handleProfile = (req, res) => res.send('You are my no.1');
/*
* "/", "/ about-us", "/ contact"및 "/ protected"네 경로를 만듭니다.
각 경로는 페이지 이름 (예 : '/ about-us'-> About)이 포함 된 문자열을 렌더링해야합니다.
모든 경로에 대해 하나의 미들웨어를 만들고 그 미들웨어는 모든 경로에 대한 모든 요청에 대해
"나는 미들웨어입니다"라는 메시지를 console.log에 기록해야합니다.
"/ protected"로 이동하려고 시도하면 "/ protected"로 이동하지 못하게하는
 미들웨어를 만듭니다. "/ protected"로 이동하려고하면 "/"로 리디렉션되어야합니다.

*
*
* */
const handleAboutUs = (req, res) => res.send("About");

const handleContact = (req, res) => res.send("Contact");

const handleProtected = (req, res) => res.send("Contact");

const handleredirect = (req, res) => {
    res.redirect("/");
};

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(helmet());
app.use(morgan("dev"));

// const middleware = (req, res, next) => {
//     res.send("not woking")
// };

// const betweenHome = (req, res, next) => {
//     console.log("나는 미들웨어입니다.");
//     next();
// };
//
//
// app.use(betweenHome);

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.get("/about-us", handleAboutUs);

app.get("/contact", handleContact);

app.get("/protected", handleredirect, handleProtected);

app.listen(PORT, handleListening);