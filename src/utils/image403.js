export default function (url) {
  if (url !== undefined) {
    return url.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
  }
}
