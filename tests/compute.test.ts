import { compute } from "../src/compute";
import { Game } from "../src/types";

it("should return 300 on a perfect game", () => {
  const input300: Game = [
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 10, 10]
  ];

  const score = compute(input300);

  expect(score).toBe(300);
});

it("should return 0 on a blind player", () => {
  const input0: Game = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0, 0]
  ];

  const score = compute(input0);

  expect(score).toBe(0);
});

it("should return 258 on a mixed game", () => {
  const input258: Game = [
    [10, 0],
    [3, 1],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 10, 10]
  ];

  const score = compute(input258);

  expect(score).toBe(258);
});

it("should return 158 on this weird spare game", () => {
  const input158: Game = [
    [9, 1],
    [1, 9],
    [9, 1],
    [1, 9],
    [9, 1],
    [1, 9],
    [9, 1],
    [1, 9],
    [9, 1],
    [9, 1, 9]
  ];

  const score = compute(input158);

  expect(score).toBe(158);
});
