import { handleSubmitTestServer,handleSubmitTestApi } from '../formHandlerTest'


test('Check if the function to test the Server exist', () => {
    expect(handleSubmitTestServer).toBeInstanceOf(Function);
})

test('Check if the function to test the Aylien API exist', () => {
    expect(handleSubmitTestApi).toBeInstanceOf(Function);
})