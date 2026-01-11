import streamlit as st
import time

def loader_native():
    """Thay thế cho Loader.tsx bằng tính năng native"""
    with st.spinner('Loading...'):
        # Giả lập thời gian chờ
        time.sleep(2)
import streamlit as st

def loader_custom():
    """Thay thế cho Loader.tsx sử dụng HTML/CSS tùy chỉnh"""
    st.markdown("""
        <style>
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .loader-btn {
            background-color: #eab308; /* Tương đương bg-yellow-500 */
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            border: none;
            display: flex;
            align-items: center;
            font-size: 16px;
            cursor: not-allowed;
            opacity: 0.8;
        }
        .spinner {
            width: 20px;
            height: 20px;
            margin-right: 12px;
            border: 3px solid rgba(255,255,255,0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite; /* Tương đương animate-spin */
        }
        </style>
        
        <button class="loader-btn" disabled>
            <div class="spinner"></div>
            Loading...
        </button>
    """, unsafe_allow_html=True)

# Cách sử dụng trong app.py
# loader_custom()
