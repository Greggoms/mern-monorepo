import { AnyZodObject, ZodEffects } from "zod";

/**
 * The body validation's "ZodEffects<AnyZodObject>" was added to support
 * the use of the .superRefine() validation on the ZodObject.
 */
export default interface RequestValidators {
  params?: AnyZodObject;
  body?: AnyZodObject | ZodEffects<AnyZodObject>;
  query?: AnyZodObject;
}
