import { afterAll, afterEach, beforeAll, expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { server } from "./mocks/mockserver";


expect.extend(matchers)

beforeAll(() => server.listen());

afterEach(() => {
    cleanup()
    sessionStorage.clear();
    server.resetHandlers();

})

afterAll(() => server.close());
