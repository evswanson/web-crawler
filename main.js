const { crawlPage } = require("./crawl.js");
const { printReport } = require("./report.js");
async function main() {
  // CLI arguments start at the 2nd element
  let args = process.argv.slice(2);
  // if number of CLI arguments is less than 1, print an error and exit.
  if (args.length < 1) {
    console.error("Process cancelled. Need to include a url after 'start'.");
    console.log("---------------------------------------------");
    return;
  }
  if (args.length > 1) {
    // if number of CLI arguments is more than 1, print an error and exit.
    console.error(
      "Process cancelled. You can ONLY include ONE url after 'start'."
    );
    console.log("---------------------------------------------");
    return;
  }
  // if we have exactly one CLI argument, it's the "baseURL"
  let baseURL = args[0];
  console.log("---------------------------------------------");
  console.log("Process Started. Parsing URL:", baseURL);
  console.log("---------------------------------------------");
  // crawlPage(baseURL, currentURL=baseURL, pages={}) - Recursive function
  let pages = await crawlPage(baseURL);
  await printReport(pages);
  console.log("----------------Parsing End---------------");
}

main();
