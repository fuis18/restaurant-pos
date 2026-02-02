CREATE TABLE
  IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code INTEGER NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    state BOOLEAN NOT NULL DEFAULT 1
  );

CREATE INDEX idx_products_state ON products (id)
WHERE
  state = 1;

CREATE INDEX idx_products_code ON products (code);