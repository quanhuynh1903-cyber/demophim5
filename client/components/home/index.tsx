import sqlite3
import streamlit as st

def get_movie_list(keyword='', page_number=1, page_size=10):
    """
    Truy vấn danh sách phim từ SQLite với chức năng tìm kiếm và phân trang.
    """
    try:
        # Đường dẫn tới database trong cấu trúc dự án
        conn = sqlite3.connect('server/db.sqlite3')
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()

        offset = (page_number - 1) * page_size
        
        # Query tìm kiếm phim
        query = "SELECT * FROM core_movie WHERE title LIKE ? LIMIT ? OFFSET ?"
        cur.execute(query, (f'%{keyword}%', page_size, offset))
        movies = [dict(row) for row in cur.fetchall()]

        # Tính toán tổng số trang cho Paginate
        cur.execute("SELECT COUNT(*) FROM core_movie WHERE title LIKE ?", (f'%{keyword}%',))
        total_movies = cur.fetchone()[0]
        total_pages = (total_movies + page_size - 1) // page_size

        conn.close()
        return movies, total_pages
    except Exception as e:
        st.error(f"Lỗi truy vấn: {e}")
        return [], 0
def movie_card(movie):
    """Thay thế cho MovieCard component."""
    with st.container():
        # Hiển thị poster phim
        poster_url = movie.get('poster') if movie.get('poster') else "https://via.placeholder.com/300x450"
        st.image(poster_url, use_container_width=True)
        st.markdown(f"**{movie['title']}**")
        # Nút xem chi tiết tương đương chuyển hướng Route
        if st.button("Xem ngay", key=f"btn_{movie['id']}"):
            st.session_state.current_movie_id = movie['id']
            st.rerun()

def home_component(keyword=''):
    """Thay thế cho HomeComponent."""
    
    # Quản lý trang hiện tại (Paginate state)
    if 'page_number' not in st.session_state:
        st.session_state.page_number = 1

    # Hiển thị TopMovie nếu không có từ khóa tìm kiếm
    if not keyword:
        st.info("🔥 Top Movie Featured Section") # Thay bằng logic hiển thị phim nổi bật

    st.markdown("---")
    st.markdown('<h2 style="color: #f97316; font-weight: bold; letter-spacing: 1px;">POPULAR MOVIES</h2>', unsafe_allow_html=True)
    
    # Lấy dữ liệu phim
    movies, total_pages = get_movie_list(keyword, st.session_state.page_number)

    if not movies:
        st.warning("Không tìm thấy phim nào!")
    else:
        # Tạo Grid 5 cột (lg:grid-cols-5)
        cols = st.columns(5)
        for i, movie in enumerate(movies):
            with cols[i % 5]:
                movie_card(movie)

        # --- Phân trang (Paginate) ---
        st.markdown("---")
        p_col1, p_col2, p_col3 = st.columns([2, 1, 2])
        with p_col2:
            if total_pages > 1:
                col_prev, col_page, col_next = st.columns([1, 2, 1])
                with col_prev:
                    if st.session_state.page_number > 1:
                        if st.button("⬅️"):
                            st.session_state.page_number -= 1
                            st.rerun()
                with col_page:
                    st.write(f"Trang {st.session_state.page_number}/{total_pages}")
                with col_next:
                    if st.session_state.page_number < total_pages:
                        if st.button("➡️"):
                            st.session_state.page_number += 1
                            st.rerun()
def main():
    # 1. Hiển thị Header và lấy keyword
    keyword = header() # Giả sử hàm header trả về giá trị search
    
    # 2. Hiển thị trang chủ hoặc chi tiết
    if "current_movie_id" in st.session_state:
        # Logic hiển thị chi tiết phim
        st.button("Quay lại", on_click=lambda: st.session_state.pop("current_movie_id"))
        st.write(f"Đang xem phim ID: {st.session_state.current_movie_id}")
    else:
        home_component(keyword)
    
    # 3. Footer
    footer()

if __name__ == "__main__":
    main()
