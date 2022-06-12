# GraphQL styleguide

> See [Shopify GraphQL Design Tutorial](https://github.com/Shopify/graphql-design-tutorial/blob/master/TUTORIAL.md) for more information.

- Rule #1: Always start with a high-level view of the objects and their relationships before you deal with specific fields.
- Rule #2: Never expose implementation details in your API design.
- Rule #3: Design your API around the business domain, not the implementation, user-interface, or legacy APIs.
- Rule #4: It’s easier to add fields than to remove them.
- Rule #5: Major business-object types should always implement Node.
- Rule #6: Group closely-related fields together into subobjects.
- Rule #7: Always check whether list fields should be paginated or not.
- Rule #8: Always use object references instead of ID fields.
- Rule #9: Choose field names based on what makes sense, not based on the implementation or what the field is called in legacy APIs.
- Rule #10: Use custom scalar types when you’re exposing something with specific semantic value.
- Rule #11: Use enums for fields which can only take a specific set of values.
- Rule #12: The API should provide business logic, not just data. Complex calculations should be done on the server, in one place, not on the client, in many places.
- Rule #13: Provide the raw data too, even when there’s business logic around it.
- Rule #14: Write separate mutations for separate logical actions on a resource.
- Rule #15: Mutating relationships is really complicated and not easily summarized into a snappy rule.
- Rule #16: When writing separate mutations for relationships, consider whether it would be useful for the mutations to operate on multiple elements at once.
- Rule #17: Prefix mutation names with the object they are mutating for
  alphabetical grouping (e.g. use `orderCancel` instead of `cancelOrder`).
- Rule #18: Only make input fields required if they're actually semantically required for the mutation to proceed.
- Rule #19: Use weaker types for inputs (e.g. String instead of Email) when the format is unambiguous and client-side validation is complex. This lets the server run all non-trivial validations at once and return the errors in a single place in a single format, simplifying the client.
- Rule #20: Use stronger types for inputs (e.g. DateTime instead of String) when the format may be ambiguous and client-side validation is simple. This provides clarity and encourages clients to use stricter input controls (e.g. a date-picker widget instead of a free-text field).
- Rule #21: Structure mutation inputs to reduce duplication, even if this requires relaxing requiredness constraints on certain fields.
- Rule #22: Mutations should provide user/business-level errors via a userErrors field on the mutation payload. The top-level query errors entry is reserved for client and server-level errors.
- Rule #23: Most payload fields for a mutation should be nullable, unless there is really a value to return in every possible error case.
