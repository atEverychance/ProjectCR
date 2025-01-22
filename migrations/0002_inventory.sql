-- Create inventory_items table
CREATE TABLE IF NOT EXISTS inventory_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    event_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    size TEXT,
    price DECIMAL(10,2) NOT NULL,
    condition TEXT NOT NULL CHECK(condition IN ('new', 'like_new', 'good', 'fair')),
    status TEXT NOT NULL CHECK(status IN ('pending', 'approved', 'rejected', 'sold', 'returned')),
    barcode TEXT UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES consignors(user_id),
    FOREIGN KEY (event_id) REFERENCES events(id)
);

-- Create inventory_categories table
CREATE TABLE IF NOT EXISTS inventory_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create inventory_images table
CREATE TABLE IF NOT EXISTS inventory_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    primary_image BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES inventory_items(id) ON DELETE CASCADE
);

-- Create inventory_price_adjustments table
CREATE TABLE IF NOT EXISTS inventory_price_adjustments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER NOT NULL,
    old_price DECIMAL(10,2) NOT NULL,
    new_price DECIMAL(10,2) NOT NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES inventory_items(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_inventory_user ON inventory_items(user_id);
CREATE INDEX idx_inventory_event ON inventory_items(event_id);
CREATE INDEX idx_inventory_status ON inventory_items(status);
CREATE INDEX idx_inventory_barcode ON inventory_items(barcode);
CREATE INDEX idx_inventory_category ON inventory_items(category);
CREATE INDEX idx_images_item ON inventory_images(item_id);
CREATE INDEX idx_adjustments_item ON inventory_price_adjustments(item_id);

-- Create trigger to update inventory_items updated_at
CREATE TRIGGER update_inventory_items_timestamp 
AFTER UPDATE ON inventory_items
BEGIN
    UPDATE inventory_items SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Create trigger to update inventory_categories updated_at
CREATE TRIGGER update_inventory_categories_timestamp 
AFTER UPDATE ON inventory_categories
BEGIN
    UPDATE inventory_categories SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Insert default categories
INSERT INTO inventory_categories (name, description) VALUES
    ('Clothing', 'All types of clothing items'),
    ('Toys', 'Children''s toys and games'),
    ('Books', 'Books and educational materials'),
    ('Electronics', 'Electronic devices and gadgets'),
    ('Furniture', 'Furniture and home decor'),
    ('Sports', 'Sports equipment and gear'),
    ('Baby Items', 'Items for babies and infants'),
    ('Accessories', 'Fashion accessories and jewelry');