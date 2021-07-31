
# webpack5

#### 常用钩子
```js
environment  |  环境准备好              SyncHook
compile      |  编程开始                SyncHook
compilation  |  编程结束                SyncHook
emit         |  打包资源到 output 之前   AsyncSeriesHook
afterEmit    |  打包资源到 output 之后   AsyncSeriesHook
done         |  打包完成                SyncHook
```