import streamlit as st

def footer():
    # Nhúng Font Awesome để lấy các icon mạng xã hội
    st.markdown(
        """
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
        <style>
            .footer-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 48px; /* Tương đương h-12 */
                margin-top: 56px; /* Tương đương mt-14 */
                padding: 0 28px; /* Tương đương px-7 */
                color: #ffffff;
                font-family: sans-serif;
            }
            .social-icons {
                display: flex;
                align-items: center;
                gap: 15px; /* Tương đương gap-3 */
            }
            .social-icons a {
                color: #ffffff;
                text-decoration: none;
                font-size: 25px;
                transition: 0.3s;
            }
            .social-icons a:hover {
                transform: scale(1.1);
            }
            .facebook:hover { color: #1877f2; }
            .twitter:hover { color: #5a65ea; }
            .github:hover { color: #6e5494; }
            
            /* Responsive: Ẩn bớt text trên màn hình nhỏ */
            @media (max-width: 768px) {
                .desktop-text { display: none; }
            }
        </style>
        
        <div class="footer-container">
            <p class="desktop-text">Copyright Ren0503 &copy; 2021</p>
            <p class="mobile-text" style="display: none;">Ren0503 &copy;</p>
            
            <div class="social-icons">
                <p class="desktop-text" style="margin: 0;">Contact me:</p>
                <a href="https://github.com/Ren0503/factory.git" target="_blank" class="github">
                    <i class="fab fa-github"></i>
                </a>
                <a href="https://www.facebook.com/elchemist0503" target="_blank" class="facebook">
                    <i class="fab fa-facebook"></i>
                </a>
                <a href="https://twitter.com/elchemist0503" target="_blank" class="twitter">
                    <i class="fab fa-twitter"></i>
                </a>
            </div>
        </div>
        """,
        unsafe_allow_html=True
    )

# Gọi hàm này ở cuối cùng của file app.py
footer()
