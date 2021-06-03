import utils from "./config/utils.js";
import Userfront from "../src/index.js";

import Iframe, { getIframe } from "../src/iframe.js";
import Refresh, { refresh } from "../src/refresh.js";

const tenantId = "abcdefg";

/**
 * TODO
 * Get a test working whereby the iframe's response is received
 * by the parent window and used to set the access and ID tokens.
 */

describe("refresh method", () => {
  afterEach(() => {
    utils.resetStore(Userfront);
  });

  it("should send correct options into iframe", async () => {
    // Initialize the library
    Userfront.init(tenantId);

    // Mock the iframe response to input
    const iframe = getIframe();
    let resolver;
    const promise = new Promise((resolve) => {
      resolver = resolve;
    });
    iframe.contentWindow.addEventListener("message", async (e) => {
      resolver(e.data);
    });

    // Call refresh()
    await refresh();

    // Should have sent correct info into the iframe
    await expect(promise).resolves.toEqual({ type: "refresh" });
  });

  it("should set tokens correctly based on iframe response", async () => {
    // Initialize the library
    Userfront.init(tenantId);

    // Mock fire an iframe refresh response
    const event = {
      data: {
        type: "refresh",
        status: 200,
        body: {},
      },
      origin: "https://auth.userfront.net",
    };
    Iframe.triageEvent = Iframe.__get__("triageEvent");
    Iframe.triageEvent(event);

    // Assert that the tokens and cookies are properly set
    expect(setCookie).toHaveBeenCalledWith();
  });
});
