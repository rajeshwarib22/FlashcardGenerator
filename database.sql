CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE flashcards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  explanation TEXT,
  difficulty TEXT DEFAULT 'medium',
  embedding VECTOR(1536),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  card_id UUID NOT NULL REFERENCES flashcards(id) ON DELETE CASCADE,
  is_correct BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_flashcards_document ON flashcards(document_id);
CREATE INDEX idx_progress_card ON progress(card_id);
CREATE INDEX idx_embedding ON flashcards USING ivfflat (embedding vector_cosine_ops);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all" ON documents FOR SELECT USING (true);
CREATE POLICY "Allow all" ON documents FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow all" ON flashcards FOR SELECT USING (true);
CREATE POLICY "Allow all" ON flashcards FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow all" ON progress FOR SELECT USING (true);
CREATE POLICY "Allow all" ON progress FOR INSERT WITH CHECK (true);