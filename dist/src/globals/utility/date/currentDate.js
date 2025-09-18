"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentDate = void 0;
const currentDate = () => {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const options = {
        year: "numeric",
        month: "short", // short = Jan, Feb, etc.
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
};
exports.currentDate = currentDate;
