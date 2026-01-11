import streamlit as st
import sqlite3

# --- HÀM TÌM KIẾM DỮ LIỆU ---
def search_movies(keyword):
    try:
        # Kết nối tới db.sqlite3 trong thư mục server
        conn = sqlite3.connect('server/db.sqlite3')
        cur = conn.cursor()
        # Tìm kiếm phim theo tên (giả sử bảng là core_movie và cột là title)
        query = "SELECT title, poster FROM core_movie WHERE title LIKE ?"
        cur.execute(query, (f'%{keyword}%',))
        results = cur.fetchall()
        conn.close()
        return results
    except Exception as e:
        st.error(f"Lỗi kết nối database: {e}")
        return []

# --- COMPONENT: SEARCH ---
def search_component():
    # Giả lập giao diện bo tròn (rounded-full) của Tailwind bằng CSS
    st.markdown("""
        <style>
        .search-box {
            display: flex;
            align-items: center;
            background-color: #1f2937; /* bg-gray-800 */
            border-radius: 9999px; /* rounded-full */
            padding: 2px 15px;
            width: 100%;
        }
        </style>
    """, unsafe_allow_html=True)

    # Sử dụng st.text_input để thay thế thẻ input của React
    keyword = st.text_input(
        label="Search",
        placeholder="Search Movies...",
        label_visibility="collapsed",
        key="search_input"
    )

    # Xử lý Logic Submit (Thay thế submitHandler và router.push)
    if keyword:
        results = search_movies(keyword)
        if results:
            st.write(f"Tìm thấy {len(results)} kết quả cho '{keyword}':")
            cols = st.columns(4)
            for idx, movie in enumerate(results):
                with cols[idx % 4]:
                    # Hiển thị ảnh (placeholder nếu không có poster)
                    st.image("https://via.placeholder.com/200x300", caption=movie[0])
        else:
            st.warning("Không tìm thấy phim nào phù hợp.")
    elif keyword == "" and "search_input" in st.session_state:
        # Tương đương với router.push('/') khi xóa từ khóa
        pass 

# Để tích hợp vào Header, bạn chỉ cần gọi search_component() bên trong cột search của Header.
