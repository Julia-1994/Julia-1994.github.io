var fs = require('fs');
const { exec } = require('child_process');

// 将图片文件自动生成 markdown 文档

var dirList = [
  './Noelle',
  './KamisatoAyaka',
  './Jane',
  './Amber',
  './Barbara',
  './Keqing',
  './Xiaogong',
];

// Recursively iterates through files and folders to get the markdown file path
for (var i = 0; i < dirList.length; i++) {
  var runNodes = function(files, father_path) {
    if (!Array.isArray(files)) {
      return;
    }
    for (let i = 0; i < files.length; i++) {
      if (files[i] === '.DS_Store') {
        continue;
      }
      if (files[i].includes('.webp') || files[i].includes('.jpg') || files[i].includes('.png')) {
        let newPath = father_path + '/' + files[i];
        res.push(newPath);
      }
      if (!files[i].includes('.')) {
        let newPath = father_path + '/' + files[i];
        let newFiles = fs.readdirSync(newPath);
        runNodes(newFiles, newPath);
      }
    }
  }

  var path = dirList[i];
  // check path valid (user input path may not valid)
  if (!fs.existsSync(path)) {
    console.log(`${path} is invalid`);
    continue;
  }
  var files = fs.readdirSync(path);
  var res = [];
  runNodes(files, path);

  // generate markdown file
  // './images/xxx.png' to ![](./images/xxx.png)
  var result = '';
  for (let i = 0; i < res.length; i++) {
    let curr = res[i];

    let index = curr.lastIndexOf('/');
    let name = curr.slice(index + 1);
    result += `## ${name}\n\n`;

    let imagePath = `![](https://julia-1994.github.io/images/${curr})\n\n`
    result += imagePath;
  }
  fs.writeFileSync('./output/' + dirList[i].replace(/\.\//ig, '') + '.md', result);
}

exec('cp -r ./output/ ../blogs/docs/photo', (error, stdout, stderr) => {
  if (error) {
    console.error(`执行的错误: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
