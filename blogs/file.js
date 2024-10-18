var fs = require('fs');

// auto generate markdown file path（v2）
var dirList = ['docs'];

for (var i = 0; i < dirList.length; i++) {
  var runNodes = function(files, father_path) {
    if (!Array.isArray(files)) {
      return;
    }
    const currentPath = father_path.replace('./' + dirList[i], '');
    res.push(currentPath);
    for (let i = 0; i < files.length; i++) {
      if (files[i] === '.DS_Store') {
        continue;
      }
      if (files[i].includes('.md')) {
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
  var path = './' + dirList[i];
  // check path valid (user input path may not valid)
  if (!fs.existsSync(path)) {
    console.log(`${path} is invalid`);
    continue;
  }
  var files = fs.readdirSync(path);
  var res = [];
  runNodes(files, path);

  // optimise path format and add enter 
  // './personal/docs/economy/xxx.md' to - 'xxx': 'economy/xxx.md'
  var result = '';
  for (let i = 0; i < res.length; i++) {
    // current item is markdown
    if (res[i][0] === '.') {
      let curr = res[i];
      curr = curr.replace(path + '/', '');
      let right = curr;
      let left = curr.slice(curr.lastIndexOf('/') + 1).replace('.md', '');
      let all = `        - '${left}': '${right}'\n`;
      result += all;
    }
    // current item is dir
    else {
      if (res[i].length > 0) {
        result += (`\n    - '${res[i].slice(1)}':\n`).replace(/[\']/ig, '');
      }
    }
  }
  fs.writeFileSync(dirList[i] + '.md', result);
  // push result to mkdock.yml end
  const setting_path = './mkdocs.yml';
  let setting = fs.readFileSync(setting_path, 'utf8');
  setting += result;
  fs.writeFileSync(setting_path, setting);
}
