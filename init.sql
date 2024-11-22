-- Tabla 'rol'
CREATE TABLE
    rol (
        cverol SMALLINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        descripcion VARCHAR(250) NOT NULL,
        clave VARCHAR(45) NOT NULL,
        activo BOOLEAN NOT NULL
    );

-- Tabla 'categoria'
CREATE TABLE
    categoria (
        cvecategoria SMALLINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        descripcion VARCHAR(250) NOT NULL,
        activo BOOLEAN NOT NULL
    );

-- Tabla 'producto'
CREATE TABLE
    producto (
        cveproducto INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        descripcion VARCHAR(350) NOT NULL,
        precio DECIMAL NOT NULL,
        cantidad INTEGER NOT NULL,
        cvecategoria SMALLINT NOT NULL,
        CONSTRAINT fk_producto_categoria FOREIGN KEY (cvecategoria) REFERENCES categoria (cvecategoria)
    );

-- Tabla 'usuario'
CREATE TABLE
    usuario (
        cveusuario INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        nombre VARCHAR(250) NOT NULL,
        apellidos VARCHAR(600) NOT NULL,
        username VARCHAR(150) NOT NULL,
        password VARCHAR(800) NOT NULL,
        fecharegistro TIMESTAMP DEFAULT now (),
        cverol SMALLINT NOT NULL,
        CONSTRAINT fk_usuario_rol FOREIGN KEY (cverol) REFERENCES rol (cverol)
    );

-- Tabla 'venta'
CREATE TABLE
    venta (
        cveventa INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        totalventa DECIMAL NOT NULL,
        fechaventa TIMESTAMP DEFAULT now (),
        cveusuario INTEGER NOT NULL,
        CONSTRAINT fk_venta_usuario FOREIGN KEY (cveusuario) REFERENCES usuario (cveusuario)
    );

-- Tabla 'detalle_venta'
CREATE TABLE
    detalle_venta (
        cvedetalleventa INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        cantidad INTEGER NOT NULL,
        precioproducto DECIMAL NOT NULL,
        cveproducto INTEGER NOT NULL,
        cveventa INTEGER NOT NULL,
        CONSTRAINT fk_detalle_venta_producto FOREIGN KEY (cveproducto) REFERENCES producto (cveproducto),
        CONSTRAINT fk_detalle_venta_venta FOREIGN KEY (cveventa) REFERENCES venta (cveventa)
    );

-- Insert de roles
INSERT INTO
    rol (descripcion, clave, activo)
VALUES
    ('Administrador', 'ADMIN', TRUE);

INSERT INTO
    rol (descripcion, clave, activo)
VALUES
    ('Vendedor', 'VENDEDOR', TRUE);