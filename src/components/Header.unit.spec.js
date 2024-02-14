import { render, screen, waitFor } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import Header from "./Header.vue";
import * as matchers from "@testing-library/jest-dom/matchers";
vi.mock("vuex");
import vuetify from "@/vuetify";
import { reactive } from "vue";

const MockRouterLink = {
  template: '<a :href="to"><slot></slot></a>',
  props: ["to"],
};

const store = reactive({
  getters: {
    isLoggedIn: false,
  },
});

const setUp = () => {
  render(Header, {
    global: {
      plugins: [vuetify],
      mocks: {
        $store: store,
      },
      stubs: {
        "router-link": MockRouterLink,
      },
    },
  });
  return {};
};

const login = () => {
  store.getters.isLoggedIn = true;
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
        await waitFor(() => expect(navLink).not.toBeInTheDocument());
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
