-- ==========================================
-- SCRIPT DE CONFIGURACIÓN SECURE PARA SUPABASE
-- Ejecuta este script en el "SQL Editor" de tu proyecto de Supabase
-- ==========================================

-- Habilitar la extensión pgcrypto para el hash de contraseñas
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. CREACIÓN DE LA TABLA DE CONVOCATORIAS (VACANTES)
CREATE TABLE IF NOT EXISTS convocatorias (
    id BIGINT PRIMARY KEY, -- Usamos BIGINT para admitir los timestamps Date.now() del JS original
    cargo TEXT NOT NULL,
    nivel TEXT NOT NULL,
    modalidad TEXT NOT NULL,
    vacantes INTEGER NOT NULL DEFAULT 1,
    cierre DATE NOT NULL,
    area TEXT,
    "desc" TEXT,
    estado TEXT NOT NULL DEFAULT 'Borrador',
    creada_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

-- 2. CREACIÓN DE LA TABLA DE POSTULACIONES
CREATE TABLE IF NOT EXISTS postulaciones (
    id BIGINT PRIMARY KEY, -- Usamos BIGINT para admitir los timestamps Date.now()
    nombre TEXT NOT NULL,
    documento TEXT NOT NULL,
    ciudad TEXT,
    telefono TEXT,
    correo TEXT NOT NULL,
    perfil TEXT,
    profesion TEXT,
    experiencia TEXT,
    area TEXT,
    certificado TEXT,
    ajustes TEXT,
    pdf TEXT,
    pdf_url TEXT,
    tiene_pdf BOOLEAN DEFAULT FALSE,
    convocatoria_id BIGINT REFERENCES convocatorias(id) ON DELETE SET NULL,
    convocatoria_nombre TEXT,
    estado TEXT NOT NULL DEFAULT 'Pendiente',
    history JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

-- 3. CREACIÓN DE LA TABLA DE USUARIOS (ADMINISTRADORES) VINCULADOS A AUTH.USERS
CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    usuario TEXT UNIQUE NOT NULL,
    nombre TEXT NOT NULL,
    correo TEXT UNIQUE, -- Correo para inicio de sesión dual
    rol TEXT NOT NULL DEFAULT 'Administrador',
    estado TEXT NOT NULL DEFAULT 'Activo',
    ultimo_acceso TEXT DEFAULT '—'
);

-- 4. INSERTAR USUARIO ADMINISTRADOR POR DEFECTO EN AUTH.USERS Y PUBLIC.USUARIOS
-- Reemplaza 'admin123' por la contraseña que desees
DO $$
DECLARE
    admin_uuid UUID := 'a8c17b7a-4b92-4d24-8149-c1894d352b2f';
BEGIN
    -- Crear en auth.users con contraseña cifrada 'admin123'
    INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
    VALUES (
        '00000000-0000-0000-0000-000000000000',
        admin_uuid,
        'authenticated',
        'authenticated',
        'admin@ises.com.co',
        crypt('admin123', gen_salt('bf')),
        now(),
        '{"provider":"email","providers":["email"]}',
        '{"nombre":"Administrador Principal","usuario":"admin","rol":"Administrador"}',
        now(),
        now(),
        '',
        '',
        '',
        ''
    ) ON CONFLICT (id) DO NOTHING;

    -- Vincular en la tabla pública de perfiles
    INSERT INTO public.usuarios (id, usuario, nombre, correo, rol, estado, ultimo_acceso)
    VALUES (admin_uuid, 'admin', 'Administrador Principal', 'admin@ises.com.co', 'Administrador', 'Activo', '—')
    ON CONFLICT (usuario) DO NOTHING;
END $$;

-- 5. CREACIÓN AUTOMÁTICA DEL BUCKET DE ALMACENAMIENTO 'cv_files'
INSERT INTO storage.buckets (id, name, public)
VALUES ('cv_files', 'cv_files', true)
ON CONFLICT (id) DO NOTHING;

-- Habilitar políticas de seguridad para el bucket cv_files
DROP POLICY IF EXISTS "Permitir subidas públicas" ON storage.objects;
DROP POLICY IF EXISTS "Permitir lecturas públicas" ON storage.objects;
DROP POLICY IF EXISTS "Permitir eliminaciones públicas" ON storage.objects;

-- Permite subir de forma anónima hojas de vida
CREATE POLICY "Permitir subidas públicas" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'cv_files');

-- Permite lecturas de archivos solo a usuarios administradores autenticados
CREATE POLICY "Permitir lecturas autenticadas" ON storage.objects
    FOR SELECT TO authenticated USING (bucket_id = 'cv_files');

-- Permite eliminación de archivos solo a usuarios administradores autenticados
CREATE POLICY "Permitir eliminaciones autenticadas" ON storage.objects
    FOR DELETE TO authenticated USING (bucket_id = 'cv_files');

-- 6. HABILITAR ROW LEVEL SECURITY (RLS) EN LAS TABLAS
ALTER TABLE convocatorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE postulaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- 7. CONFIGURAR POLÍTICAS DE ACCESO RLS

-- POLÍTICAS PARA CONVOCATORIAS
DROP POLICY IF EXISTS "Acceso público de lectura a convocatorias" ON convocatorias;
DROP POLICY IF EXISTS "Acceso total a administradores sobre convocatorias" ON convocatorias;
CREATE POLICY "Lectura pública convocatorias" ON convocatorias FOR SELECT USING (true);
CREATE POLICY "Admin total convocatorias" ON convocatorias FOR ALL TO authenticated USING (true);

-- POLÍTICAS PARA POSTULACIONES
DROP POLICY IF EXISTS "Acceso público para insertar postulaciones" ON postulaciones;
DROP POLICY IF EXISTS "Acceso total a postulaciones" ON postulaciones;
CREATE POLICY "Postulante insertar postulaciones" ON postulaciones FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin total postulaciones" ON postulaciones FOR ALL TO authenticated USING (true);

-- POLÍTICAS PARA USUARIOS (PERFILES DE ADMINISTRADORES)
DROP POLICY IF EXISTS "Acceso total a usuarios" ON usuarios;
CREATE POLICY "Lectura pública usuarios lookup" ON usuarios FOR SELECT USING (true);
CREATE POLICY "Admin total usuarios" ON usuarios FOR ALL TO authenticated USING (true);

-- 8. FUNCIONES DE ADMINISTRACIÓN SEGURAS (RPC)

-- Crear nuevo usuario administrador/reclutador
CREATE OR REPLACE FUNCTION crear_usuario_admin(
    email_val TEXT,
    pass_val TEXT,
    user_name TEXT,
    full_name TEXT,
    user_rol TEXT
) RETURNS VOID AS $$
DECLARE
    new_user_id UUID;
BEGIN
    -- Insertar en auth.users con contraseña cifrada
    INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
    VALUES (
        '00000000-0000-0000-0000-000000000000',
        gen_random_uuid(),
        'authenticated',
        'authenticated',
        email_val,
        crypt(pass_val, gen_salt('bf')),
        now(),
        '{"provider":"email","providers":["email"]}',
        jsonb_build_object('nombre', full_name, 'usuario', user_name, 'rol', user_rol),
        now(),
        now(),
        '',
        '',
        '',
        ''
    ) RETURNING id INTO new_user_id;

    -- Vincular en la tabla pública de perfiles
    INSERT INTO public.usuarios (id, usuario, nombre, correo, rol, estado, ultimo_acceso)
    VALUES (new_user_id, user_name, full_name, email_val, user_rol, 'Activo', '—');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Eliminar un usuario administrador/reclutador
CREATE OR REPLACE FUNCTION eliminar_usuario_admin(user_name TEXT)
RETURNS VOID AS $$
DECLARE
    user_id UUID;
BEGIN
    -- Obtener el ID
    SELECT id INTO user_id FROM public.usuarios WHERE usuario = user_name LIMIT 1;
    
    IF user_id IS NOT NULL THEN
        -- Eliminar de auth.users (se eliminará en cascada en public.usuarios)
        DELETE FROM auth.users WHERE id = user_id;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
