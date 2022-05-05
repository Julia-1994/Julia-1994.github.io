var fs = require('fs');

// auto generate markdown file path（v2）
var default_list = ['docs'];

for (var i = 0; i < default_list.length; i++) {
  var runNodes = function(files, father_path) {
    if (!Array.isArray(files)) {
      return;
    }
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
  var path = './' + default_list[i];
  // check path valid (user input path may not valid)
  if (!fs.existsSync(path)) {
    console.log(`${path} is invalid`);
    continue;
  }
  var files = fs.readdirSync(path);
  var res = [];
  runNodes(files, path);

  // optimise path format and add enter 
  var result = '';
  for (let i = 0; i < res.length; i++) {
    let curr = res[i];
    curr = curr.replace(path + '/', '');
    let right = curr;
    let left = curr.slice(curr.lastIndexOf('/') + 1).replace('.md', '');
    let all = `- '${left}': '${right}'\n`;
    result += all;
  }
  fs.writeFileSync(default_list[i] + '.md', result);
}
