import streamlit as st
import sqlite3
import os

# --- CẤU HÌNH TRANG ---
st.set_page_config(page_title="Factory - Xem phim trực tuyến", layout="wide")

# --- COMPONENT 1: RATING (Thay thế Rating.tsx) ---
def rating_component(value, color='#f8e825'):
    # Sử dụng FontAwesome CDN để lấy icon giống React-icons
    st.markdown('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">', unsafe_allow_html=True)
    stars = ""
    for i in range(5):
        if value >= i + 1:
            stars += f'<i class="fas fa-star" style="color: {color};"></i>'
        elif value >= i + 0.5:
            stars += f'<i class="fas fa-star-half-alt" style="color: {color};"></i>'
        else:
            stars += f'<i class="far fa-star" style="color: {color};"></i>'
    st.markdown(f'<div style="display: flex; gap: 4px;">{stars}</div>', unsafe_allow_html=True)

# --- COMPONENT 2: PLAYER (Thay thế Player.tsx) ---
def player_component(url):
    # Streamlit hỗ trợ nhúng video rất mạnh mẽ
    if "youtube" in url or "youtu.be" in url:
        st.video(url)
    else:
        st.components.v1.iframe(url, height=500)

# --- COMPONENT 3: MOVIE CARD (Thay thế MovieCard.tsx) ---
def movie_card(movie):
    with st.container():
        # Lấy ảnh từ URL hoặc placeholder
        st.image(movie.get('image', 'https://via.placeholder.com/300x450'), use_container_width=True)
        st.markdown(f"**{movie['name']}**")
        rating_component(movie['rating'])
        st.caption(f"{movie['releasedAt']} | {movie['genres']}")
        if st.button("Xem phim", key=f"btn_{movie['_id']}"):
            st.session_state.playing_id = movie['_id']
            st.rerun()

# --- COMPONENT 4: TOP MOVIE (Thay thế TopMovie.tsx) ---
def top_movie_section(movies):
    st.markdown("### 🔥 PHIM NỔI BẬT")
    cols = st.columns(len(movies))
    for i, m in enumerate(movies):
        with cols[i]:
            st.image(m['image'], use_container_width=True, caption=m['name'])

# --- GIAO DIỆN CHÍNH (MAIN LOGIC) ---
def main():
    st.title("🎬 FACTORY")
    
    # Giả lập dữ liệu từ database server/db.sqlite3
    sample_movies = [
        {"_id": "1", "name": "Factory Movie", "rating": 4.5, "releasedAt": "2021", "genres": "Action", "image": "https://via.placeholder.com/300x450"},
        {"_id": "2", "name": "Django Stream", "rating": 4.0, "releasedAt": "2022", "genres": "Drama", "image": "https://via.placeholder.com/300x450"}
    ]

    # Kiểm tra trạng thái xem phim
    if "playing_id" in st.session_state:
        if st.button("⬅ Quay lại trang chủ"):
            del st.session_state.playing_id
            st.rerun()
        st.subheader("Đang phát phim")
        player_component("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    else:
        # Hiển thị Top Movie
        top_movie_section(sample_movies)
        st.markdown("---")
        # Hiển thị Danh sách phim (Grid 5 cột)
        st.markdown("### POPULAR MOVIES")
        cols = st.columns(5)
        for i, m in enumerate(sample_movies * 3): # Nhân bản phim để test grid
            with cols[i % 5]:
                movie_card(m)

if __name__ == "__main__":
    main()
