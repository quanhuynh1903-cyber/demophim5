st.markdown("""
    <style>
    .movie-card {
        transition: transform .2s; /* Hiệu ứng transition ease-in-out */
        cursor: pointer;
    }
    .movie-card:hover {
        transform: scale(1.05); /* Hiệu ứng hover opacity/scale */
        opacity: 0.8;
    }
    .movie-title {
        font-size: 1.1rem;
        font-weight: 500;
        margin-top: 10px;
        color: white;
    }
    .movie-info {
        color: #9ca3af; /* text-gray-400 */
        font-size: 0.875rem;
    }
    .star-icon {
        color: #f97316; /* text-orange-500 */
    }
    </style>
""", unsafe_allow_html=True)
        def movie_card_component(movie):
    """
    Thay thế cho MovieCard: FunctionComponent<MovieProps>
    movie: dict chứa các trường id, name, image, rating, releasedAt, genres
    """
    with st.container():
        # Xử lý URL ảnh (tương đương với imageUrl utility trong React)
        # Nếu dùng Django backend, ảnh thường ở /media/ hoặc /static/
        img_src = movie.get('image', 'https://via.placeholder.com/300x450')
        
        # Hiển thị Poster (Tương đương thẻ <img> với hover effects)
        st.image(img_src, use_container_width=True)
        
        # Tên phim (Tương đương Link href)
        st.markdown(f'<div class="movie-title">{movie["name"]}</div>', unsafe_allow_html=True)
        
        # Rating và Ngày phát hành (Tương đương SVG Star và flex layout)
        info_html = f"""
        <div class="movie-info">
            <span class="star-icon">★</span> {movie['rating']} 
            <span style="margin: 0 8px;">|</span> 
            <span>{movie['releasedAt']}</span>
        </div>
        <div class="movie-info">{movie['genres']}</div>
        """
        st.markdown(info_html, unsafe_allow_html=True)
        
        # Nút bấm để xem chi tiết (Thay thế Link của Next.js)
        if st.button("Xem chi tiết", key=f"card_btn_{movie['_id']}"):
            st.session_state.current_page = "movie_detail"
            st.session_state.selected_movie_id = movie['_id']
            st.rerun()
            def display_popular_movies(movies_list):
    st.markdown('<h2 style="color: #f97316; font-weight: 600;">POPULAR MOVIES</h2>', unsafe_allow_html=True)
    
    # Grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5
    cols = st.columns(5) 
    for i, movie in enumerate(movies_list):
        with cols[i % 5]:
            movie_card_component(movie)
