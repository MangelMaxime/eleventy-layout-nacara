import { expect, test } from 'vitest'
import addBaseUrlIfNoProtocol from "../../src/filters/addBaseUrlIfNoProtocol.js";

test("returns the URL without modification if it has a protocoal", async () => {
    expect(addBaseUrlIfNoProtocol("http://example.com/sub-path/file1.txt")).toBe("http://example.com/sub-path/file1.txt");
    expect(addBaseUrlIfNoProtocol("https://example.com/sub-path/file1.txt")).toBe("https://example.com/sub-path/file1.txt");
    expect(addBaseUrlIfNoProtocol("ftp://example.com/sub-path/file1.txt")).toBe("ftp://example.com/sub-path/file1.txt");
    expect(addBaseUrlIfNoProtocol("file://example.com/sub-path/file1.txt")).toBe("file://example.com/sub-path/file1.txt");
});

test("returns the URL with the base URL prepended if it does not have a protocol", async () => {
    expect(addBaseUrlIfNoProtocol.call({ ctx: { baseUrl: "http://example.com/sub-path/" } }, "file1.txt")).toBe("http://example.com/sub-path/file1.txt");
    expect(addBaseUrlIfNoProtocol.call({ ctx: { baseUrl: "http://sub-domain.example.com/sub-path/" } }, "file1.txt")).toBe("http://sub-domain.example.com/sub-path/file1.txt");
    expect(addBaseUrlIfNoProtocol.call({ ctx: { baseUrl: "/sub-domain/" } }, "file1.txt")).toBe("/sub-domain/file1.txt");
});

test("URL are normalized by removing double slashes", async () => {
    expect(addBaseUrlIfNoProtocol.call({ ctx: { baseUrl: "/sub-path/" } }, "/path-1/file1.txt")).toBe("/sub-path/path-1/file1.txt");
});
