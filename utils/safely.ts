export type Safely<Result> =
  | { ok: true; result: Result }
  | { ok: false; message: string };

export const safely = async <Result = unknown>(
  callback: () => Promise<Result>,
  message: string
): Promise<Safely<Result>> => {
  try {
    return { ok: true, result: await callback() };
  } catch {
    return { ok: false, message };
  }
};
