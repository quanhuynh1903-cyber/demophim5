import streamlit as st
import sqlite3
import uuid

# Kết nối tới database SQLite của Django
def get_db_connection():
    conn = sqlite3.connect('server/db.sqlite3')
    conn.row_factory = sqlite3.Row # Để truy cập dữ liệu theo tên cột
    return conn

# Lấy danh sách phim từ bảng core_movie
def get_movies(keyword=""):
    conn = get_db_connection()
    cur = conn.cursor()
    if keyword:
        cur.execute("SELECT * FROM core_movie WHERE name LIKE ?", (f'%{keyword}%',))
    else:
        cur.execute("SELECT * FROM core_movie")
    movies = cur.fetchall()
    conn.close()
    return movies

# Lấy chi tiết phim và danh sách diễn viên (ManyToMany)
def get_movie_details(movie_id):
    conn = get_db_connection()
    cur = conn.cursor()
    # Lấy thông tin phim
    cur.execute("SELECT * FROM core_movie WHERE _id = ?", (movie_id,))
    movie = cur.fetchone()
    
    # Lấy danh sách diễn viên thông qua bảng trung gian của Django
    cur.execute("""
        SELECT a.* FROM core_actor a
        JOIN core_movie_actors ma ON a._id = ma.actor_id
        WHERE ma.movie_id = ?
    """, (movie_id,))
    actors = cur.fetchall()
    
    # Lấy các đánh giá của phim này
    cur.execute("SELECT * FROM core_review WHERE movie_id = ?", (movie_id,))
    reviews = cur.fetchall()
    
    conn.close()
    def display_home(keyword=""):
    movies = get_movies(keyword)
    if not movies:
        st.warning("Không tìm thấy phim nào.")
        return

    st.subheader("Phim Phổ Biến")
    cols = st.columns(4)
    for i, movie in enumerate(movies):
        with cols[i % 4]:
            # Django lưu đường dẫn ảnh trong ImageField
            img_path = f"server/static/images/{movie['image']}" 
            st.image("https://via.placeholder.com/300x450", caption=movie['name']) # Placeholder nếu chưa có ảnh
            st.write(f"⭐ {movie['rating']} | {movie['releasedAt']}")
            if st.button("Xem chi tiết", key=str(movie['_id'])):
                st.session_state.selected_movie_id = movie['_id']
                st.rerun()
                def display_movie_detail(movie_id):
    movie, actors, reviews = get_movie_details(movie_id)
    
    if st.button("⬅ Quay lại"):
        del st.session_state.selected_movie_id
        st.rerun()

    col1, col2 = st.columns([1, 2])
    with col1:
        st.image("https://via.placeholder.com/300x450")
    with col2:
        st.title(movie['name'])
        st.write(f"**Thể loại:** {movie['genres']}")
        st.write(f"**Mô tả:** {movie['description']}")
        st.write(f"**Lượt xem:** {movie['views']}")

    # Trình phát video (trường 'url' trong database)
    st.write("---")
    st.subheader("Xem Phim")
    if movie['url']:
        st.video(movie['url'])
    else:
        st.info("Link phim đang được cập nhật.")

    # Hiển thị Diễn viên
    st.subheader("Diễn viên")
    actor_names = ", ".join([a['name'] for a in actors])
    st.write(actor_names if actor_names else "Chưa cập nhật danh sách diễn viên.")

    # Hiển thị Đánh giá
    st.subheader(f"Đánh giá ({movie['numReviews']})")
    for rev in reviews:
        st.markdown(f"**{rev['name']}** - ⭐ {rev['rating']}")
        st.write(rev['comment'])
        st.caption(rev['createdAt'])
    return movie, actors, reviews
