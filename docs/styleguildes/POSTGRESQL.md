# PostgreSQL styleguide

This styleguide is described our best practices for developing on PostgreSQL.

## Philosophy: First-Class Database

If you have experience working for a typical dot-com company, you may be inclined to put more business logic in the application layer than in the database layer. **But in Brickdoc, we think putting more business logic in the database layer is the best way to go.**

- **PostgreSQL is highly scalable.** The most common reason for putting business logic in the application layer is that databases are often difficult to scale. But unlike other databases like MySQL, in fact, PostgreSQL is highly scalable and can even be distributed architecture.
- **The complexity of the business logic is our primary challenge.** In a typical dot-com company, the primary engineering challenge is in support of extremely high concurrency and massive amounts of data rather than the complexity of the business logic itself. Ever for some consumer-facing companies ensuring data integrity is not a must, and occasional data corruption is acceptable. But in Brickdoc, we have a much higher business logic complexity as an enterprise PaaS product, and we cannot accept the risk of data corruption.
- **Avoid object-relational impedance mismatch** ORMs have some nice features, but [impedance mismatch](https://en.wikipedia.org/wiki/Object%E2%80%93relational_impedance_mismatch) is a common technical difficulties. You could read [What ORMs have taught me: just learn SQL](https://wozniak.ca/blog/2014/08/03/1/) for more details. Considering the rich features of PostgreSQL include [Recursive CTE](https://www.postgresql.org/docs/current/queries-with.html), [ltree](https://www.postgresql.org/docs/14/ltree.html), [Triggers](https://www.postgresql.org/docs/current/sql-createtrigger.html),[PL/pgSQL](https://www.postgresql.org/docs/current/plpgsql.html), etc. So, we write type-safe plain SQL directly using [slnoik](https://github.com/gajus/slonik), and use the database schema including tables and views as a single source of truth.

## Naming Convention

- Use `underscore_case` for all object(such as tables, columns, views, enum, etc.) names, do not start with `pg` or numbers and do not include any reserved words.
- The standard names for indexes in PostgreSQL are `{tablename}_{columnname(s)}_{suffix}`. Where the suffix is one of the following:
  - `_pkey` for primary key
  - `_ukey` for unique constraint
  - `_idx` for any other kind of index
  - `_excl` for an Exclusion constraint
  - `_fkey` for foreign key
  - `_check` for check constraint
- The same column in multiple tables should have the same name and data type.

## Design Rules

### Timestamps columns

- All tables that may be updated should have a `created_at` and `updated_at` column and they should be set `NOT NULL` and not have a default value. The application needs to explicitly include the `created_at` and `updated_at` columns in all insert and update queries.
- All tables that only append data (such as logs) should have a `created_at` column with a default value of `DEFAULT CURRENT_TIMESTAMP NOT NULL`. This means `created_at` is transparent to the application.

Example:

```sql
-- Data may modified
CREATE TABLE "spaces_members" (
    "id" BIGSERIAL PRIMARY KEY,
    "space_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "role" INTEGER NOT NULL,
    "state" INTEGER DEFAULT 0 NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP NOT NULL,
    CONSTRAINT spaces_members_space_id_fk FOREIGN KEY(space_id) REFERENCES pods(id) ON DELETE CASCADE,
    CONSTRAINT spaces_members_user_id_fk FOREIGN KEY(user_id) REFERENCES pods(id) ON DELETE CASCADE
);

-- Append only
CREATE TABLE public.event_logs (
    id bigint NOT NULL,
    actor_type text NOT NULL,
    actor_id text,
    event public.ltree NOT NULL,
    context jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
) WITH (fillfactor='95');
```

### Implementing single-table inheritance through views

In PostgreSQL, view is updatable when it meets the following conditions:

- The view's defining query must have exactly one entry in the FROM clause, which can be a table or another updatable view.
- The defining query must not contain one of the following clauses at the top level: GROUP BY, HAVING, LIMIT, OFFSET, DISTINCT, WITH, UNION, INTERSECT, and EXCEPT.
- The selection list must not contain any window function , any set-returning function, or any aggregate function such as SUM, COUNT, AVG, MIN, and MAX.

An updatable view may contain both updatable and non-updatable columns. If you try to insert or update a non-updatable column, PostgreSQL will raise an error.

When you execute an update operation such as INSERT, UPDATE or DELETE, PosgreSQL will convert this statement into the corresponding statement of the underlying table.

In case you have a WHERE condition in the defining query of a view, you still can update or delete the rows that are not visible through the view. However, if you want to avoid this, you can use CHECK OPTION when you define the view.

So, you can use view to implement single-table inheritance. BTW, in some cases without foreign key, [Table Inheritance](https://arctype.com/blog/inheritance-in-postgres/) is another way to implement table inheritance.

### Use a more appropriate data type for a column

PostgreSQL has a lot of data types, and we should use the most appropriate data type for a column. For example, `inet` is a better choice than `text` when storing ip addresses.

### Use `gin` Index for a `JSONB` columns

GIN indexes can efficiently search for keys or key/value pairs occurring within a large number of jsonb documents (datums).

### Add Foreign Key Constraints with `ON DELETE` clause

Foreign Key Constraints could help you to enforce referential integrity, and you could set the `ON DELETE` clause to `CASCADE`, `SET NULL`, `SET DEFAULT`, or `NO ACTION`. See [Foreign Keys](https://www.postgresql.org/docs/current/tutorial-fk.html) for more details.

### Do not use `btree` indexes directly for larger text columns

It is not recommended that the btree index field exceed 2000 bytes. If there are fields exceeding 2000 bytes that need to be indexed, it is recommended to use a functional index (such as a hash value index) or a word segmentation index.

example:

```sql
CREATE INDEX foo_idex ON bar(digest(large_column,'sha256'))
```

## How to Query

- Use `COUNT()` instead of `COUNT(some_column_name)` to count the number of rows to comply with SQL92 standard.
- Use `WHERE EXISTS` instead of `WHERE IN`.
