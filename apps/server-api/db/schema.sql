-----------------------------------------------------------
-- THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY) --
-----------------------------------------------------------
    
CREATE TABLE public.db_migrations (
    name text NOT NULL,
    hash text NOT NULL,
    date timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE ONLY public.db_migrations
    ADD CONSTRAINT db_migrations_pkey PRIMARY KEY (name);

