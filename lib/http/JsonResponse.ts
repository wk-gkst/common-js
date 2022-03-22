export class JsonResponse {
  ret: string;

  data: any;

  message?: string;

  constructor(ret: string | number, data: any, message?: string) {
    this.ret = ret + "";
    this.data = data;
    this.message = message;
  }

  public static Ok(data: any): JsonResponse {
    const response = new JsonResponse("0", data, undefined);
    delete response.message;
    return response;
  }

  public static Error(ret: string | number, message: string): JsonResponse {
    const response = new JsonResponse(ret, null, message);
    delete response.data;
    return response;
  }
}
