-- Adiciona o campo card_id à tabela profiles existente
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS card_id text UNIQUE;

-- Cria índice único para card_id
CREATE UNIQUE INDEX IF NOT EXISTS profiles_card_id_idx ON profiles(card_id);

-- Função para gerar card_id único de 6 dígitos
CREATE OR REPLACE FUNCTION generate_unique_card_id()
RETURNS text AS $$
DECLARE
  new_card_id text;
  done bool;
BEGIN
  done := false;
  WHILE NOT done LOOP
    -- Gera um número aleatório de 6 dígitos
    new_card_id := LPAD(FLOOR(RANDOM() * 1000000)::text, 6, '0');
    
    -- Verifica se já existe
    done := NOT EXISTS(SELECT 1 FROM profiles WHERE card_id = new_card_id);
  END LOOP;
  
  RETURN new_card_id;
END;
$$ LANGUAGE plpgsql;

-- Função para gerar card_id automaticamente
CREATE OR REPLACE FUNCTION set_card_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.card_id IS NULL THEN
    NEW.card_id := generate_unique_card_id();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para card_id
DROP TRIGGER IF EXISTS set_profiles_card_id ON profiles;
CREATE TRIGGER set_profiles_card_id
  BEFORE INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION set_card_id();

-- Atualiza os perfis existentes sem card_id
UPDATE profiles SET card_id = generate_unique_card_id() WHERE card_id IS NULL;