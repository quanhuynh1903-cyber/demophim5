import streamlit as st

def paginate_component(total_pages, current_page, keyword=''):
    """
    Thay thế cho Paginate: FunctionComponent
    """
    if total_pages <= 1:
        return current_page

    st.markdown("""
        <style>
        .paginate-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 48px 0; /* my-12 */
            gap: 5px;
        }
        .page-btn-active {
            background-color: #ea580c !important; /* bg-orange-600 */
            color: white !important;
        }
        </style>
    """, unsafe_allow_html=True)

    # Tạo các cột để căn giữa thanh phân trang
    _, center_col, _ = st.columns([1, 3, 1])

    with center_col:
        # Sử dụng container flexbox mô phỏng lại CSS của bản React
        cols = st.columns(total_pages + 2) # +2 cho nút mũi tên trái/phải
        
        # Nút Previous (Mũi tên trái)
        if cols[0].button("⟨", key="prev"):
            if current_page > 1:
                return current_page - 1

        # Danh sách các số trang
        for x in range(total_pages):
            page_num = x + 1
            # Nếu là trang hiện tại, làm nổi bật nút
            is_active = "page-btn-active" if page_num == current_page else ""
            
            if cols[x+1].button(f"{page_num}", key=f"page_{page_num}"):
                return page_num

        # Nút Next (Mũi tên phải)
        if cols[-1].button("⟩", key="next"):
            if current_page < total_pages:
                return current_page + 1
                def main():
    # Khởi tạo trang trong session_state
    if 'current_page' not in st.session_state:
        st.session_state.current_page = 1

    # Giả sử bạn có 10 trang phim
    total_pages = 10 
    keyword = st.session_state.get('search_keyword', '')

    # Hiển thị danh sách phim dựa trên st.session_state.current_page
    st.write(f"Đang hiển thị trang: {st.session_state.current_page}")

    # Gọi component phân trang
    new_page = paginate_component(total_pages, st.session_state.current_page, keyword)
    
    # Nếu người dùng nhấn nút chuyển trang, cập nhật lại app
    if new_page != st.session_state.current_page:
        st.session_state.current_page = new_page
        st.rerun()

if __name__ == "__main__":
    main()
    return current_page
