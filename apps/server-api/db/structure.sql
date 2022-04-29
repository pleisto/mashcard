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

CREATE TABLE public.accounts_members (
    id integer NOT NULL,
    space_id bigint NOT NULL,
    user_id bigint NOT NULL,
    role integer NOT NULL,
    state integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);

CREATE SEQUENCE public.accounts_members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.accounts_members_id_seq OWNED BY public.accounts_members.id;

CREATE TABLE public.accounts_providers (
    id integer NOT NULL,
    user_id bigint NOT NULL,
    provider character varying NOT NULL,
    uid character varying NOT NULL,
    meta jsonb DEFAULT '{}'::jsonb NOT NULL,
    locked_at timestamp without time zone,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);

COMMENT ON COLUMN public.accounts_providers.meta IS 'Provider metadata';

CREATE SEQUENCE public.accounts_providers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.accounts_providers_id_seq OWNED BY public.accounts_providers.id;

CREATE TABLE public.accounts_users (
    id integer NOT NULL,
    locked_at timestamp without time zone,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    last_space_domain character varying
);

COMMENT ON COLUMN public.accounts_users.last_space_domain IS 'Last visited domain';

CREATE SEQUENCE public.accounts_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.accounts_users_id_seq OWNED BY public.accounts_users.id;

CREATE TABLE public.db_migrations (
    name text NOT NULL,
    hash text NOT NULL,
    date timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.events (
    id integer NOT NULL,
    space_id bigint NOT NULL,
    user_id bigint NOT NULL,
    meta jsonb DEFAULT '{}'::jsonb NOT NULL,
    state integer DEFAULT 0 NOT NULL,
    kind integer NOT NULL,
    key character varying NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);

COMMENT ON COLUMN public.events.key IS 'Key of event, used to index';

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;

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

CREATE TABLE public.spaces (
    id integer NOT NULL,
    owner_id bigint NOT NULL,
    locked_at timestamp without time zone,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    domain character varying(50) NOT NULL,
    name character varying(50) NOT NULL,
    bio character varying,
    initialized boolean DEFAULT false NOT NULL,
    personal boolean DEFAULT false NOT NULL,
    invite_enable boolean DEFAULT false NOT NULL,
    invite_secret character varying NOT NULL
);

CREATE SEQUENCE public.spaces_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.spaces_id_seq OWNED BY public.spaces.id;

ALTER TABLE ONLY public.accounts_members ALTER COLUMN id SET DEFAULT nextval('public.accounts_members_id_seq'::regclass);

ALTER TABLE ONLY public.accounts_providers ALTER COLUMN id SET DEFAULT nextval('public.accounts_providers_id_seq'::regclass);

ALTER TABLE ONLY public.accounts_users ALTER COLUMN id SET DEFAULT nextval('public.accounts_users_id_seq'::regclass);

-


-ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);

ALTER TABLE ONLY public.settings ALTER COLUMN id SET DEFAULT nextval('public.settings_id_seq'::regclass);

ALTER TABLE ONLY public.spaces ALTER COLUMN id SET DEFAULT nextval('public.spaces_id_seq'::regclass);

ALTER TABLE ONLY public.accounts_members
    ADD CONSTRAINT accounts_members_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.accounts_providers
    ADD CONSTRAINT accounts_providers_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.accounts_users
    ADD CONSTRAINT accounts_users_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.db_migrations
    ADD CONSTRAINT db_migrations_pkey PRIMARY KEY (name);

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.spaces
    ADD CONSTRAINT spaces_pkey PRIMARY KEY (id);

CREATE INDEX accounts_members_space_id_key ON public.accounts_members USING btree (space_id);

CREATE INDEX accounts_members_user_id_key ON public.accounts_members USING btree (user_id);

CREATE UNIQUE INDEX accounts_providers_provider_uid_ukey ON public.accounts_providers USING btree (provider, uid);

CREATE INDEX accounts_providers_user_id_key ON public.accounts_providers USING btree (user_id);

CREATE INDEX events_space_id_kind_key_key ON public.events USING btree (space_id, kind, key);

CREATE INDEX events_user_id_key ON public.events USING btree (user_id);

CREATE UNIQUE INDEX settings_key_scope_ukey ON public.settings USING btree (key, scope);

CREATE UNIQUE INDEX spaces_invite_secret_ukey ON public.spaces USING btree (invite_secret);

CREATE UNIQUE INDEX spaces_lower_domain_text_ukey ON public.spaces USING btree (lower((domain)::text));

CREATE INDEX spaces_owner_id_key ON public.spaces USING btree (owner_id);

