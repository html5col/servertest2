/**
 * config: Test
 */
'use strict'
const path = require('path')
const appDir = path.join(path.dirname(require.main.filename), '..');
//console.log(`appDir ${appDir}`);

var childProcess = require('child_process')
let hostname
let dbUsername = process.env.dbUsername
let dbPassword = process.env.dbPassword
let mongoPort = process.env.MongoPort || 28017
// console.log(dbUsername, dbPassword, mongoPort)

var config = {
  host: hostname,
  // mongodb 配置
  db: {
    mongo: {
      port: mongoPort,
      uri: `mongodb://localhost:${mongoPort}/test`, // ?authSource=groupForum
      options: {
        user: dbUsername || '',
        pass: dbPassword || '',
        db: { reconnectTries: Number.MAX_VALUE },
        server: {
          poolSize: 5
        }
      }
    },
    redis: {
        // redis config, default to the localhost
      'host': '127.0.0.1',
      'port': '6379',
      'db': '0',
      'pw': '',
      'ttl': 1000 * 60 * 60 * 24 * 30
    }
  },

  session_secret: 'node_site_secret', // 务必修改
  auth_cookie_name: 'node_site',

  // 程序运行的端口
  port: process.env.PORT || '8000',

  // 话题列表显示的话题数量
  list_topic_count: 3,

  // 邮箱配置
  mail_opts: {
    host: 'smtp.ym.163.com',
    port: 994,
    secure: true,
    auth: {
      user: '',
      pass: ''
    }
  },

  // admin 可删除话题，编辑标签。把 myname 换成你的登录名
  admins: { myname: true },
}

if (process.env.NODE_ENV === 'test') {
  config.db = 'mongodb://127.0.0.1/dbname'
}

module.exports = config
