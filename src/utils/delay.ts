export async function delay(duration: number) {
  return new Promise((resolve) => {
    return setTimeout(() => resolve(true), duration);
  });
}
