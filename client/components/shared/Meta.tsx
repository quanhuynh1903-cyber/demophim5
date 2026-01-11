import streamlit as st

def set_meta(title='Welcome to MFactory', description='For watch the best free movie', keywords='movie, watch movie, free movie'):
    """
    Thay thế cho Meta: FunctionComponent
    Lưu ý: st.set_page_config PHẢI là lệnh Streamlit đầu tiên được chạy.
    """
    st.set_page_config(
        page_title=title, # Tương đương <title>
        page_icon="🎬",     # Bạn có thể thêm icon cho trang web
        layout="wide"     # Cấu hình giao diện rộng (phù hợp cho web xem phim)
    )

    # Streamlit hiện không hỗ trợ trực tiếp thẻ meta keywords/description qua set_page_config,
    # nhưng chúng ta có thể nhúng bằng HTML để tối ưu SEO.
    st.markdown(f"""
        <head>
            <meta name="description" content="{description}">
            <meta name="keywords" content="{keywords}">
        </head>
    """, unsafe_allow_html=True)

# Gọi hàm này ngay ở đầu file streamlit_app.py
set_meta()
                
