export function getNewSearchParams(searchParams: URLSearchParams) {
  const newParams = Object.create(null);
  for (const param of searchParams.entries()) {
    newParams[param[0]] = param[1];
  }

  return newParams;
}
