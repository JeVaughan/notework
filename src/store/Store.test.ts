import { Store, Action, Dispatch } from "./Store";

it('initialises Stores in a functional state', () => {
  expect(new Store(null).contents()).toEqual(null);
  expect(new Store("").contents()).toEqual("");
  expect(new Store(1).contents()).toEqual(1);
  expect(new Store({ a: 3 }).contents()).toEqual({ a: 3 });
});

it('initialises Stores with no pending actions', () => {
  expect(new Store("").hasPendingActions()).toBeFalsy();
});

function mul(multiplier: number): Action<number> {
  return function(state) {
    return state * multiplier;
  }
}

it('updates the contents after dispatching a single action', () => {
  expect(
    new Store(1)
      .dispatch(mul(3))
      .contents()
  ).toEqual(3);
});


it('subsequent actions should act on mutated state', () => {
  expect(
    new Store(1)
      .dispatch(mul(3))
      .dispatch(mul(3))
      .contents()
  ).toEqual(9);
});

// Jev, all these tests are for actions types which accept a dispatch parameter.

// function facMul(i: number): Action<number> {
//   return function(state, dispatch) {
//     if (i > 0) {
//       dispatch(facMul(i - 1));
//       return state * i;
//     }
//   }
// }

// function echo(i: number): Action<string> {
//   return function(store: string, dispatch: Dispatch<string>) {
//     if (i < 10) 
//       dispatch(echo(i+1))

//     return store + String(i);
//   }
// }

// it('queues subactions to be evaluated in order afterwards', () => {
//   expect(
//     new Store("")
//       .dispatch(echo(0))
//       .contents()
//   ).toEqual("0123456789");
// });

// it('queues subactions act on mutated state', () => {
//   expect(
//     new Store("")
//       .dispatch(echo(0))
//       .dispatch(echo(5))
//       .contents()
//   ).toEqual("012345678956789");
// });

// it('actions returning undefined do not update state', () => {
//   expect(new Store(42).dispatch(facMul(0)).contents()).toEqual(42);
// });

// it('subactions can be parallelised', () => {
//   expect(
//     new Store(1)
//       .dispatch(facMul(4), facMul(3), facMul(2))
//       .contents()
//   ).toEqual(288);
// });
