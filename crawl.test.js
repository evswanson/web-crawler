const { test, expect } = require("@jest/globals");
const { normalizeURL } = require("./crawl.js");

// normalizeURL tests
test("Normalize URL to just return page", () => {
  const testUrl = "https://blog.boot.dev/path/";
  const answerUrl = "blog.boot.dev/path";
  expect(normalizeURL(testUrl)).toBe(answerUrl);
});
test("Normalize URL to just return page", () => {
  const testUrl = "https://blog.boot.dev/path";
  const answerUrl = "blog.boot.dev/path";
  expect(normalizeURL(testUrl)).toBe(answerUrl);
});
test("Normalize URL to just return page", () => {
  const testUrl = "http://blog.boot.dev/path/";
  const answerUrl = "blog.boot.dev/path";
  expect(normalizeURL(testUrl)).toBe(answerUrl);
});
