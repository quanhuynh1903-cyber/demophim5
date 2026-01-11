import streamlit as st

# --- THAY THẾ CHO REDUX DISPATCH ---

def update_user_state(user_data):
    """
    Tương đương với dispatch(loginSuccess(user_data))
    """
    st.session_state['user_info'] = user_data
    # Streamlit sẽ tự động cập nhật lại giao diện sau khi state thay đổi
    st.rerun()

def logout_dispatch():
    """
    Tương đương với dispatch(logout())
    """
    if 'user_info' in st.session_state:
        del st.session_state['user_info']
    st.rerun()

# --- CÁCH SỬ DỤNG TRONG GIAO DIỆN ---

def login_form():
    st.subheader("Đăng nhập")
    username = st.text_input("Username")
    if st.button("Login"):
        # Thay vì dispatch action, ta gọi hàm xử lý state trực tiếp
        user_payload = {"name": username, "is_logged_in": True}
        update_user_state(user_payload)
