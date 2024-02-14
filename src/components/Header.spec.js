import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import Header from "./Header.vue";
import * as matchers from "@testing-library/jest-dom/matchers";

import store from "@/store";
import router from "@/router";
import vuetify from "@/vuetify";

expect.extend(matchers);
describe("Header", () => {
  it("displays Sagnik Jana", () => {
    render(Header, {
      global: {
        plugins: [store, router, vuetify],
      },
    });
    expect(screen.getByText("Sagnik Jana")).toBeInTheDocument();
  });
});
