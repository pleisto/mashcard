-----------------------------------------------------------
-- THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY) --
-----------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS ltree WITH SCHEMA public;

COMMENT ON EXTENSION ltree IS 'data type for hierarchical tree-like structures';

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';

CREATE FUNCTION public.settings_scope_priority(scope public.ltree, fallback text DEFAULT ''::text, root text DEFAULT 'root'::text) RETURNS integer
    LANGUAGE plpgsql
    AS $$
BEGIN
  RETURN CASE scope::text
         WHEN 'root' THEN 0
         WHEN fallback THEN 1
         ELSE nlevel(scope)
         END;

END;

$$;

COMMENT ON FUNCTION public.settings_scope_priority(scope public.ltree, fallback text, root text) IS 'Returns the priority of a scope. The root scope has the lowest priority.';

CREATE TABLE public.db_migrations (
    name text NOT NULL,
    hash text NOT NULL,
    date timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.settings (
    id integer NOT NULL,
    key public.ltree NOT NULL,
    value jsonb,
    scope public.ltree NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);

COMMENT ON COLUMN public.settings.key IS 'Settings key with namespace';

COMMENT ON COLUMN public.settings.scope IS 'Scope of application of key. format: {spaceId}.{userId}';

CREATE SEQUENCE public.settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.settings_id_seq OWNED BY public.settings.id;

ALTER TABLE ONLY public.settings ALTER COLUMN id SET DEFAULT nextval('public.settings_id_seq'::regclass);

ALTER TABLE ONLY public.db_migrations
    ADD CONSTRAINT db_migrations_pkey PRIMARY KEY (name);

ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_pkey PRIMARY KEY (id);

CREATE UNIQUE INDEX settings_key_scope_ukey ON public.settings USING btree (key, scope);

