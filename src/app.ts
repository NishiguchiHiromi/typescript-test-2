import add from "./modules/add";
import Sub from "./sub";
import $ from "jquery";

console.log(add(10, 5));
var sub = new Sub();
sub.init();

// async functionの中ではawaitでpromiseの結果を待つことができる（async functionの中でないとawaitは効かない）
const test = async () => {
  var num = 2;
  console.log("初期値：" + num);

  num = await squereAfter3sec(num);
  console.log("1回計算後：" + num);

  num = await squereAfter3sec(num);
  console.log("2回計算後：" + num);

  num = await squereAfter3sec(num);
  console.log("3回計算後：" + num);
};

// 3秒後に引数を二乗した値をpromiseに包んで返す
// ※async functionの中で普通にreturnすると自動的にpromiseに包んで返却する
const squereAfter3sec = async num => {
  await sleep(3000);
  return num * num;
};

// 指定の秒数停止し、promiseを返す
const sleep = milliSec => {
  return new Promise(resolve => {
    setTimeout(resolve, milliSec);
  });
};

$(() => {
  $("body").html("jquery");
  test();
});
