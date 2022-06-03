/**
 * @vitest-environment jsdom
 */

import { describe, it, expect } from "vitest";
import localStorage from "../src";

describe("localStorage", () => {
  it("should set and get a string", () => {
    localStorage.setItem("foo", "bar");
    expect(localStorage.getItem("foo")).to.equal("bar");
  });

  it("should set and get an object", () => {
    const o = { a: 1, b: "string", c: { x: 1, y: 2 } };
    localStorage.setItem("obj", o);
    expect(localStorage.getItem("obj")).to.eql(o.toString());
  });

  it("should remove an item", () => {
    localStorage.setItem("foo", "bar");
    localStorage.removeItem("foo");
    expect(localStorage.getItem("foo")).to.equal(null);
  });

  it("should clear the data", () => {
    localStorage.setItem("foo", "bar");
    localStorage.clear();
    expect(localStorage.getItem("foo")).to.equal(null);
    expect(localStorage.length).to.equal(0);
  });
});
