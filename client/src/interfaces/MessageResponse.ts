/**
 * @message
 * The response/error message string.
 *
 * @provided_value
 * The value that was provided to the API that resulted in the error.
 */
export interface MessageResponse {
  message: string;
  summary?: string;
  provided_value?: unknown;
}

/**
 * @message
 * The response/error message string.
 *
 * @result
 * An object that contains the resource's updated values
 */
export interface MessageWithResultResponse {
  message: string;
  result: string | Record<string, unknown>;
}

/**
 * @message
 * The response/error message string.
 *
 * @result
 * A base64 string or Buffer
 */
export interface MessageWithFileResponse {
  message: string;
  file: string | Buffer;
}
