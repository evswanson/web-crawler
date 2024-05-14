// convert pages object into something that can be logged into a console
async function printReport(pages) {
  // 1. print that the report is starting
  console.log("Report is starting");
  // 2. sort the pages largest number -> DESC
  //console.log(pages);
  let pagesSorted = await sortPages(pages);
  // 3. print each page in a nice formatted way. Found ${count} internal links to ${url}
  for (let i = 0; i < pagesSorted.length; i++) {
    console.log(
      `Found ${pagesSorted[i][1]} internal links to ${pagesSorted[i][0]}`
    );
  }
}

async function sortPages(pages) {
  // turn pages into an array to sort
  let pagesArray = [];
  for (const page in pages) {
    pagesArray.push([page, pages[page].count]);
  }

  // use bubble sort
  for (let i = 0; i < pagesArray.length - 1; i++) {
    for (let j = i; j < pagesArray.length; j++) {
      if (pagesArray[i][1] > pagesArray[j][1]) {
        let moved = pagesArray[i];
        pagesArray[i] = pagesArray[j];
        pagesArray[j] = moved;
      }
    }
  }

  return pagesArray.reverse();
}

module.exports = {
  printReport,
};
