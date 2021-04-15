-- Table Definition ----------------------------------------------

CREATE TABLE personal_info (
    id SERIAL PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES users(id) UNIQUE,
    first_name text DEFAULT ''::character varying,
    last_name text DEFAULT ''::character varying,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    primary_language text DEFAULT ''::text,
    birth_date date,
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX personal_info_pkey ON personal_info(id int4_ops);
CREATE UNIQUE INDEX personal_info_user_id_key ON personal_info(user_id uuid_ops);
