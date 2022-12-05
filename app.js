const express = require('express')
const path = require('path')
const app = express()
const port = 3007

const { SDK } = require('casdoor-nodejs-sdk')

const authCfg = {
  endpoint: 'https://user.loseeplus.com',
  clientId: '66d89d51efa7f95c26ee',
  clientSecret: '44dcbfa3f8fd1b5ef8397cdf5ab11b672ba51672',
  certificate: '\
    -----BEGIN CERTIFICATE-----\n\
    MIIE2TCCAsGgAwIBAgIDAeJAMA0GCSqGSIb3DQEBCwUAMCYxDjAMBgNVBAoTBWFk\n\
    bWluMRQwEgYDVQQDDAtjZXJ0X3lrOGx4NjAeFw0yMjEyMDMxNzExNDRaFw00MjEy\n\
    MDMxNzExNDRaMCYxDjAMBgNVBAoTBWFkbWluMRQwEgYDVQQDDAtjZXJ0X3lrOGx4\n\
    NjCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAKHKYerNE+sp25rZAADF\n\
    pyBc5KUZYUGNRoPadGFeLUj1HuZ1aSPjU99Tt5QsYpWO1GC01PApBy7WPkqbGmS5\n\
    CE8CNIFDs0gx56Hs85oaVQLNGdymCdKPBzB9EDNmisig0ZIrcXkru51SllOCbGwU\n\
    Z/vEIlKl+ySSaIvGB3Ucro10DwcdFqyByucqk9xAKWcZY+fMKvTwjFjByaPVKq3s\n\
    hZyHtuaATi4ncblYN0nBnpBbK4cuDnvLTo0RL5mcaRpk/6Q8y0k+Owc1nK2Hugan\n\
    9bIV359YaRozdOI3G//X5NvhXeCgpYVmHAJDhKAri0fg8TP1J9QlDTk1bw6AAwhS\n\
    IYf4VuZEnD7m6CSEkhrbzVBN7gx1mmmwsnAVXR/npsskVL5ropZE77Iwfbw5e/ox\n\
    02l0VyBuWzRbTxuKPSqiU+z78i4ImEnX/OgDQJw5qJtcDSNAa7ZYdt1OEG6pdFP3\n\
    J343zzxMBqhUpRmSE3tOaZnjbLU3Q7MkdiATx/HyzDdVw0LE6+Vpn+fdcT2evBPW\n\
    bhG5gnet0VaMwNVoT9MBGua2zJ1kP+37A5DkwH0xetktL5IajQWESHUUVd8AgmNF\n\
    /46DX363waDHHtA4mVXKMHvplXYR0RUMTDCroiMh4jk3G0noRdT7k1PggxP8uQRS\n\
    FiBZKjGBQpIVBFPvnAC8AIBVAgMBAAGjEDAOMAwGA1UdEwEB/wQCMAAwDQYJKoZI\n\
    hvcNAQELBQADggIBADLdoMfykoQe0lIiY1Lr85+sf/fsnY2UMKle5EKGR5DtFkDs\n\
    GXNj1WHYYoZeRbAh+3u5vryfTfvgYHFEFhNe4KopsrOsxjmF6cg+n9RQ9Ct4Qj0R\n\
    mi5YITSQ7VY2MwDNNUcuTxPlIEio7MhWWkl6vgYczgKg8jXgMWPR1zYwyMrnJJ+u\n\
    lE4j5Zp+TTlx4TcLItjeE7NIaqak/lCexufEw7NOVQ4UF1/Z6siiwDnjAAEMPHOT\n\
    jvdezpTQyX72mfmrkNFwvwHA2eQuwypdjAQiBcILuCUrcQROxruTQYVwmmGRJIL1\n\
    mVCgdVKdWk2bDARRdZlUQq0A0jvO20TobkIZyWSvrS75CnW1nGAmsmoJj+4lL8si\n\
    /APbceqIZ2MnXQWCdg2Gjdi0YPwTuypcDBy9jFxXdO+cGir1DYBQA4G3bDOrjXc2\n\
    CCa5YBdYK30Mz1XlLg2tLuC0l1BTlyIxtw4PXnFe1CI6jRKlyNZt4t5pJM94Kaya\n\
    UuE8KAhtnLI9/RGp/z1SgbvhIrwksP08QqDLBFQm+5fO2c6xOi4sFpdnXhy6TuoM\n\
    +8tlyl8etpnPSBeUMdAzOgjN1NfzE5NC+PDW0kqILgluvW9+SZZTCvze1OqNOvCr\n\
    VL8i17MgSUgRp+jZaLCNpMqTBBWApFGek2vbtuAQdR47hUd0OEQOOv4zzKFB\n\
    -----END CERTIFICATE-----',
  orgName: 'testcasdoor',
  appName: 'testcasdoor'
}

const sdk = new SDK(authCfg)

app.use(express.static(path.join(__dirname, 'public')))

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.post('/api/signin', (req, res) => {
  // console.log('post singin req', req.query)
  const { code, state } = req.query
  console.log('code', code, state)
  // auth
  sdk.getAuthToken(code).then(token => {
    console.log('token', token)
    // const user = sdk.parseJwtToken(token)
    // console.log("sigin user", user)
    res.send(JSON.stringify({ name: 'xxxx' }))
  })
})

app.listen(port, () => {
  console.log(`example app listening on port ${port}`)
})