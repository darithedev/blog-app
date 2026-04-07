--
-- PostgreSQL database dump
--

\restrict 2vbozNyp1NU4f45oAMdVwj1gRlP8POd8pbyQW29w2ZnEPlwa4KSwqoZ5o8iADBG

-- Dumped from database version 15.15 (Homebrew)
-- Dumped by pg_dump version 15.15 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id bigint NOT NULL,
    title character varying(255) NOT NULL,
    description character varying(100),
    text text NOT NULL,
    tags text[] DEFAULT '{}'::text[],
    image character varying(255),
    user_id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    password text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.posts (id, title, description, text, tags, image, user_id, created_at, updated_at) FROM stdin;
1	Top 10 Sci-Fi Must Reads	A countdown of the best science fiction books of the decade.	zxczxczxcasdasdasdqweqweqwe123123123ZXCASDQWE!@#$&*()_+[]{}|;:,.<>?	{books,sci-fi,"top 10"}	\N	1	2026-04-07 00:11:11.67096-04	2026-04-07 00:11:11.67096-04
2	Why I Love Fantasy Maps	An exploration of cartography in fantasy literature.	poiuytrewqlkjhgfdsamnbvcxz0987654321POIUYTREWQLKJHGFDSAMNBVCXZ	{books,fantasy,maps}	\N	1	2026-04-07 00:11:25.122048-04	2026-04-07 00:11:25.122048-04
3	It's a Small World Afterall	AAATalks about the song it's a small world afterall.	This song is written for the legendary Disneyland boat ride of the same name, where children from all over the world sing for world peace.The ride originally opened on April 22, 1964 as one of the four attractions Walt Disney presented at the 1964-1965 New York World’s Fair to showcase his new ride technology Audio-Animatronics, a technology which enables the animatronics to move in sync to the recorded soundtracks much akin to how his animated characters move.As a testament to the song’s longevity, it has become one of the most recognizable tunes of all time and is even stated to be the most translated song in the world. With that said, its catchiness has also been a strong subject of parody and chagrin.	{books,"good reads",new}	\N	1	2026-04-06 23:52:01.625826-04	2026-04-06 23:52:01.625826-04
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, first_name, last_name, email, password, created_at, updated_at) FROM stdin;
1	Dari	Cares	dari@cares.com	Password123	2026-04-02 23:20:38.828161-04	2026-04-02 23:20:38.828161-04
2 Amy   Wine  amy@mail.com    Password123 2026-04-03 21:22:13.258661-04 2026-04-03 21:22:13.258661-04
3	Ryley	Cares	riley@cares.com	Password123	2026-04-03 22:58:07.36508-04	2026-04-03 22:58:07.36508-04
\.


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 6, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: posts posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict 2vbozNyp1NU4f45oAMdVwj1gRlP8POd8pbyQW29w2ZnEPlwa4KSwqoZ5o8iADBG

