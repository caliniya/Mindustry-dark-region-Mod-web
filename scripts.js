// 等待页面加载完毕后执行
document.addEventListener('DOMContentLoaded', function() {
    // 模组版本数据
    const versions = [
        { version: '0.0.1', description: '介绍文本' },
        { version: '0.0.2', description: '介绍文本' },
        { version: '1.0.0', description: '介绍文本' }
        // 可以根据需要添加更多版本数据
    ];

    // 获取版本列表的 ul 元素
    const versionList = document.getElementById('version-list');

    // 遍历版本数据，创建列表项并添加到 ul 元素中
    versions.forEach(function(ver) {
        const li = document.createElement('li');
        li.textContent = `版本 ${ver.version}: ${ver.description}`;
        
        // 创建下载链接
        const downloadLink = document.createElement('a');
        downloadLink.href = `模组文件/深暗之地v${ver.version}.zip`;
        downloadLink.textContent = '下载';
        downloadLink.setAttribute('download', ''); // 添加 download 属性使其成为下载链接
        
        // 检查文件是否存在
        fileExists(downloadLink.href)
            .then(() => {
                // 文件存在时才添加下载链接
                li.appendChild(downloadLink);
            })
            .catch(() => {
                // 文件不存在时显示错误信息
                const errorText = document.createElement('span');
                errorText.textContent = ' (文件不存在)';
                errorText.style.color = 'red';
                li.appendChild(errorText);
            });
        
        // 将 li 元素添加到版本列表中
        versionList.appendChild(li);
    });

    // 检查文件是否存在的函数
    function fileExists(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('HEAD', url);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve();
                    } else {
                        reject();
                    }
                }
            };
            xhr.send();
        });
    }
});
