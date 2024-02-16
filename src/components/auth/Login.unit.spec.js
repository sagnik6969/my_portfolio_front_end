import { describe, expect, it, vi } from "vitest";
import Login from "./Login.vue";
import { render, screen, waitFor } from "@testing-library/vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import * as matchers from "@testing-library/jest-dom/matchers";
import userEvent from "@testing-library/user-event";
import { useToast } from "vue-toastification";
expect.extend(matchers);
vi.mock("vuex");
vi.mock("vue-router");
vi.mock("vue-toastification");

vi.mocked(useStore).mockReturnValue({});
vi.mocked(useRouter).mockReturnValue({});
vi.mocked(useRoute).mockReturnValue({
  query: {},
});

const setUp = async () => {
  const user = userEvent.setup();
  const { container } = render(Login, {
    global: {
      stubs: {
        "v-icon": true,
      },
    },
  });

  return {
    document: container,
    user,
  };
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

  it("has required constraint for email input", async () => {
    await setUp();
    expect(screen.getByLabelText("Email")).toBeRequired();
  });

  it("has Password input", async () => {
    await setUp();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("has password type Password input", async () => {
    await setUp();
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "type",
      "password"
    );
  });

  it("has required constraint for password input", async () => {
    await setUp();
    expect(screen.getByLabelText("Password")).toBeRequired();
  });

  it("has login button", async () => {
    await setUp();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  describe("when user clicks login button", () => {
    it("dispatches appropriate action on store", async () => {
      const mockDIspatch = vi.fn().mockReturnValue(new Promise(() => {}));
      vi.mocked(useStore).mockReturnValue({
        dispatch: mockDIspatch,
      });
      const { user } = await setUp();

      const email = screen.getByLabelText("Email");
      const password = screen.getByLabelText("Password");
      const loginButton = screen.getByRole("button", { name: "Login" });
      await user.type(email, "a@b.c");
      await user.type(password, "abcd");
      await user.click(loginButton);
      expect(mockDIspatch).toHaveBeenCalledOnce();
      expect(mockDIspatch).toHaveBeenCalledWith("login", {
        email: "a@b.c",
        password: "abcd",
      });
    });

    describe("when dispatch action is on progress", () => {
      it("displays spinner", async () => {
        const mockDIspatch = vi.fn().mockReturnValue(new Promise(() => {}));
        vi.mocked(useStore).mockReturnValue({
          dispatch: mockDIspatch,
        });
        const { user, document } = await setUp();

        const email = screen.getByLabelText("Email");
        const password = screen.getByLabelText("Password");
        const loginButton = screen.getByRole("button", { name: "Login" });
        await user.type(email, "a@b.c");
        await user.type(password, "abcd");
        await user.click(loginButton);
        expect(document.querySelector(".animate-spin")).toBeInTheDocument();
      });
    });

    describe("when request fails with error returned from backend", () => {
      it("hides the spinner", async () => {
        let rejectFn;
        const mockDIspatch = vi.fn().mockReturnValue(
          new Promise((_, reject) => {
            rejectFn = reject;
          })
        );
        vi.mocked(useStore).mockReturnValue({
          dispatch: mockDIspatch,
        });

        const mockToast = vi.fn();
        vi.mocked(useToast).mockReturnValue({
          error: mockToast,
        });
        const { user, document } = await setUp();

        const email = screen.getByLabelText("Email");
        const password = screen.getByLabelText("Password");
        const loginButton = screen.getByRole("button", { name: "Login" });
        await user.type(email, "a@b.c");
        await user.type(password, "abcd");
        await user.click(loginButton);
        const spinner = document.querySelector(".animate-spin");
        expect(spinner).toBeInTheDocument();
        rejectFn("error");
        await waitFor(() => expect(spinner).not.toBeInTheDocument());
      });

      it("displays toast with the message returned from backend", async () => {
        const mockDIspatch = vi.fn().mockRejectedValue("failure");
        vi.mocked(useStore).mockReturnValue({
          dispatch: mockDIspatch,
        });

        const mockToast = vi.fn();
        vi.mocked(useToast).mockReturnValue({
          error: mockToast,
        });

        const { user } = await setUp();

        const email = screen.getByLabelText("Email");
        const password = screen.getByLabelText("Password");
        const loginButton = screen.getByRole("button", { name: "Login" });
        await user.type(email, "a@b.c");
        await user.type(password, "abcd");
        await user.click(loginButton);

        await waitFor(() => {
          expect(mockToast).toHaveBeenCalledOnce();
          expect(mockToast).toHaveBeenCalledWith("failure");
        });
      });
    });

    // omitting validating error checks because vue-toastification gives unexpected results.
    // will add then in unit tests file.

    describe("when backend returns success", () => {
      it("hides the spinner", async () => {
        let resolveFn;
        const mockDIspatch = vi.fn().mockReturnValue(
          new Promise((resolve) => {
            resolveFn = resolve;
          })
        );
        vi.mocked(useStore).mockReturnValue({
          dispatch: mockDIspatch,
        });

        const mockToast = vi.fn();
        vi.mocked(useToast).mockReturnValue({
          error: mockToast,
        });
        const { user, document } = await setUp();

        const email = screen.getByLabelText("Email");
        const password = screen.getByLabelText("Password");
        const loginButton = screen.getByRole("button", { name: "Login" });
        await user.type(email, "a@b.c");
        await user.type(password, "abcd");
        await user.click(loginButton);
        const spinner = document.querySelector(".animate-spin");
        expect(spinner).toBeInTheDocument();
        resolveFn("success");
        await waitFor(() => expect(spinner).not.toBeInTheDocument());
      });

      it("displays success message returned from backend", async () => {
        const mockDIspatch = vi.fn().mockResolvedValue("success!!");
        vi.mocked(useStore).mockReturnValue({
          dispatch: mockDIspatch,
        });

        const mockToast = vi.fn();
        vi.mocked(useToast).mockReturnValue({
          success: mockToast,
        });

        vi.mocked(useRouter).mockReturnValue({
          replace() {},
        });

        const { user } = await setUp();

        const email = screen.getByLabelText("Email");
        const password = screen.getByLabelText("Password");
        const loginButton = screen.getByRole("button", { name: "Login" });
        await user.type(email, "a@b.c");
        await user.type(password, "abcd");
        await user.click(loginButton);

        await waitFor(() => {
          expect(mockToast).toHaveBeenCalledOnce();
          expect(mockToast).toHaveBeenCalledWith("success!!");
        });
      });

      describe("when redirect url is empty", () => {
        it("navigates to homepage", async () => {
          const mockDIspatch = vi.fn().mockResolvedValue("success!!");
          vi.mocked(useStore).mockReturnValue({
            dispatch: mockDIspatch,
          });

          const mockToast = vi.fn();
          vi.mocked(useToast).mockReturnValue({
            success: mockToast,
          });

          const mockRouterReplace = vi.fn();

          vi.mocked(useRouter).mockReturnValue({
            replace: mockRouterReplace,
          });

          const { user } = await setUp();

          const email = screen.getByLabelText("Email");
          const password = screen.getByLabelText("Password");
          const loginButton = screen.getByRole("button", { name: "Login" });
          await user.type(email, "a@b.c");
          await user.type(password, "abcd");
          await user.click(loginButton);

          await waitFor(() => {
            expect(mockRouterReplace).toHaveBeenCalledOnce();
            expect(mockRouterReplace).toHaveBeenCalledWith("/home");
          });
        });
      });
      describe("when redirect url is specified", () => {
        it("navigates to specified url", async () => {
          const mockDIspatch = vi.fn().mockResolvedValue("success!!");
          vi.mocked(useStore).mockReturnValue({
            dispatch: mockDIspatch,
          });

          const mockToast = vi.fn();
          vi.mocked(useToast).mockReturnValue({
            success: mockToast,
          });

          const mockRouterReplace = vi.fn();

          vi.mocked(useRouter).mockReturnValue({
            replace: mockRouterReplace,
          });

          vi.mocked(useRoute).mockReturnValue({
            query: {
              redirect: "/projects",
            },
          });

          const { user } = await setUp();

          const email = screen.getByLabelText("Email");
          const password = screen.getByLabelText("Password");
          const loginButton = screen.getByRole("button", { name: "Login" });
          await user.type(email, "a@b.c");
          await user.type(password, "abcd");
          await user.click(loginButton);

          await waitFor(() => {
            expect(mockRouterReplace).toHaveBeenCalledOnce();
            expect(mockRouterReplace).toHaveBeenCalledWith("/projects");
          });
        });
      });
    });
  });
});
