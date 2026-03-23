-- 1. Create the Permissions table
CREATE TABLE permissions (
                             id BIGINT AUTO_INCREMENT PRIMARY KEY,
                             name VARCHAR(50) UNIQUE NOT NULL,
                             display_name VARCHAR(100) NOT NULL,
                             description TEXT NOT NULL
);

-- 2. Create the Mapping table (Role <-> Permission)
CREATE TABLE role_permissions (
                                  id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                  role_id BIGINT NOT NULL,
                                  permission_id BIGINT NOT NULL,
                                  granted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                  granted_by VARCHAR(100) NOT NULL,
                                  is_active BOOLEAN NOT NULL DEFAULT TRUE,

                                  CONSTRAINT u1_role_permission UNIQUE (role_id, permission_id),
                                  CONSTRAINT fk_rp_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
                                  CONSTRAINT fk_rp_permission FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

-- 3. Seed the base routing permissions
INSERT INTO permissions (name, display_name, description) VALUES
                                                              ('ACCESS_STUDENT_PANEL', 'Student Dashboard Access', 'Can view the learning environment'),
                                                              ('ACCESS_TEACHER_PANEL', 'Teacher Dashboard Access', 'Can view the instructor environment'),
                                                              ('ACCESS_ADMIN_PANEL', 'Admin Dashboard Access', 'Can view the system administrator environment');

-- 4. Link Permissions to Roles
-- Note: role_id 1 = Admin, 2 = Student, 3 = Teacher
-- Note: permission_id 1 = Student Panel, 2 = Teacher Panel, 3 = Admin Panel

-- Admin gets all 3 panels
INSERT INTO role_permissions (role_id, permission_id, granted_by) VALUES
                                                                      (1, 1, 'SYSTEM_INIT'),
                                                                      (1, 2, 'SYSTEM_INIT'),
                                                                      (1, 3, 'SYSTEM_INIT');

-- Student ONLY gets the Student panel
INSERT INTO role_permissions (role_id, permission_id, granted_by) VALUES
                                                                    (2, 1, 'SYSTEM_INIT');

-- Teacher gets both Teacher AND Student panels
INSERT INTO role_permissions (role_id, permission_id, granted_by) VALUES
                                                                      (3, 1, 'SYSTEM_INIT'),
                                                                      (3, 2, 'SYSTEM_INIT');