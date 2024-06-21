document.addEventListener('DOMContentLoaded', async function() {
  const versions = [
    { version: '0.0.1', description: '初版发布' },
    { version: '0.0.2', description: '修复了若干 bug' },
    { version: '1.0.0', description: '重大更新，新增了多种功能' }
  ]

  const versionList = document.getElementById('version-list')

  versions.forEach(async function(ver) {
    const li = document.createElement('li')
    li.textContent = `版本 ${ver.version}: ${ver.description}`

    const response = await fetch(`/check-file/模组文件/深暗之地v${ver.version}.zip`)
    const result = await response.json()

    if (result.exists) {
      const downloadLink = document.createElement('a')
      downloadLink.href = `模组文件/深暗之地v${ver.version}.zip`
      downloadLink.textContent = '下载'
      downloadLink.setAttribute('download', '')
      li.appendChild(downloadLink)
    } else {
      const errorText = document.createElement('span')
      errorText.textContent = ' (文件不存在)'
      errorText.style.color = 'red'
      li.appendChild(errorText)
    }

    versionList.appendChild(li)
  })
})
