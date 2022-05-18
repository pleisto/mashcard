-----------------------------------------------------------
-- THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY) --
-----------------------------------------------------------


CREATE EXTENSION IF NOT EXISTS ltree WITH SCHEMA public;

COMMENT ON EXTENSION ltree IS 'data type for hierarchical tree-like structures';

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';

CREATE TYPE public.pod_type AS ENUM (
    'user',
    'space'
);

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

CREATE TABLE public.event_logs (
    id bigint NOT NULL,
    actor_type text NOT NULL,
    actor_id text,
    event public.ltree NOT NULL,
    context jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
)
WITH (fillfactor='95');

COMMENT ON TABLE public.event_logs IS 'event_logs is a generic event log table';

COMMENT ON COLUMN public.event_logs.actor_type IS 'actor_type is the type of the action trigger, such as user, background_job, etc.';

COMMENT ON COLUMN public.event_logs.actor_id IS 'actor_id is the identifier of the actor and can be null';

COMMENT ON COLUMN public.event_logs.event IS 'event name could has multiple levels, such as "user.create"';

CREATE SEQUENCE public.event_logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.event_logs_id_seq OWNED BY public.event_logs.id;

CREATE TABLE public.pod_access_credentials (
    id bigint NOT NULL,
    pod_type public.pod_type NOT NULL,
    pod_id bigint NOT NULL,
    provider text NOT NULL,
    subject text NOT NULL,
    meta jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);

COMMENT ON TABLE public.pod_access_credentials IS 'pod_access_credentials stores user authentication providers, and it is will delete cascade on user deletion';

COMMENT ON COLUMN public.pod_access_credentials.provider IS 'provider is the identity provider, such as google, WebAuthn, etc.';

COMMENT ON COLUMN public.pod_access_credentials.subject IS 'subject is the unique identifier of the user in the provider';

COMMENT ON COLUMN public.pod_access_credentials.meta IS 'meta is a JSON object that contains extra information about the user in the provider';

CREATE SEQUENCE public.pod_access_credentials_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.pod_access_credentials_id_seq OWNED BY public.pod_access_credentials.id;

CREATE TABLE public.pods (
    type public.pod_type NOT NULL,
    id bigint NOT NULL,
    slug text NOT NULL,
    name text NOT NULL,
    bio text,
    avatar_url text,
    locked_at timestamp without time zone,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_is_initialized boolean DEFAULT false NOT NULL,
    space_owner_id bigint,
    space_is_invite_enabled boolean DEFAULT false NOT NULL,
    space_invite_secret text,
    CONSTRAINT space_owner_id_non_null CHECK (((type <> 'space'::public.pod_type) OR (space_owner_id IS NOT NULL)))
);

COMMENT ON TABLE public.pods IS 'A data pod is a place for storing documents, with mechanisms for controlling who can access what.
  In Brickdoc, pods is an abstract table used to represent tenants, which can be either users or spaces';

CREATE SEQUENCE public.pods_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.pods_id_seq OWNED BY public.pods.id;

CREATE TABLE public.settings (
    id bigint NOT NULL,
    key public.ltree NOT NULL,
    value jsonb,
    scope public.ltree NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);

COMMENT ON COLUMN public.settings.key IS 'Settings key with namespace';

COMMENT ON COLUMN public.settings.scope IS 'Scope of application of key. format: {spaceId}.{userId}';

CREATE SEQUENCE public.settings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.settings_id_seq OWNED BY public.settings.id;

CREATE TABLE public.spaces_members (
    id bigint NOT NULL,
    space_id bigint NOT NULL,
    user_id bigint NOT NULL,
    role integer NOT NULL,
    state integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);

COMMENT ON TABLE public.spaces_members IS 'spaces_members will delete cascade on space or user deletion';

CREATE SEQUENCE public.spaces_members_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.spaces_members_id_seq OWNED BY public.spaces_members.id;

CREATE VIEW public.v_spaces AS
 SELECT pods.id,
    pods.slug,
    pods.name,
    pods.bio,
    pods.type,
    pods.avatar_url,
    pods.locked_at,
    pods.created_at,
    pods.updated_at,
    pods.space_owner_id AS owner_id,
    pods.space_is_invite_enabled AS is_invite_enabled,
    pods.space_invite_secret AS invite_secret
   FROM public.pods
  WHERE (pods.type = 'space'::public.pod_type)
  WITH LOCAL CHECK OPTION;

COMMENT ON VIEW public.v_spaces IS 'v_spaces is a updatable database view of space pod.';

CREATE VIEW public.v_users AS
 SELECT pods.id,
    pods.slug,
    pods.name,
    pods.bio,
    pods.type,
    pods.avatar_url,
    pods.locked_at,
    pods.created_at,
    pods.updated_at,
    pods.user_is_initialized AS is_initialized
   FROM public.pods
  WHERE (pods.type = 'user'::public.pod_type)
  WITH LOCAL CHECK OPTION;

COMMENT ON VIEW public.v_users IS 'v_users is a updatable database view of user pod.';

ALTER TABLE ONLY public.event_logs ALTER COLUMN id SET DEFAULT nextval('public.event_logs_id_seq'::regclass);

ALTER TABLE ONLY public.pod_access_credentials ALTER COLUMN id SET DEFAULT nextval('public.pod_access_credentials_id_seq'::regclass);

ALTER TABLE ONLY public.pods ALTER COLUMN id SET DEFAULT nextval('public.pods_id_seq'::regclass);

ALTER TABLE ONLY public.settings ALTER COLUMN id SET DEFAULT nextval('public.settings_id_seq'::regclass);

ALTER TABLE ONLY public.spaces_members ALTER COLUMN id SET DEFAULT nextval('public.spaces_members_id_seq'::regclass);

ALTER TABLE ONLY public.db_migrations
    ADD CONSTRAINT db_migrations_pkey PRIMARY KEY (name);

ALTER TABLE ONLY public.event_logs
    ADD CONSTRAINT event_logs_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.pod_access_credentials
    ADD CONSTRAINT pod_access_credentials_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.pods
    ADD CONSTRAINT pods_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.spaces_members
    ADD CONSTRAINT spaces_members_pkey PRIMARY KEY (id);

CREATE INDEX event_logs_actor_type_actor_id ON public.event_logs USING btree (actor_type, actor_id);

CREATE INDEX event_logs_created_at ON public.event_logs USING brin (created_at);

CREATE UNIQUE INDEX pod_access_credentials_provider_subject_ukey ON public.pod_access_credentials USING btree (provider, subject);

CREATE UNIQUE INDEX pods_lower_slug_text_ukey ON public.pods USING btree (lower(slug));

CREATE UNIQUE INDEX pods_space_invite_secret_ukey ON public.pods USING btree (space_invite_secret);

CREATE UNIQUE INDEX settings_key_scope_ukey ON public.settings USING btree (key, scope);

ALTER TABLE ONLY public.pod_access_credentials
    ADD CONSTRAINT pod_access_credentials_pod_id_fk FOREIGN KEY (pod_id) REFERENCES public.pods(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.pods
    ADD CONSTRAINT pods_owner_id_fkey FOREIGN KEY (space_owner_id) REFERENCES public.pods(id) ON DELETE RESTRICT;

COMMENT ON CONSTRAINT pods_owner_id_fkey ON public.pods IS 'deleting a user will fail if the user is the owner of any space';

ALTER TABLE ONLY public.spaces_members
    ADD CONSTRAINT spaces_members_space_id_fk FOREIGN KEY (space_id) REFERENCES public.pods(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.spaces_members
    ADD CONSTRAINT spaces_members_user_id_fk FOREIGN KEY (user_id) REFERENCES public.pods(id) ON DELETE CASCADE;

