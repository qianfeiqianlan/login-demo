# 使用 Authing guard 组件登录 demo

- 前端代码在 guard-demo/src/App.js 中
- 后端代码 ogin-with-guard/server.js、login-with-guard/user.js 两个文件中

``` 主要逻辑是使用 guard 组件登录后拿到用户 id, 将 id 传递到后台，在后台拿到用户信息, 前端使用 https://docs.authing.cn/v2/reference/guard/react.html, 后台获取用户使用 https://docs.authing.cn/v2/reference/sdk-for-node/management/UsersManagementClient.html#通过-id-获取用户信息 ```

# 运行代码
```javascript
cd login-with-guard 

yarn install

yarn start
```

打开 localhost:3001, 使用任意邮箱注册后登录查看效果