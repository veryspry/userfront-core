import axios from "axios";
import Cookies from "js-cookie";
import {
  createAccessToken,
  createIdToken,
  createRefreshToken,
  resetStore,
} from "./config/utils.js";
import Userfront from "../src/index.js";

import { refresh } from "../src/refresh.js";
import { setCookiesAndTokens } from "../src/cookies.js";

jest.mock("axios");

const tenantId = "abcd4321";
const customBaseUrl = "https://custom.example.com/api/v1/";
const mockAccessToken = createAccessToken();
const mockIdToken = createIdToken();
const mockRefreshToken = createRefreshToken();

/**
 * This file tests the basic refresh method, which uses a normal cookie to
 * perform token refreshes.
 *
 * The basic refresh method is used automatically in test mode and in live
 * mode whenever an SSL certificate has not been set up.
 */

describe("refresh with basic method", () => {
  beforeEach(() => {
    // Set mock cookies
    Cookies.set(`id.${tenantId}`, mockIdToken, {});
    Cookies.set(`access.${tenantId}`, mockAccessToken, {});
    Cookies.set(`refresh.${tenantId}`, mockRefreshToken, {});

    // Initialize the library
    Userfront.init(tenantId);
  });

  afterEach(() => {
    resetStore(Userfront);
    jest.resetAllMocks();
  });

  it("should send a refresh request and set cookies with response", async () => {
    const initialUser = JSON.parse(JSON.stringify(Userfront.user));

    // Mock with updated name and with authorization level removed
    const newIat = new Date().getTime();
    const newName = "John Doe Updated";
    const newAccessToken = createAccessToken({
      authorization: {},
      iat: newIat,
    });
    const newIdToken = createIdToken({
      name: newName,
      iat: newIat,
    });
    axios.get.mockResolvedValue({
      status: 200,
      data: {
        tokens: {
          access: {
            value: newAccessToken,
            secure: true,
            sameSite: "Lax",
            expires: 30,
          },
          id: {
            value: newIdToken,
            secure: true,
            sameSite: "Lax",
            expires: 30,
          },
        },
      },
    });

    // Call refresh()
    await refresh();

    expect(axios.get).toHaveBeenCalledWith(
      "https://api.userfront.com/v0/auth/refresh",
      {
        headers: {
          authorization: `Bearer ${mockRefreshToken}`,
        },
      }
    );

    // Expect the new access and ID token values to have been set
    expect(Cookies.get(`access.${tenantId}`)).toEqual(newAccessToken);
    expect(Cookies.get(`id.${tenantId}`)).toEqual(newIdToken);

    // Expect the user object to be updated
    expect(Userfront.user.name).toEqual(newName);

    // Expect existing properties to be unchanged
    expect(Userfront.user.image).toEqual(initialUser.image);
    expect(Userfront.user.data).toEqual(initialUser.data);
  });

  it("should handle a non-200 response by logging an error", async () => {
    // Mock console.warn
    console.warn = jest.fn();

    axios.get.mockResolvedValue({
      status: 401,
      data: {
        statusCode: 401,
        error: "Unauthorized",
        message: "Invalid token",
        attributes: {
          error: "Invalid token",
        },
      },
    });

    // Call refresh()
    await refresh();

    jest.mock("../src/cookies.js");

    expect(axios.get).toHaveBeenCalledWith(
      "https://api.userfront.com/v0/auth/refresh",
      {
        headers: {
          authorization: `Bearer ${mockRefreshToken}`,
        },
      }
    );

    // Assert that the tokens and cookies are properly set
    expect(setCookiesAndTokens).not.toHaveBeenCalled;

    // Assert that the console warning was logged
    expect(console.warn).toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalledWith(`Refresh failed: Invalid token`);
  });

  it("should send a refresh request using custom baseUrl", async () => {
    Userfront.init(tenantId, {
      baseUrl: customBaseUrl,
    });

    const initialUser = JSON.parse(JSON.stringify(Userfront.user));

    // Mock with updated name and with authorization level removed
    const newIat = new Date().getTime();
    const newName = "John Doe Updated";
    const newAccessToken = createAccessToken({
      authorization: {},
      iat: newIat,
    });
    const newIdToken = createIdToken({
      name: newName,
      iat: newIat,
    });
    axios.get.mockResolvedValue({
      status: 200,
      data: {
        tokens: {
          access: {
            value: newAccessToken,
            secure: true,
            sameSite: "Lax",
            expires: 30,
          },
          id: {
            value: newIdToken,
            secure: true,
            sameSite: "Lax",
            expires: 30,
          },
        },
      },
    });

    // Call refresh()
    await refresh();
    expect(axios.get).toHaveBeenCalledWith(`${customBaseUrl}auth/refresh`, {
      headers: {
        authorization: `Bearer ${mockRefreshToken}`,
      },
    });

    // Expect the new access and ID token values to have been set
    expect(Cookies.get(`access.${tenantId}`)).toEqual(newAccessToken);
    expect(Cookies.get(`id.${tenantId}`)).toEqual(newIdToken);

    // Expect the user object to be updated
    expect(Userfront.user.name).toEqual(newName);

    // Expect existing properties to be unchanged
    expect(Userfront.user.image).toEqual(initialUser.image);
    expect(Userfront.user.data).toEqual(initialUser.data);
  });

  it("Userfront.refresh() should log a deprecation message", async () => {
    expect(Userfront.refresh).not.toEqual(refresh);

    axios.get.mockResolvedValue({});

    global.console = { warn: jest.fn() };
    await Userfront.refresh();

    expect(console.warn).toHaveBeenCalledWith(
      "Userfront.refresh() is deprecated and will be removed. Please use Userfront.tokens.refresh() instead."
    );
    expect(axios.get).toHaveBeenCalledWith(
      "https://api.userfront.com/v0/auth/refresh",
      {
        headers: {
          authorization: `Bearer ${mockRefreshToken}`,
        },
      }
    );
  });
});
