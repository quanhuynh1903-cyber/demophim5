import streamlit as st
import streamlit.components.v1 as components

def player_component(url):
    """
    Thay thế cho Player: FunctionComponent<PlayerProps>
    url: Đường dẫn video (YouTube, Vimeo, hoặc link trực tiếp)
    """
    st.markdown('<div class="video-container">', unsafe_allow_html=True)
    
    # Cách 1: Sử dụng st.video (Tốt nhất cho link YouTube hoặc file video trực tiếp)
    if "youtube.com" in url or "youtu.be" in url:
        st.video(url)
    
    # Cách 2: Sử dụng iframe (Nếu url là một trình phát bên thứ ba giống bản React)
    else:
        # Tái hiện lại class "responsive-iframe" bằng cách tính toán tỷ lệ 16:9
        components.iframe(url, height=500, scrolling=False)
    
    st.markdown('</div>', unsafe_allow_html=True)
st.markdown("""
    <style>
    .video-container {
        width: 100%;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        margin-bottom: 20px;
    }
    /* Đảm bảo iframe co giãn theo container */
    iframe {
        width: 100% !important;
    }
    </style>
""", unsafe_allow_html=True)
        def movie_detail_page(movie_id):
    # Lấy thông tin phim từ database dựa trên ID
    # movie = query_db("SELECT * FROM core_movie WHERE id = ?", (movie_id,))[0]
    
    # Giả sử link video được lưu trong field 'video_url'
    video_url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ" # Ví dụ
    
    st.title(f"Đang xem: Phim mẫu")
    
    # Gọi Player Component
    player_component(video_url)
    
    st.write("Mô tả phim: Đây là nội dung mô tả của bộ phim này...")
