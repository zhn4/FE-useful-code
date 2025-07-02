<template>
  <div>
    <h3>F12 打开控制台</h3>
    <div>
      <div>参考内容</div>
      <ul>
        <li>
          <a href="https://dev.to/lissy93/fun-with-consolelog-3i59">https://dev.to/lissy93/fun-with-consolelog-3i59</a>
        </li>
        <li>
          <a
            href="https://github.com/Lissy93/dashy/blob/master/src/utils/CoolConsole.js">https://github.com/Lissy93/dashy/blob/master/src/utils/CoolConsole.js</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConsoleCollect',
  mounted() {
    console.log('ConsoleCollect mounted');
    // 模拟一些 console 输出
    console.log('这是一个测试输出');
    console.warn('这是一个警告输出');
    console.error('这是一个错误输出');

    this.handleConsoleZero(1);
    this.handleConsoleOne();

    this.handleConsoleZero(2);
    this.handleConsoleTwo();

    this.handleConsoleZero(3);
    this.handleConsoleThree('this is a message', true);

    this.handleConsoleZero(4);
    function testCallback() {
      let num = 0;
      for (let i = 0; i < 1000000; i++) {
        // 模拟一些耗时操作
        num++
      }
      console.log(`回调函数执行完毕，结果是: ${num}`);
    }
    this.handleConsoleFour(testCallback);

    this.handleConsoleZero(5);
    this.handleConsoleFive()
  },
  methods: {
    handleConsoleZero(index) {
      console.log(`%c${index} ↓↓↓`, 'color: red; font-size: 20px; font-weight: bold;');
    },
    handleConsoleOne() {
      let styleList = [
        'color: red; font-size: 16px; border-left: 4px solid red; border-top: 4px solid red; border-bottom: 4px solid red;',
        'color: green; font-size: 16px; border-top: 4px solid green; border-bottom: 4px solid green;',
        'color: blue; font-size: 16px; border-right: 4px solid blue; border-top: 4px solid blue; border-bottom: 4px solid blue;'
      ]
      console.log(`%c- st%ca%crt -`, ...styleList)
      console.log(123)
      console.log(456)
      console.log('%c-  e%cn%cd  -', ...styleList)
    },
    handleConsoleTwo() {
      const v = process.env.BASE_URL ? `${process.env.BASE_URL}` : '';
      const style = `
        color:#0dd8d8;
        background:#0b1021;
        font-size:1.5rem;
        padding:0.15rem 0.25rem;
        margin: 1rem auto;
        font-family: Rockwell;
        border: 2px solid #0dd8d8;
        border-radius: 4px;
        font-weight: bold;
        text-shadow: 1px 1px 1px #00af87bf;
      `
      console.log(`\n%cDashy  ${v} 🚀`, style);
    },
    handleConsoleThree(message, stack) {
      const styleOne = `
        color:#ceb73f; background: #ceb73f33; font-size:1.5rem; padding:0.15rem; margin: 1rem auto; font-family: Rockwell, Tahoma, 'Trebuchet MS', Helvetica; border: 2px solid #ceb73f; border-radius: 4px; font-weight: bold; text-shadow: 1px 1px 1px #000000bf;
      `;
      const styleTwo = `font-weight: bold; font-size: 1rem;color: #ceb73f;`
      console.info(`%c⚠️ Warning ⚠️%c \n${message}`, styleOne, styleTwo);
      if (stack) {
        console.warn(`%cStack Trace%c\n${stack}`, 'font-weight: bold;', '');
      }
    },
    handleConsoleFour(callBack) {
      console.time(`concatenation`);
      if (callBack && typeof callBack === 'function') {
        console.log('开始执行回调函数');
        callBack()
      } else {
        console.error('回调函数未定义或不是函数');
      }
      console.timeEnd(`concatenation`);
    },
    handleConsoleFive(callBack) {
      console.time('concatenation');
      for (let i = 0; i < 5; i++) {
        console.log(`处理到第 ${i} 个`);
        console.timeLog('concatenation');
      }
      console.timeEnd('concatenation');
    },
  },
};
</script>