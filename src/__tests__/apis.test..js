import { checkClientLoginData } from "../apis/clientApi"
import { getPollInfo } from "../apis/pollApi";
import setAuthToken from "../utils/setAuthToken"
import { decodeToken } from "../utils/decodeToken"

// test for client login data
test('checkClientLoginData', async () => {
    const data = await checkClientLoginData({
        registrationNumber: "mauryagolu99",
        password: "10-10-10"
    });
    expect('string').toBe(typeof (data));
});

// test for getting poll details
test('getPoll details', async () => {
    const data = await getPollInfo("bqfbc3jnirp");
    // console.log(data);

    expect(typeof (data)).toBe('object');
        expect(data).toHaveProperty('success')
        .toHav;
});

// test for set Authorization token
test('setAuthToken', () => {
    expect(setAuthToken("ayush")).toBe(undefined);
});

// test for decode token
test('decode token test', async () => {
    const token = await checkClientLoginData({
        registrationNumber: "mauryagolu99",
        password: "10-10-10"
    })
    const data = decodeToken(token);
    expect(data).toHaveProperty('special_id', 'contactNumber', 'email', 'id', 'joiningYeat');
})

