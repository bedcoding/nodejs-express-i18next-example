const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

const i18next = require('i18next');  // i18next 추가
const i18nextMiddleware = require('i18next-express-middleware');  // express 미들웨어 추가
const Backend = require('i18next-node-fs-backend');




// 예시 (주소창에 'localhost:4000/en'를 입력하면 화면에 영어가 나오는 식으로 동작함)
app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});

app.get('/en', (req, res) => {
    i18next.changeLanguage("en");

    res.json({
        success: i18next.t('home.title'),
    });
});

app.get('/ko', (req, res) => {
    i18next.changeLanguage("ko");

    res.json({
        success: i18next.t('home.title'),
    });
});

app.get('/ja', (req, res) => {
    i18next.changeLanguage("ja");

    res.json({
        success: i18next.t('home.title'),
    });
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});




i18next  //init
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        backend: {
            loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
        },
        fallbackLng: 'en',
        preload: ['en', 'ja', 'ko'],
        saveMissing: true
    });

app.use(i18nextMiddleware.handle(i18next));