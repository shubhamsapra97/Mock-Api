import React from "react";
import {render, cleanup, fireEvent, waitFor} from "@testing-library/react";
import {UserList} from "./UserList";

describe("User List", () => {
    afterEach(cleanup);

    it("should render UserList page correctly", async () => {
        const historyMock = jest.fn();
        const fetchMock = jest.fn().mockReturnValue({
            status: 200,
            json: () => ({
                data: [{
                    email: "demo@gmail.com",
                    first_name: "demo",
                    last_name: "demo",
                }, {
                    email: "demo2@gmail.com",
                    first_name: "demo2",
                    last_name: "demo2",
                }],
            }),
        });
        global.fetch = fetchMock;

        const props = {
            history: {
                replace: historyMock,
            },
        };

        const {getAllByTestId, getByTestId} = render(
            <UserList {...props} />,
        );

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalled();
            expect(getByTestId("search-input"));
            expect(getAllByTestId("user-rows").length).toBe(2);
        });
    });

    it("search text should update user table correctly", async () => {
        const historyMock = jest.fn();
        const fetchMock = jest.fn().mockReturnValue({
            status: 200,
            json: () => ({
                data: [{
                    email: "demo@gmail.com",
                    first_name: "demo",
                    last_name: "demo",
                }, {
                    email: "tom@gmail.com",
                    first_name: "tom",
                    last_name: "dustin",
                }],
            }),
        });
        global.fetch = fetchMock;

        const props = {
            history: {
                replace: historyMock,
            },
        };

        const {getAllByTestId, getByTestId} = render(
            <UserList {...props} />,
        );

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalled();
            expect(getByTestId("search-input"));
            expect(getAllByTestId("user-rows").length).toBe(2);
        });

        fireEvent.change(getByTestId("search-input"), {
            target: {
                value: "tom",
            },
        });

        await waitFor(() => {
            expect(getAllByTestId("user-rows").length).toBe(1);
        });
    });
});