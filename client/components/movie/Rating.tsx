import streamlit as st

def rating_component(value, color='#f8e825'):
    """
    Thay thế cho Rating: FunctionComponent<RatingProps>
    value: Số điểm đánh giá (0 - 5)
    color: Màu sắc của sao (mặc định là vàng)
    """
    # Nhúng Font Awesome để lấy icon sao
    st.markdown('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">', unsafe_allow_html=True)
    
    star_html = '<div style="display: flex; gap: 2px;">'
    
    for i in range(5):
        if value >= i + 1:
            # Sao đầy (FaStar)
            star_html += f'<i class="fas fa-star" style="color: {color}; font-size: 20px;"></i>'
        elif value >= i + 0.5:
            # Sao nửa (FaStarHalfAlt)
            star_html += f'<i class="fas fa-star-half-alt" style="color: {color}; font-size: 20px;"></i>'
        else:
            # Sao rỗng (để giữ layout 5 sao)
            star_html += f'<i class="far fa-star" style="color: {color}; font-size: 20px;"></i>'
            
    star_html += '</div>'
    
    st.markdown(star_html, unsafe_allow_html=True)
def movie_card_with_rating(movie):
    st.image(movie['image'], use_container_width=True)
    st.write(f"**{movie['name']}**")
    
    # Gọi component rating
    rating_component(value=movie['rating']) 
    
    st.caption(f"Ngày phát hành: {movie['releasedAt']}")
