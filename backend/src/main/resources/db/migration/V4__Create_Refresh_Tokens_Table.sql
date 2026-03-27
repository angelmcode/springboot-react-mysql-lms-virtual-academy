-- Create the refresh_tokens table
CREATE TABLE refresh_tokens (
                                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                user_id BIGINT NOT NULL,
                                token VARCHAR(255) NOT NULL UNIQUE,
                                expiry_date TIMESTAMP NOT NULL,
                                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,

    -- Foreign Key Constraint linking to the users table
    -- ON DELETE CASCADE ensures tokens are removed if the user is deleted
                                CONSTRAINT fk_rt_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Add an index on the token column for faster lookups during the refresh process
CREATE INDEX idx_rt_token ON refresh_tokens(token);