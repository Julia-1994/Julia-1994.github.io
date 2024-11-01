// 给文章添加统计信息
let fs = require('fs');

function getLenType(len) {
  if (len < 3000) {
    return '生草文'
  } else if (len < 10000) {
    return '短篇小说'
  } else if (len < 50000) {
    return '中篇小说'
  } else if (len < 200000) {
    return '长篇小说'
  } else {
    return '超长篇小说';
  }
}

let recursionFiles = function(files, father_path) {
  if (!Array.isArray(files)) {
    return;
  }
  for (let i = 0; i < files.length; i++) {
    if (files[i] === '.DS_Store') {
      continue;
    }
    if (files[i].includes('.md')) {
      let newPath = father_path + '/' + files[i];
      let fileContent = fs.readFileSync(newPath);
      let fileLen = fileContent.length;
      res.push(`路径${newPath} \n字数${fileLen}  阅读${Math.ceil(fileLen / 500)}分钟  ${getLenType(fileLen)}`);
      let fileInto = `统计信息：字数${fileLen}  阅读${Math.ceil(fileLen / 500)}分钟  ${getLenType(fileLen)}`;
      if (!fileContent.includes('统计信息')) {
        let firstEnterIndex = fileContent.indexOf('\n');
        let newContent = fileContent.slice(0, firstEnterIndex) + '\n\n' + fileInto + '\n' + fileContent.slice(firstEnterIndex);
        if (newContent[0] !== '#') {
          newContent = '# ' + newContent;
        }
        fs.writeFileSync(newPath, newContent);
      }
    }
    if (!files[i].includes('.')) {
      let newPath = father_path + '/' + files[i];
      let newFiles = fs.readdirSync(newPath);
      recursionFiles(newFiles, newPath);
    }
  }
}

let path = './docs';
let files = fs.readdirSync(path);
let res = [];
recursionFiles(files, path);
// res = res.sort((a, b) => a > b ? -1 : 1);

fs.writeFileSync('statistics.md', res.join('\n\n'));
