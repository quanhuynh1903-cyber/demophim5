import streamlit as st

def header():
    # 1. CSS để tạo kiểu cho Header (Thay thế Tailwind)
    st.markdown("""
        <style>
        .header-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            border-bottom: 1px solid #333;
            background-color: #0e1117;
        }
        .nav-links {
            display: flex;
            gap: 20px;
            list-style: none;
            margin: 0;
            padding: 0;
            align-items: center;
        }
        .nav-links a {
            text-decoration: none;
            color: white;
            font-weight: 500;
        }
        .nav-links a:hover {
            color: #ccc;
        }
        .user-section {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .logo-text {
            font-size: 24px;
            font-weight: bold;
            color: white;
            letter-spacing: 2px;
        }
        </style>
    """, unsafe_allow_html=True)

    # 2. Tạo Layout Header bằng Columns
    col_logo, col_search, col_auth = st.columns([2, 3, 2])

    with col_logo:
        # Giả lập SVG logo bằng văn bản hoặc ảnh
        st.markdown('<div class="logo-text">FACTORY</div>', unsafe_allow_html=True)
        
    with col_search:
        # Thành phần Search (Thay thế Search component của React)
        st.text_input("", placeholder="Tìm kiếm phim, diễn viên...", label_visibility="collapsed")

    with col_auth:
        # Kiểm tra trạng thái đăng nhập (Thay thế Redux useSelector)
        if "user_info" in st.session_state and st.session_state.user_info:
            c1, c2 = st.columns([3, 1])
            c1.write(f"Chào, **{st.session_state.user_info['name']}**")
            if c2.button("🚪"):
                del st.session_state.user_info
                st.rerun()
        else:
            c1, c2 = st.columns(2)
            if c1.button("Login"):
                # Giả lập đăng nhập để test
                st.session_state.user_info = {"name": "Ren0503"}
                st.rerun()
            if c2.button("Register"):
                st.info("Chuyển đến trang Đăng ký")

    # 3. Thanh Menu phụ bên dưới (Movie, TV Shows, Actors)
    st.markdown("""
        <div class="header-container" style="justify-content: center; border-bottom: none; padding-top: 0;">
            <div class="nav-links">
                <a href="#">Movie</a>
                <a href="#">TV Show</a>
                <a href="#">Actors</a>
            </div>
        </div>
    """, unsafe_allow_html=True)

# Gọi hàm header ở đầu trang main
header()
