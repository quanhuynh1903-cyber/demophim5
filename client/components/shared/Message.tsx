import streamlit as st

def message_native(text, type="info"):
    """Thay thế cho Message.tsx bằng hàm có sẵn của Streamlit"""
    if type == "info":
        st.info(text)
    elif type == "error":
        st.error(text)
import streamlit as st

def message_component(children):
    """Thay thế cho Message: FunctionComponent"""
    st.markdown(f"""
        <div style="
            display: flex; 
            align-items: center; 
            background-color: #3b82f6; /* Tương đương bg-blue-500 */
            color: white; 
            font-size: 0.875rem; /* text-sm */
            font-weight: bold; 
            padding: 12px 16px; /* px-4 py-3 */
            border-radius: 4px;
            margin: 10px 0;" 
            role="alert">
            <p style="margin: 0;">{children}</p>
        </div>
    """, unsafe_allow_html=True)

# Cách sử dụng trong code chính:
# message_component("Kết nối cơ sở dữ liệu thành công!")
