def get_top_movies(limit=5):
    """Lấy danh sách các phim có điểm đánh giá cao nhất"""
    try:
        conn = sqlite3.connect('server/db.sqlite3') #
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        # Lấy các phim có rating cao nhất
        cur.execute("SELECT * FROM core_movie ORDER BY rating DESC LIMIT ?", (limit,))
        movies = [dict(row) for row in cur.fetchall()]
        conn.close()
        return movies
    except Exception:
        return []
            def top_movie_component():
    movies = get_top_movies()
    
    if not movies:
        return

    st.markdown("### 🔥 TOP RATED MOVIES")
    
    # Sử dụng CSS để tạo kiểu cho thẻ Top Movie giống bản React
    st.markdown("""
        <style>
        .top-movie-card {
            background-color: #1f2937;
            border-radius: 1.5rem;
            padding: 1.5rem;
            display: flex;
            gap: 1.5rem;
            margin-bottom: 1rem;
            height: 320px;
        }
        .top-movie-img {
            width: 45%;
            border-radius: 1rem;
            object-fit: cover;
        }
        .top-movie-content {
            width: 55%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        </style>
    """, unsafe_allow_html=True)

    # Thay vì dùng Slider phức tạp, ta dùng tabs hoặc hiển thị danh sách ngang
    tabs = st.tabs([m['name'] for m in movies])
    
    for i, movie in enumerate(movies):
        with tabs[i]:
            col1, col2 = st.columns([1, 1.5])
            with col1:
                # Ảnh poster bo góc
                st.image(movie.get('image', 'https://via.placeholder.com/300x450'), use_container_width=True)
            with col2:
                st.subheader(movie['name'])
                # Gọi lại component Rating đã tạo ở bước trước
                rating_component(movie['rating']) #
                st.caption(f"Released: {movie['releasedAt']}")
                
                # Cắt ngắn mô tả phim
                description = movie.get('description', '')
                st.write(f"{description[:100]}...")
                
                # Nút "Watch Now"
                if st.button("🎬 Watch Now", key=f"top_btn_{movie['id']}"):
                    st.session_state.current_movie_id = movie['id']
                    st.rerun()
            def home_component(keyword=''):
    # Hiển thị TopMovie nếu người dùng không tìm kiếm
    if not keyword:
        top_movie_component()
        st.markdown("---")
    
    # Tiếp tục hiển thị danh sách POPULAR MOVIES phía dưới...
