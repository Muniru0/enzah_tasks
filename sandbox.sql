CREATE TABLE department_table
(
  dept_id              INT unsigned NOT NULL AUTO_INCREMENT, # Unique ID for the record
  dept_name                 VARCHAR(150) NOT NULL,                # Name of the cat
  dept_location           VARCHAR(150) NOT NULL,                # Owner of the cat
  PRIMARY KEY     (dept_id)                                  # Make the id the primary key
);