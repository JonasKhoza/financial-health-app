"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
class Profile {
    constructor(s, fn, ln, un) {
        (this.salutation = s),
            (this.firstName = fn),
            (this.lastName = ln),
            (this.username = un);
    }
    //Setters
    setSalutation(s) {
        this.salutation = s;
    }
    setFirstName(fn) {
        this.firstName = fn;
    }
    setLastName(ln) {
        this.lastName = ln;
    }
    setUsername(un) {
        this.username = un;
    }
    //Getters
    getSalutation() {
        return this.salutation;
    }
    getFistName() {
        return this.firstName;
    }
    getLastName() {
        return this.lastName;
    }
    getUsername() {
        return this.username;
    }
}
exports.Profile = Profile;
