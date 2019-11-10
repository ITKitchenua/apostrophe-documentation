const fs = require('fs');
const rp = require('request-promise');

go();

async function go() {
  const urls = fs.readFileSync('./urls', 'utf8').split('\n');
  for (let url of urls) {
    try {
      url = url.replace('./', '');
      url = url.replace('.md', '');
      const res = await rp(`https://docs.apostrophecms.org/apostrophe/${url}`, {
        resolveWithFullResponse: true
      });
      if (res.request.href.match(/github/)) {
        console.error(`Pointing at github: ${url}`);
      }
    } catch (e) {
      console.error(`Broken: ${url}`);
    }
  }
}
