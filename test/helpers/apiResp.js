
export const apiResp = newResp => {
  const resp = { status: 200, errors: [], results: [] };
  return JSON.stringify({ ...resp, ...newResp });
};
