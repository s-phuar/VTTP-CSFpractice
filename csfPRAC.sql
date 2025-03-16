use vttp_2025;

CREATE TABLE orderCSF(
	orderId VARCHAR(255) PRIMARY KEY,
    date date,
	name VARCHAR(255) NOT NULL,
	address VARCHAR(255) NOT NULL,
	priority BOOLEAN DEFAULT FALSE,
	comments TEXT
);

create TABLE lineitemCSF(
	productId VARCHAR(255),
	orderId VARCHAR(255),
	name VARCHAR(255),
    quantity int,
    price float,
	constraint fk_order foreign key(orderId) REFERENCES orderCSF(orderId) ON DELETE CASCADE
);

drop table orderCSF;
drop table lineitemCSF;

select * from orderCSF;
select * from lineitemCSF;


