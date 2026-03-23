-- 1. Create the Roles table
CREATE TABLE roles (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(50) NOT NULL UNIQUE,
                       display_name VARCHAR(100) NOT NULL,
                       description TEXT NOT NULL
);

-- 2. Create the Mapping table (User <-> Role)
CREATE TABLE user_roles (
                            id BIGINT AUTO_INCREMENT PRIMARY KEY,
                            user_id BIGINT NOT NULL,
                            role_id BIGINT NOT NULL,
                            granted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            granted_by VARCHAR(100) NOT NULL,
                            is_active BOOLEAN NOT NULL DEFAULT TRUE,

                            CONSTRAINT u1_user_role UNIQUE (user_id, role_id),
                            CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                            CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- 3. Seed the roles
INSERT INTO roles (name, display_name, description) VALUES
                                                        ('ROLE_ADMIN', 'Admin', 'System administrator'),
                                                        ('ROLE_STUDENT', 'Student', 'Standard user who can enroll in courses'),
                                                        ('ROLE_TEACHER', 'Teacher', 'User who can create and manage courses');

-- 4. Create the First Admin User
INSERT INTO users (email,username,password,first_name,is_enabled,is_locked,version)
VALUES (
           '${admin_email}',               -- Replaced!
           '${admin_username}',
           '${admin_password_hash}',
           'Angel',
           true,
           false,
           0
       );

-- 5. Give the Admin ONLY the Admin role (Permissions will handle the rest)
INSERT INTO user_roles (user_id, role_id, granted_by) VALUES
    ((SELECT id FROM users WHERE username = '${admin_username}'), 1, 'SYSTEM_INIT');