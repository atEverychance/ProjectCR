-- Create consignors table
CREATE TABLE IF NOT EXISTS consignors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    address TEXT,
    preferred_contact TEXT CHECK(preferred_contact IN ('email', 'phone')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create consignor_agreements table
CREATE TABLE IF NOT EXISTS consignor_agreements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    commission_rate DECIMAL(5,2) NOT NULL,
    payment_method TEXT NOT NULL CHECK(payment_method IN ('direct_deposit', 'check')),
    bank_account TEXT,
    routing_number TEXT,
    accepted_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES consignors(user_id)
);

-- Create consignor_earnings table
CREATE TABLE IF NOT EXISTS consignor_earnings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    sale_id TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    commission_rate DECIMAL(5,2) NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('pending', 'paid', 'cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paid_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES consignors(user_id)
);

-- Create indexes
CREATE INDEX idx_consignors_user_id ON consignors(user_id);
CREATE INDEX idx_consignor_agreements_user_id ON consignor_agreements(user_id);
CREATE INDEX idx_consignor_earnings_user_id ON consignor_earnings(user_id);
CREATE INDEX idx_consignor_earnings_sale_id ON consignor_earnings(sale_id);

-- Create trigger to update updated_at
CREATE TRIGGER update_consignors_timestamp 
AFTER UPDATE ON consignors
BEGIN
    UPDATE consignors SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;