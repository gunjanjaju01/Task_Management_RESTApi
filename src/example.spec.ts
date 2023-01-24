// describe('Example test', () => {
//   it('equals true', () => {
//     expect(true).toEqual(true);
//     expect('Ariel').toEqual('Ariela');
//   });
// });

function addNumbers(num1, num2) {
  return num1 + num2;
}

describe('addNumbers', () => {
  it('add two numbers', () => {
    // expect(true).toEqual(true);
    expect(addNumbers(2, 2)).toEqual(4);
  });
});