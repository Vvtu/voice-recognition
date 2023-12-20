export const reshuffle = (dic: unknown[]) =>
  dic
    .map((item) => [Math.random(), item])

    // @ts-ignore
    .sort((a, b) => a[0] - b[0])
    .map((elem) => elem[1]);
