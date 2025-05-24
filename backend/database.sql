
-- Create the database
CREATE DATABASE IF NOT EXISTS children_vaccination;

-- Use the database
USE children_vaccination;

-- Create the children table with all required fields
CREATE TABLE IF NOT EXISTS children (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    dob DATE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    guardian_name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    vaccine_name VARCHAR(100) NOT NULL,
    vaccination_date DATE NOT NULL,
    next_due_date DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add missing columns if they don't exist (for existing databases)
ALTER TABLE children 
ADD COLUMN IF NOT EXISTS next_due_date DATE,
ADD COLUMN IF NOT EXISTS notes TEXT;

-- Insert sample data
INSERT INTO children (name, dob, gender, guardian_name, address, vaccine_name, vaccination_date, next_due_date, notes) VALUES
('Sarah Johnson', '2020-03-15', 'Female', 'Emily Johnson', '123 Maple Street, Springfield, IL 62701', 'MMR', '2024-03-15', '2025-03-15', 'No adverse reactions observed. Child was cooperative during vaccination.'),
('Michael Chen', '2019-07-22', 'Male', 'David Chen', '456 Oak Avenue, Springfield, IL 62702', 'DPT', '2024-07-22', '2025-01-22', 'Mild fever reported 24 hours post-vaccination, resolved with acetaminophen.'),
('Aisha Patel', '2021-11-08', 'Female', 'Priya Patel', '789 Pine Road, Springfield, IL 62703', 'Hepatitis B', '2024-11-08', '2025-05-08', 'Second dose in series. Next appointment scheduled for booster.'),
('James Wilson', '2020-09-12', 'Male', 'Robert Wilson', '321 Cedar Lane, Springfield, IL 62704', 'BCG', '2020-10-12', '2025-10-12', 'First vaccination administered successfully.'),
('Emma Martinez', '2021-05-20', 'Female', 'Sofia Martinez', '654 Birch Street, Springfield, IL 62705', 'Polio', '2021-07-20', '2025-07-20', 'Completed first round of polio vaccination.');
