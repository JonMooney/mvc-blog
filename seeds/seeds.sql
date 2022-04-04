USE blog_db;

INSERT INTO user (username, password) VALUES 
('jon', 'password'),
('greg', 'password');

INSERT INTO post (title, content, user_id) VALUES
('New blog post', 'Some content inside of a blog post is so cool', 1),
('New blog post # 2', 'A completely different blog post from first user', 1);

