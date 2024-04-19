function normalizeURL(url) {
  const myUrl = new URL(url);
  const page = myUrl.host + myUrl.pathname;
  if (page.length > 0 && page.slice(-1) === "/") {
    return page.slice(0, -1);
  }
  return page;
}

module.exports = {
  normalizeURL,
};
