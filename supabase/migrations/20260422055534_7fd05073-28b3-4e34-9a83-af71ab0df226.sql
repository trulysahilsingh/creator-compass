-- Scripts table to store user-generated reel scripts as history
CREATE TABLE public.scripts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  topic TEXT NOT NULL,
  niche TEXT,
  tone TEXT,
  duration TEXT,
  hook_style TEXT,
  result JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_scripts_user_created ON public.scripts(user_id, created_at DESC);

ALTER TABLE public.scripts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own scripts"
  ON public.scripts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own scripts"
  ON public.scripts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own scripts"
  ON public.scripts FOR DELETE
  USING (auth.uid() = user_id);
