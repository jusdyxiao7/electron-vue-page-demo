// //引入node原生fs模块
// const fs = require("fs")
// // 引入node内置的path模块
// const path = require("path")
// //引入node原生读写配置
// const ini = require("ini")
// /* 执行node命令时候的文件夹地址 */
// const node_serve_path = process.cwd()
// /* 判断是否是生产环境 */
// const isDev = process.env.NODE_ENV === "development"
// /* 需要读写的文件地址 */
// const file_path = isDev
//   ? path.join(node_serve_path, "/config.json")
//   : path.join(node_serve_path, "/config.json")
//
// // 读取配置文件
// export function readFile() {
//   return new Promise((resolve, reject) => {
//     fs.readFile(file_path, "utf8", function (err, dataStr) {
//       if (err) return reject(err.message); //读取失败
//       /* application.properties  文件内容符合ini配置文件的格式，
//       就可以通过ini.parse把读取到的文件转成js可识别的对象 */
//       resolve(ini.parse(dataStr.toString()));
//     });
//   });
// }
// // 更改配置文件
// export function writeFile(config) {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(file_path, ini.stringify(config), function (err) {
//       if (err) return reject(err.message); //写入失败
//       resolve("写入成功");
//     });
//   });
// }
