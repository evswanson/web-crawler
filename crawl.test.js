const { test, expect } = require("@jest/globals");
const { normalizeURL, getURLsFromHTML } = require("./crawl.js");

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

// getURLsFromHTML tests
test("getURLsFromHTML absolute", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = ["https://blog.boot.dev/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = ["https://blog.boot.dev/path/one"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = [
    "https://blog.boot.dev/path/one",
    "https://other.com/path/one",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML handle error", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
