from dataclasses import dataclass
from typing import Optional

@dataclass
class User:
    """Tương đương export interface User"""
    id: str
    name: str
    email: str
    is_admin: bool

@dataclass
class TokenUser(User):
    """Tương đương export interface TokenUser"""
    token: str

@dataclass
class PasswordUser(User):
    """Tương đương export interface PasswordUser"""
    password: str
def login_user(email, password):
    """Giả lập xác thực từ server/db.sqlite3"""
    import sqlite3
    conn = sqlite3.connect('server/db.sqlite3')
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    
    # Truy vấn bảng auth_user của Django
    cur.execute("SELECT id, username, email, is_superuser FROM auth_user WHERE email=?", (email,))
    row = cur.fetchone()
    
    if row:
        # Khởi tạo TokenUser sau khi đăng nhập thành công
        user = TokenUser(
            id=str(row['id']),
            name=row['username'],
            email=row['email'],
            is_admin=bool(row['is_superuser']),
            token="jwt-token-gia-lap"
        )
        st.session_state['userInfo'] = user
        return user
    return None
def admin_panel():
    if 'userInfo' in st.session_state and st.session_state['userInfo'].is_admin:
        st.sidebar.success("🔑 Chế độ Quản trị viên")
        if st.sidebar.button("Thêm phim mới"):
            # Chức năng chỉ dành cho Admin của dự án Factory
            pass
