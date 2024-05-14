const { JSDOM } = require("jsdom");

function normalizeURL(url) {
  const myUrl = new URL(url);
  const page = myUrl.host + myUrl.pathname;
  if (page.length > 0 && page.slice(-1) === "/") {
    return page.slice(0, -1);
  }
  return page;
}

async function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const aElements = dom.window.document.querySelectorAll("a");

  for (const aElement of aElements) {
    if (aElement.href.slice(0, 1) === "/") {
      try {
        urls.push(new URL(aElement.href, baseURL).href);
      } catch (err) {
        console.log(`${err.message}: ${aElement.href}`);
      }
    } else {
      try {
        urls.push(new URL(aElement.href).href);
      } catch (err) {
        console.log(`${err.message}: ${aElement.href}`);
      }
    }
  }
  return urls;
}

// Recursive function
// currentURL will change while baseURL stays the same
async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  // 1. make sure currentURL is on the same domain as baseURL. IF not return pages
  if (!currentURL.includes(baseURL)) {
    return pages;
  }
  // 2. Get normalized version of currentURL
  let normalized = await normalizeURL(currentURL);
  // 3. If pages object already has an entry for the normalized version of the currentURL, increment the count and return pages
  if (normalized in pages) {
    pages[normalized].count++;
    return;
  } else {
    // 4. Otherwise add an etry to the pages object and set the count to 1
    pages[normalized] = { count: 1 };
  }
  // 5. Fetch the current URL and parse the html
  let htmlBody = await getHtmlBody(currentURL);
  // 6. Assuming all went well with the fetch, get all the URLs from the htmlBody
  let htmlURLs = await getURLsFromHTML(htmlBody, currentURL);
  // 7. Recursively crawl each URL found on the page and update the pages to keep an aggregate count.
  for (const url of htmlURLs) {
    pages = Object.assign({}, pages, await crawlPage(baseURL, url, pages));
  }
  // 8. Finally return the updated pages object
  return pages;
}

// fetch and parse the html of the currentURL
async function getHtmlBody(currentURL) {
  //console.log(`crawling ${currentURL}`);
  let response;
  try {
    response = await fetch(currentURL);
  } catch (err) {
    throw new Error(`Got Network error: ${err.message}`);
  }

  if (response.status > 399) {
    console.log(`Got HTTP error: ${response.status} ${response.statusText}`);
    return;
  }

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("text/html")) {
    console.log(`Got non-HTML response: ${contentType}`);
    return;
  }

  //console.log(await response.text());
  return response.text();
}
module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
