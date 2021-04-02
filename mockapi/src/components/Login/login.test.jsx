import React from "react";
import {render, cleanup, fireEvent, waitFor} from "@testing-library/react";
import {LoginPage} from "./Login";

describe("Login Page", () => {
    afterEach(cleanup);

    it("should render login page correctly", async () => {
        const historyMock = jest.fn();
        const props = {
            history: {
                replace: historyMock,
            },
        };

        const {getByText, getByTestId} = render(
            <LoginPage {...props} />,
        );

        await waitFor(() => {
            expect(getByTestId("email-input"));
            expect(getByTestId("password-input"));
            expect(getByTestId("submit-button"));
        });
    });

    it("should render error message if empty fields", async () => {
        const historyMock = jest.fn();
        const props = {
            history: {
                replace: historyMock,
            },
        };

        const {getByText, getByTestId} = render(
            <LoginPage {...props} />,
        );

        await waitFor(() => {
            expect(getByTestId("email-input"));
        });

        fireEvent.change(getByTestId("email-input"), {
            target: {
                value: "demo@gmail.com",
            },
        });
        fireEvent.submit(getByTestId("submit-button"));

        await waitFor(() => {
            expect(getByText("Form Fields should not be empty!"));
        });
    });

    it("Successfull login to users screen", async () => {
        const historyMock = jest.fn();
        const fetchMock = jest.fn();
        global.fetch = fetchMock;
        const props = {
            history: {
                replace: historyMock,
            },
        };

        const {getByTestId} = render(
            <LoginPage {...props} />,
        );

        await waitFor(() => {
            expect(getByTestId("email-input"));
        });

        fireEvent.change(getByTestId("email-input"), {
            target: {
                value: "demo@gmail.com",
            },
        });
        fireEvent.change(getByTestId("password-input"), {
            target: {
                value: "demoPassword",
            },
        });
        fireEvent.submit(getByTestId("submit-button"));

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalled();
            expect(historyMock).toHaveBeenCalled();
        });
    });

    it("Unsuccessfull login", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({status: 404, error: "user not found"}),
            })
        );
        const historyMock = jest.fn();
        const props = {
            history: {
                replace: historyMock,
            },
        };

        const {getByText, getByTestId} = render(
            <LoginPage {...props} />,
        );

        await waitFor(() => {
            expect(getByTestId("email-input"));
        });

        fireEvent.change(getByTestId("email-input"), {
            target: {
                value: "demo@gmail.com",
            },
        });
        fireEvent.change(getByTestId("password-input"), {
            target: {
                value: "demoPassword",
            },
        });
        fireEvent.submit(getByTestId("submit-button"));

        await waitFor(() => {
            expect(getByText("user not found"));
            expect(historyMock).not.toHaveBeenCalled();
        });
    });
});