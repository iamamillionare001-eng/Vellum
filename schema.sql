CREATE TABLE public.creators (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    username VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID REFERENCES public.creators(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.follower_interactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID REFERENCES public.creators(id) ON DELETE CASCADE,
    link_id UUID REFERENCES public.links(id) ON DELETE SET NULL,
    platform VARCHAR(50) NOT NULL,
    follower_username VARCHAR(255),
    follower_id VARCHAR(255),
    interaction_type VARCHAR(50) NOT NULL,
    intent VARCHAR(50),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_interactions_creator_id ON public.follower_interactions(creator_id);
CREATE INDEX idx_interactions_link_id ON public.follower_interactions(link_id);
CREATE INDEX idx_interactions_created_at ON public.follower_interactions(created_at);
