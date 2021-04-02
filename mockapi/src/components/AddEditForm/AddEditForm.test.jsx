import React from "react";
import {render, cleanup, fireEvent, waitFor} from "@testing-library/react";
import {AddEditForm} from "./AddEditForm";

describe("Add Edit Form", () => {
    afterEach(cleanup);

    it("should render add form correctly", async () => {
        const historyMock = jest.fn();
        const props = {
            history: {
                replace: historyMock,
            },
            match: {
                params: {
                    action: "add",
                }
            }
        };

        const {getByTestId} = render(
            <AddEditForm {...props} />,
        );

        await waitFor(() => {
            expect(getByTestId("email-input"));
            expect(getByTestId("firstname-input"));
            expect(getByTestId("lastname-input"));
            expect(getByTestId("submit-button"));
        });
    });

    it("should fetch user data in edit form", async () => {
        const historyMock = jest.fn();
        const fetchMock = jest.fn();
        global.fetch = fetchMock;

        const props = {
            history: {
                replace: historyMock,
            },
            match: {
                params: {
                    action: "edit",
                    id: 1,
                }
            }
        };

        const {getByTestId} = render(
            <AddEditForm {...props} />,
        );

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalled();
            expect(getByTestId("email-input"));
            expect(getByTestId("firstname-input"));
            expect(getByTestId("lastname-input"));
            expect(getByTestId("submit-button"));
        });
    });

    it("should render error message if empty fields", async () => {
        const historyMock = jest.fn();
        const props = {
            history: {
                replace: historyMock,
            },
            match: {
                params: {
                    action: "add",
                }
            }
        };

        const {getByText, getByTestId} = render(
            <AddEditForm {...props} />,
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

    it("Successfully creates new users", async () => {
        const fetchMock = jest.fn().mockReturnValue({
            status: 200,
            json: () => ({
                data: {
                    email: "demo@gmail.com",
                },
            }),
        });
        global.fetch = fetchMock;
        
        const historyMock = jest.fn();
        const props = {
            history: {
                replace: historyMock,
            },
            match: {
                params: {
                    action: "add",
                }
            }
        };

        const {getByText, getByTestId} = render(
            <AddEditForm {...props} />,
        );

        await waitFor(() => {
            expect(getByTestId("email-input"));
        });

        fireEvent.change(getByTestId("email-input"), {
            target: {
                value: "demo@gmail.com",
            },
        });
        fireEvent.change(getByTestId("firstname-input"), {
            target: {
                value: "firstname",
            },
        });
        fireEvent.change(getByTestId("lastname-input"), {
            target: {
                value: "lastname",
            },
        });
        fireEvent.submit(getByTestId("submit-button"));

        await waitFor(() => {
            expect(getByText("User created successfully"));
        });
    });

    it("Unsuccessfull new user createion", async () => {
        const fetchMock = jest.fn().mockReturnValue({
            status: 400,
            json: () => ({
                error: "error creating new user",
            }),
        });
        global.fetch = fetchMock;
        
        const historyMock = jest.fn();
        const props = {
            history: {
                replace: historyMock,
            },
            match: {
                params: {
                    action: "add",
                }
            }
        };

        const {getByText, getByTestId} = render(
            <AddEditForm {...props} />,
        );

        await waitFor(() => {
            expect(getByTestId("email-input"));
        });

        fireEvent.change(getByTestId("email-input"), {
            target: {
                value: "demo@gmail.com",
            },
        });
        fireEvent.change(getByTestId("firstname-input"), {
            target: {
                value: "firstname",
            },
        });
        fireEvent.change(getByTestId("lastname-input"), {
            target: {
                value: "lastname",
            },
        });
        fireEvent.submit(getByTestId("submit-button"));

        await waitFor(() => {
            expect(getByText("error creating new user"));
        });
    });

    it("Successfully updates new users", async () => {
        const fetchMock = jest.fn().mockReturnValue({
            status: 200,
            json: () => ({
                data: {
                    email: "demo@gmail.com",
                    first_name: "demo",
                    last_name: "demo",
                },
            }),
        });
        global.fetch = fetchMock;
        
        const historyMock = jest.fn();
        const props = {
            history: {
                replace: historyMock,
            },
            match: {
                params: {
                    action: "edit",
                    id: 1,
                }
            }
        };

        const {getByText, getByTestId} = render(
            <AddEditForm {...props} />,
        );

        await waitFor(() => {
            expect(getByTestId("email-input"));
        });

        fireEvent.change(getByTestId("email-input"), {
            target: {
                value: "demoUpdated@gmail.com",
            },
        });
        fireEvent.submit(getByTestId("submit-button"));

        await waitFor(() => {
            expect(getByText("User updated successfully"));
        });
    });
});