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

    it("should render edit page on update btn click", async () => {
        const historyMock = jest.fn();
        const historyPushMock = jest.fn();
        const fetchMock = jest.fn().mockReturnValue({
            status: 200,
            json: () => ({
                data: [{
                    id: 1,
                    email: "demo@gmail.com",
                    first_name: "demo",
                    last_name: "demo",
                }, {
                    id: 2,
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
                push: historyPushMock,
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

        fireEvent.click(getByTestId("edit-btn-1"));

        await waitFor(() => {
            expect(historyPushMock).toHaveBeenCalled();
        });
    });

    it("should delete user if deletion confirmed", async () => {
        const historyMock = jest.fn();
        const historyPushMock = jest.fn();
        global.confirm = () => true;

        const fetchMock = jest.fn().mockReturnValue({
            status: 200,
            json: () => ({
                data: [{
                    id: 1,
                    email: "demo@gmail.com",
                    first_name: "demo",
                    last_name: "demo",
                }, {
                    id: 2,
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
                push: historyPushMock,
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

        fireEvent.click(getByTestId("delete-btn-1"));

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledTimes(2);
        });
    });

    it("should not delete user if deletion declined", async () => {
        const historyMock = jest.fn();
        const historyPushMock = jest.fn();
        global.confirm = () => false;

        const fetchMock = jest.fn().mockReturnValue({
            status: 200,
            json: () => ({
                data: [{
                    id: 1,
                    email: "demo@gmail.com",
                    first_name: "demo",
                    last_name: "demo",
                }, {
                    id: 2,
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
                push: historyPushMock,
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

        fireEvent.click(getByTestId("delete-btn-1"));

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledTimes(1);
        });
    });
});