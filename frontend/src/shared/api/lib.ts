import type { Contract } from "@withease/contracts";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export class ValidationError extends Error {
  constructor(errors: string[]) {
    super(errors.join(",\n"));
  }
}
//
// NOTE: In case of task, we need only these methods
export type RequestMethod = "GET" | "POST";

type MakeRequestParams<Req, Res> = {
  url: string;
  method: RequestMethod;
  body?: Req;
  contract: Contract<unknown, Res>;
};

// WARN: There is a need to catch possible errors (using toasts, as example)
const makeRequest = async <Req, Res>(
  params: MakeRequestParams<Req, Res>,
): Promise<Res> => {
  const { url, method, body, contract } = params;
  const response = await fetch(url, {
    body: JSON.stringify(body),
    method,
    headers: { "content-type": "application/json" },
  });

  if (response.ok) {
    const result = await response.json();
    if (contract.isData(result)) {
      return result;
    }

    throw new ValidationError(contract.getErrorMessages(result));
  }

  const error = await response.text();

  throw new ApiError(error, response.status);
};

export type CreateRequestParams<Req, Res> = Omit<
  MakeRequestParams<Req, Res>,
  "body"
>;
export type RequestParams<Req> = { body?: Req };

export const createRequest =
  <Req, Res = unknown>(params: CreateRequestParams<Req, Res>) =>
  (requestParams: RequestParams<Req> = {}) => {
    return makeRequest({ ...params, ...requestParams });
  };
