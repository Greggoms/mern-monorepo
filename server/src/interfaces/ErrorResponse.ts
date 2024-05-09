/**
 * @message
 * The error's message string.
 *
 * @stack
 * Stack trace information. This is disabled in production environments.
 *
 * @zod_errors
 * These errors occur when a property fails to validate during a
 * route's validateRequest() middleware.
 */
export default interface ErrorResponse {
  message: string;
  stack?: string;
  zod_errors?: { path: string; message: string }[];
}
