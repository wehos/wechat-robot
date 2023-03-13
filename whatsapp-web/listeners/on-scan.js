/**
 * 获取二维码，登录
 * by: Peanut
 */
async function onScan (qrcode, status) {
  console.log('attempting to login')
  require('qrcode-terminal').generate(qrcode, {small: true})

  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode),
  ].join('')

  console.log(status, qrcodeImageUrl)
}

module.exports = onScan
