import { render, screen, waitFor } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import Header from "./Header.vue";
import * as matchers from "@testing-library/jest-dom/matchers";

import store from "@/store";
import router from "@/router";
import vuetify from "@/vuetify";

const setUp = () => {
  render(Header, {
    global: {
      plugins: [store, router, vuetify],
    },
  });
  return {};
};

const login = () => {
  Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() + h);
    return this;
  };

  store.state.token = "token";
  store.state.expirationTime = new Date().addHours(1).toISOString();
};

expect.extend(matchers);

describe("Header", () => {
  it("displays Sagnik Jana", () => {
    setUp();
    expect(screen.getByText("Sagnik Jana")).toBeInTheDocument();
  });

  describe("Nav Links", () => {
    describe.each([
      { name: "Home", link: "/home" },
      { name: "Projects", link: "/projects" },
      { name: "Connect", link: "/connect" },
    ])("when name = $name , link = $link", ({ name, link }) => {
      it(`should contain ${name} link with href = ${link}`, () => {
        setUp();
        const navLink = screen.getByRole("link", { name: name });
        expect(navLink).toHaveAttribute("href", link);
      });
    });
  });

  describe("when user is not logged in", () => {
    it("displays admin login link with href = '/login'", () => {
      setUp();
      const navLink = screen.getByRole("link", { name: "Admin" });
      expect(navLink).toHaveAttribute("href", "/login");
    });

    describe("when user is logged in", () => {
      it("removes the admin login link", async () => {
        setUp();
        const navLink = screen.getByRole("link", { name: "Admin" });
        login();
        await waitFor(() => {
          expect(navLink).not.toBeInTheDocument();
        });
      });

      it("displays admin logout button", async () => {
        setUp();
        login();
        const button = await screen.findByRole("button", { name: "Logout" });
        expect(button).toBeInTheDocument();
      });
    });
  });
});
