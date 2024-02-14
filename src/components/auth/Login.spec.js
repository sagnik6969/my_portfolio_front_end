import { render, screen, waitFor } from "@testing-library/vue";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import Login from "./Login.vue";

import { setupServer } from "msw/node";

import store from "@/store";
import router from "@/router";
import vuetify from "@/vuetify";

import * as matchers from "@testing-library/jest-dom/matchers";
import { http } from "msw";
import userEvent from "@testing-library/user-event";
expect.extend(matchers);

let requestBody;
Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
};

const server = setupServer(
  http.post("/api/login", async ({ request }) => {
    requestBody = await request.json();
    return Response.json({
      token: "asdf",
      expiration_time: new Date().addHours(1).toISOString(),
    });
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
beforeEach(() => {
  requestBody = undefined;
  server.resetHandlers();
});

const setUp = async () => {
  // router.push("/login");
  //await router.isReady();
  const document = render(Login, {
    global: {
      plugins: [store, router, vuetify],
    },
  });

  const user = userEvent.setup();

  return { document, user };
};

describe("LogIn", () => {
  it("has Email input", async () => {
    await setUp();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });
  it("has email type for Email input", async () => {
    await setUp();
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
  });

  it("has required constraint for email input", () => {
    setUp();
    expect(screen.getByLabelText("Email")).toBeRequired();
  });

  it("has Password input", () => {
    setUp();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("has password type Password input", () => {
    setUp();
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "type",
      "password"
    );
  });

  it("has required constraint for password input", () => {
    setUp();
    expect(screen.getByLabelText("Password")).toBeRequired();
  });

  it("has login button", () => {
    setUp();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  describe("when user clicks login button", () => {
    it("sends appropriate request to backend", async () => {
      const { user } = await setUp();

      const email = screen.getByLabelText("Email");
      const password = screen.getByLabelText("Password");
      const loginButton = screen.getByRole("button", { name: "Login" });
      await user.type(email, "a@b.c");
      await user.type(password, "abcd");
      await user.click(loginButton);

      await waitFor(() => {
        expect(requestBody).toEqual({
          email: "a@b.c",
          password: "abcd",
        });
      });
    });
  });
});
