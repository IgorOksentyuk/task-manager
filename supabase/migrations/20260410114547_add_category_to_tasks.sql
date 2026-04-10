ALTER TABLE public.tasks
ADD COLUMN category text NOT NULL DEFAULT 'work'
CONSTRAINT tasks_category_check CHECK (category IN ('work', 'entertainment', 'household'));
