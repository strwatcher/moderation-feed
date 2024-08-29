import { useState } from "react";
import type { RequestParams } from "./lib";

type UseResourceParams<Req, Res> = {
	request: (params?: RequestParams<Req>) => Promise<Res>;
	initial: Res;
	params?: RequestParams<Req>;
	deps?: any[];
	onSuccess?: () => void;
	onFailure?: () => void;
	onFinally?: () => void;
};

export const useResource = <Req, Res>({
	request,
	initial,
	onSuccess,
	onFailure,
	onFinally,
}: UseResourceParams<Req, Res>) => {
	const [data, setData] = useState(initial);
	const [error, setError] = useState<Error | null>(null);
	const [loading, setLoading] = useState(false);

	const triggerRequest = (params?: RequestParams<Req>) => {
		setLoading(true);
		setError(null);
		request(params)
			.then((data) => {
				setData(data);
				onSuccess?.();
			})
			.catch((error) => {
				setError(error);
				onFailure?.();
			})
			.finally(() => {
				setLoading(false);
				onFinally?.();
			});
	};

	return {
		data,
		loading,
		error,
		triggerRequest,
	};
};
