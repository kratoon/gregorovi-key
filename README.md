* image to base64 `cat img.jpg | base64`
* update `.env`:
  * PASSPHRASE
  * IMAGE_BASE64
* encrypt image `node --env-file=.env scripts/encrypt.js`
* set the encrypted values in the `src/index.html` variable `encryptedTextHex` 
