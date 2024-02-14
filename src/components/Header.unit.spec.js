import { render, screen, waitFor } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import Header from "./Header.vue";
import * as matchers from "@testing-library/jest-dom/matchers";
import { reactive } from "vue";
import userEvent from "@testing-library/user-event";
import { useStore } from "vuex";
vi.mock("vuex");

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
  return render(Header, {
    global: {
      // plugins: [vuetify],
      mocks: {
        $store: store,
      },
      stubs: {
        "router-link": MockRouterLink,
        "v-icon": true,
      },
    },
  });
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
        store.getters.isLoggedIn = true;
        await waitFor(() => expect(navLink).not.toBeInTheDocument());
      });

      it("displays logout button", async () => {
        setUp();
        store.getters.isLoggedIn = true;
        const button = await screen.findByRole("button", { name: "Logout" });
        expect(button).toBeInTheDocument();
      });

      describe("when user clicks logout button", () => {
        it("dispatches logout action on store", async () => {
          // let useStoreInput;
          // vi.mocked(useStore).mockReturnValue({
          //   dispatch(input) {
          //     useStoreInput = input;
          //     return new Promise((resolve) => {
          //       resolve();
          //     });
          //   },
          // });
          const mockFn = vi.fn().mockResolvedValue("success message");
          vi.mocked(useStore).mockReturnValue({
            dispatch: mockFn,
          });
          setUp();
          store.getters.isLoggedIn = true;
          const button = await screen.findByRole("button", { name: "Logout" });
          const user = userEvent.setup();
          await user.click(button);
          // expect(useStoreInput).toBe("logout");
          expect(mockFn).toHaveBeenCalledOnce();
          expect(mockFn).toHaveBeenCalledWith("logout");
        });

        describe("when logout action on progress", () => {
          it("displays spinner", async () => {
            let resolveFunction;
            const mockFn = vi.fn().mockImplementation(() => {
              return new Promise((resolve) => {
                resolveFunction = resolve;
              });
            });

            vi.mocked(useStore).mockReturnValue({
              dispatch: mockFn,
            });
            const { container } = setUp();
            store.getters.isLoggedIn = true;
            const button = await screen.findByRole("button", {
              name: "Logout",
            });
            const user = userEvent.setup();
            await user.click(button);
            expect(
              container.querySelector(".animate-spin")
            ).toBeInTheDocument();
            resolveFunction("success message");
          });
        });
      });
    });
  });
});
