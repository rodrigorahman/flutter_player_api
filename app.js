const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bandaRouter = require('./routes/bandas')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/player');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/bandas', bandaRouter)

module.exports = app;
