CREATE TABLE AUTHORITY
(
    ID BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    NAME VARCHAR(255) NOT NULL
);
CREATE TABLE CATEGORY
(
    ID BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    CREATEDAT TIMESTAMP,
    NAME VARCHAR(255) NOT NULL,
    CODE VARCHAR(50),
    MESSAGE VARCHAR(255)
);CREATE TABLE QRCODE
(
    ID BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    GENERATEDAT TIMESTAMP,
    CATEGORY_ID BIGINT NOT NULL,
    PRODUCTION_ID BIGINT,
    URL VARCHAR(512) NOT NULL,
    X BIGINT,
    Y BIGINT,
    DIMENSION BIGINT,
    BIG BOOLEAN,
    SVGPATH CLOB
);

CREATE TABLE User
(
    ID BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    ESMEID VARCHAR(255),
    FIRSTCONNECTIONAT TIMESTAMP
);
CREATE TABLE USER_AUTHORITY
(
    USER_ID BIGINT NOT NULL,
    AUTHORITIES_ID BIGINT NOT NULL,
    PRIMARY KEY (USER_ID, AUTHORITIES_ID)
);
CREATE TABLE Production
(
    ID BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    CONTENT CLOB,
    CREATEDAT TIMESTAMP,
    USER_ID BIGINT NOT NULL
);

ALTER TABLE QRCODE ADD FOREIGN KEY (CATEGORY_ID) REFERENCES CATEGORY (ID);
ALTER TABLE QRCODE ADD FOREIGN KEY (PRODUCTION_ID) REFERENCES PRODUCTION (ID);
CREATE INDEX FK_3YONWMFK6VPSHB0N2CC0TOYFH_INDEX_8 ON QRCODE (PRODUCTION_ID);
CREATE INDEX FK_LRXL47CEVKKUIG3KYMJD791KR_INDEX_8 ON QRCODE (CATEGORY_ID);
ALTER TABLE USER_AUTHORITY ADD FOREIGN KEY (AUTHORITIES_ID) REFERENCES AUTHORITY (ID);
ALTER TABLE USER_AUTHORITY ADD FOREIGN KEY (USER_ID) REFERENCES USER (ID);
CREATE INDEX FK_S5AERDIQYT5E9QREWACJS4MSS_INDEX_B ON USER_AUTHORITY (AUTHORITIES_ID);
ALTER TABLE PRODUCTION ADD FOREIGN KEY (USER_ID) REFERENCES USER (ID);
CREATE INDEX FK_FFEVXL8SDHYH17NE0BOSP6XE8_INDEX_2 ON Production (USER_ID);
