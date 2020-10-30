const assert = require('assert');
require("module-alias/register");
require("env-smart").load();
const {createUser, updateUserById, findUserById, removeUserById} = require('@/app/user/repository');

describe('DB test', () => {
    it('can connect to db', async () => {
        await require("@/database").connect();
    });
    describe('User', () => {
        const userId = "testId1234";
        const userName = "test";
        const userMail = "test@test.com";
        it('can create user', async () => {
            const user = await createUser({
                _id: userId,
                name: userName,
                email: userMail,
            });
            assert(user);
            assert.strictEqual(user._id, userId);
            assert.strictEqual(user.name, userName);
            assert.strictEqual(user.email, userMail);
        });
        it('can find user', async () => {
            const user = await findUserById(userId);
            assert(user);
            assert.strictEqual(user._id, userId);
            assert.strictEqual(user.name, userName);
            assert.strictEqual(user.email, userMail);
        });
        it('can update user', async () => {
            await updateUserById(userId, {name: "test2"});
            let user = await findUserById(userId);
            assert(user);
            assert.strictEqual(user.name, "test2");
            await updateUserById(userId, {name: userName});
            user = await findUserById(userId);
            assert(user);
            assert.strictEqual(user.name, userName);
        });
        it('can remove user', async () => {
            await removeUserById(userId);
            const user = await findUserById(userId);
            assert(!user);
        });
    });
})