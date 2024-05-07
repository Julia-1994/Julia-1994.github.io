function getResuleFromTable() {
  const title = document.querySelectorAll('.huVRfc')[0].innerText;
  const contentText = document.querySelectorAll('.charcoal-token')[1].innerText;
  const tags = document.querySelectorAll('.iWBYKe');
  const tagsContent = [...tags].map(tag => {
    return tag.innerText;
  }).join(', ');
  let content = `## ${title}

#### 标签 ${tagsContent}

  原文链接 ${location.href}
  \n
  ${contentText}
    `;
  content = content.replace(/\n/ig, '\n\n');
  return { title, content };
}


function downLoadResult(fileName, resultStr) {
  const blob = new Blob([resultStr], {
    type: "text/plain;charset=utf-8"
  });
  const objectURL = URL.createObjectURL(blob);
  const aTag = document.createElement('a');
  aTag.href = objectURL;
  aTag.download = fileName + ".md";
  aTag.click();
  URL.revokeObjectURL(objectURL);
}

const { title, content } = getResuleFromTable();

downLoadResult(title, content);
